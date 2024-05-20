import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import BuyerSidebarMenu from "./BuyerSidebarMenu";
import Loading from "../Shared/Loading";


const BuyerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedDateFilter, setSelectedDateFilter] = useState("all");
    const [customStartDate, setCustomStartDate] = useState(null);
    const [customEndDate, setCustomEndDate] = useState(null);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState("all");
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
    const [pageNumber, setPageNumber] = useState(0);
    const ordersPerPage = 10;
    const [loading, setLoading] = useState(true);
    const [user] = useAuthState(auth);

    const fetchOrders = () => {
        fetch(`http://localhost:5000/orders?userEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => {
                setOrders(info.reverse());
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filterOrders = () => {
        const currentDate = new Date();

        return orders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            const isOrderWithinDateFilter =
                selectedDateFilter === "all" ||
                (selectedDateFilter === "thisMonth" &&
                    orderDate.getMonth() === currentDate.getMonth()) ||
                (selectedDateFilter === "last7Days" &&
                    orderDate >= currentDate.setDate(currentDate.getDate() - 7)) ||
                (selectedDateFilter === "previousMonth" &&
                    orderDate >=
                    new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() - 1,
                        1
                    ) &&
                    orderDate <=
                    new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)) ||
                (selectedDateFilter === "custom" &&
                    orderDate >= customStartDate &&
                    orderDate <= customEndDate);

            const isOrderMatchingStatus =
                selectedOrderStatus === "all" ||
                order.orderStatus === selectedOrderStatus;

            const isOrderMatchingPaymentStatus =
                selectedPaymentStatus === "all" ||
                order.paymentStatus === selectedPaymentStatus;

            return isOrderWithinDateFilter && isOrderMatchingStatus && isOrderMatchingPaymentStatus;
        });
    };

    const filteredOrders = filterOrders();
    const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);

    const handleUpdateOrderStatus = (orderId, updatedOrderStatus, updatedPaymentStatus) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderStatus: updatedOrderStatus, paymentStatus: updatedPaymentStatus })
        };
        fetch(`http://localhost:5000/order-status/${orderId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                fetchOrders();
            })
            .catch(error => console.error('Error updating order status:', error));
    };
    function formatText(text) {
        const lines = [];
        for (let i = 0; i < text.length; i += 30) {
            lines.push(text.substr(i, 30));
        }
        return lines.join('\n');
    }


    return (
        <>
            <BuyerSidebarMenu></BuyerSidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12">
                                {loading ? (
                                    <Loading />
                                ) : (
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title mb-4">Recent Orders</h4>
                                            <div className="mb-3">

                                                <div className="row">
                                                    <div className="col-6"><label className="mt-3">Filter by Order Status</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={selectedOrderStatus}
                                                            onChange={(e) => setSelectedOrderStatus(e.target.value)}
                                                        >
                                                            <option value="all">All Orders</option>
                                                            <option value="Accepted">Accepted</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select></div>
                                                    <div className="col-6">  <label className="mt-3">Filter by Payment Status</label>
                                                        <select
                                                            className="form-select form-select-sm"
                                                            value={selectedPaymentStatus}
                                                            onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                                                        >
                                                            <option value="all">All Payments</option>
                                                            <option value="Received">Received</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                            <option value="Refunded">Refunded</option>
                                                        </select></div>
                                                </div>
                                                {selectedDateFilter === "custom" && (
                                                    <div className="d-flex mt-2">
                                                        <DatePicker
                                                            selected={customStartDate}
                                                            onChange={(date) => setCustomStartDate(date)}
                                                            selectsStart
                                                            startDate={customStartDate}
                                                            endDate={customEndDate}
                                                            placeholderText="Start Date"
                                                            className="form-control form-control-sm"
                                                        />
                                                        <span className="mx-2">to</span>
                                                        <DatePicker
                                                            selected={customEndDate}
                                                            onChange={(date) => setCustomEndDate(date)}
                                                            selectsEnd
                                                            startDate={customStartDate}
                                                            endDate={customEndDate}
                                                            placeholderText="End Date"
                                                            className="form-control form-control-sm"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table table-centered border table-nowrap mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Order Id</th>
                                                            <th>Name</th>
                                                            <th>Product Name</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                            <th>Review</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredOrders
                                                            .slice(
                                                                pageNumber * ordersPerPage,
                                                                (pageNumber + 1) * ordersPerPage
                                                            )
                                                            .map((order, index) => (
                                                                <tr key={order._id}>
                                                                    <td>
                                                                        <p className="text-muted mb-0 font-size-11">
                                                                            {order.orderDate}
                                                                        </p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-muted mb-0 font-size-11">
                                                                            {order.orderId}
                                                                        </p>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex">
                                                                            <div>
                                                                                <h5 className="font-size-13 text-truncate mb-1">
                                                                                    <Link className="text-dark">
                                                                                        {order.customerName}
                                                                                        <p className="text-muted mb-0 font-size-11">
                                                                                            {order.customerEmail}
                                                                                        </p>
                                                                                    </Link>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <h6 className="mb-1 font-size-13">
                                                                            <a href={`http://localhost:3000/product/${order.packageId}`} target="_blank" rel="noreferrer" className="text-dark mb-1 font-size-14">
                                                                                {order.packageName}
                                                                            </a>
                                                                        </h6>
                                                                    </td>
                                                                    <td>
                                                                        <h6 className="mb-1 font-size-13">
                                                                            ${order.packagePrice} USD
                                                                        </h6>
                                                                        <p className="text-danger text-uppercase mb-0 font-size-11">
                                                                            <i className="mdi mdi-circle-medium" />
                                                                            {order.paymentStatus}
                                                                        </p>
                                                                    </td>
                                                                    <td>
                                                                        <h6 className="mb-1 font-size-13">
                                                                            {order.paymentStatus === "Pending" ? (
                                                                                <Link
                                                                                    to={`/pay-now/${order._id}`}
                                                                                    className="btn btn-success waves-effect waves-light"
                                                                                    type="submit"
                                                                                >
                                                                                    <i className="ri-stripe-line me-2"></i>
                                                                                    <span>Pay With PayPal</span>
                                                                                </Link>
                                                                            ) : (
                                                                                <button
                                                                                    className="btn btn-outline-secondary btn-sm edit"
                                                                                    title="Edit"
                                                                                    type="button"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target={`#contactModal${order._id}`}
                                                                                >
                                                                                    <i className="fas fa-eye"></i>
                                                                                </button>
                                                                            )}
                                                                            <div className={`modal fade contactModal${order._id}`} id={`contactModal${order._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${order._id}`} aria-hidden="true">
                                                                                <div className="modal-dialog modal-dialog-centered">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5 className="modal-title" id={`exampleModalLabelStatus${order._id}`}>Orders Information</h5>
                                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            <table class="table table-hover mb-0">
                                                                                                <thead> <tr><th>-</th> <th>-</th> </tr> </thead>
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td>Package Name</td>
                                                                                                        <td>{order.packageName}</td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>Package Price</td>
                                                                                                        <td>${order.packagePrice}</td>
                                                                                                    </tr>

                                                                                                    <tr>
                                                                                                        <td>Access Link</td>
                                                                                                        {order.paymentStatus === "Received" ? (
                                                                                                            <td><a href={order.accessLink} target="_blank" rel="noopener noreferrer">{order.accessLink}</a></td>
                                                                                                        ) : (
                                                                                                            <td>Show when payment is received.</td>
                                                                                                        )}
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>Guide Line</td>
                                                                                                        {order.paymentStatus === "Received" ? (
                                                                                                            <td>{order.guideLine}</td>
                                                                                                        ) : (
                                                                                                            <td>Show when payment is received.</td>
                                                                                                        )}
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </h6>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-outline-secondary btn-sm edit"
                                                                            title="Edit"
                                                                            type="button"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#contactModal${order._id}`}
                                                                        >
                                                                            <i className="dripicons-message"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mt-3 d-flex justify-content-end">
                                                <Pagination>
                                                    <Pagination.Prev
                                                        onClick={() =>
                                                            setPageNumber((prev) => Math.max(prev - 1, 0))
                                                        }
                                                    />
                                                    <Pagination.Item active>{pageNumber + 1}</Pagination.Item>
                                                    <Pagination.Next
                                                        onClick={() =>
                                                            setPageNumber((prev) =>
                                                                Math.min(prev + 1, pageCount - 1)
                                                            )
                                                        }
                                                    />
                                                </Pagination>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyerOrders;
