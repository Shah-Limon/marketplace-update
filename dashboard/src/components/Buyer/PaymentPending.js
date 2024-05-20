import React, { useEffect, useState } from "react";
import Pagination from "../../components/Shared/Pagination";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import BuyerSidebarMenu from "./BuyerSidebarMenu";
import { Link } from "react-router-dom";

const PaymentPending = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth)

    useEffect(() => {
        fetch(`http://localhost:5000/orders?userEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setOrders(info.reverse()));
    }, [user]);

    // Filter orders with paymentStatus === "Pending"
    const pendingPayment = orders.filter(
        (order) => order.paymentStatus === "pending"
    );

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = pendingPayment.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    return (
        <>
            <BuyerSidebarMenu></BuyerSidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Pending Pending</h4>

                                        <div class="table-responsive">
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Order ID.</th>
                                                        <th>Date</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {orders === null ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : currentService.map((e, index) => (
                                                        <tr key={e._id}>
                                                            <td data-field="orderId">{e.orderId}</td>
                                                            <td data-field="orderId">{e.orderDate}</td>
                                                            <td data-field="packageName">{e.packageName}</td>
                                                            <td data-field="packagePrice">${e.packagePrice}</td>
                                                            <td>
                                                                <div>
                                                                    <Link to={`/pay-now/${e._id}`} className="btn btn-success waves-effect waves-light" type="submit">
                                                                        <i class="ri-stripe-line me-2"></i>
                                                                        <span>Pay With PayPal</span>
                                                                    </Link>

                                                                    

                                                                </div>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={Math.ceil(pendingPayment.length / itemsPerPage)}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPending;
