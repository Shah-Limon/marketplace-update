import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 10;
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch(`http://localhost:5000/orders`)
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

  // const handleUpdateOrderStatus = (orderId, updatedOrderStatus, updatedPaymentStatus) => {
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ orderStatus: updatedOrderStatus, paymentStatus: updatedPaymentStatus })
  //   };

  //   fetch(`http://localhost:5000/order-status/${orderId}`, requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       toast.success('Order status updated successfully');
  //       fetchOrders();
  //     })
  //     .catch(error => console.error('Error updating order status:', error));
  // };
  const handleUpdateOrderStatus = (orderId, updatedOrderStatus, updatedPaymentStatus) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus: updatedOrderStatus, paymentStatus: updatedPaymentStatus })
    };

    fetch(`http://localhost:5000/order-status/${orderId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (updatedPaymentStatus === 'Paid') {
          // Fetch commission rate
          fetch(`http://localhost:5000/commissions`)
            .then(res => res.json())
            .then(commissions => {
              const commissionRate = commissions[0].commission;

              // Calculate commission amount
              const order = filteredOrders.find(order => order._id === orderId);
              const commissionAmount = order.packagePrice * (commissionRate / 100);

              // Fetch seller's information
              fetch(`http://localhost:5000/users?userEmail=${order.sellerEmail}`)
                .then(res => res.json())
                .then(sellerInfo => {
                  const seller = sellerInfo[0];
                  // Calculate updated balance
                  const updatedBalance = parseFloat((parseFloat(seller.currentBalance) + (parseFloat(order.packagePrice) - commissionAmount)).toFixed(2));
                  // Update seller's balance
                  fetch(`http://localhost:5000/user-balance/${seller._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentBalance: updatedBalance })
                  })
                    .then(() => {
                      toast.success('Order status updated successfully');
                      fetchOrders();
                    })
                    .catch(error => console.error('Error updating seller balance:', error));
                })
                .catch(error => console.error('Error fetching seller information:', error));
            })
            .catch(error => console.error('Error fetching commission rate:', error));
        } else {
          toast.success('Order status updated successfully');
          fetchOrders();
        }
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


  const [user] = useAuthState(auth)
  const [seller, setSeller] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/users?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((info) => setSeller(info[0]));
  }, [user?.email]);

  const [commission, SetCommissions] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/commissions`)
      .then((res) => res.json())
      .then((info) => SetCommissions(info[0]));
  }, []);

  return (
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
                      <option value="Paid">Paid</option>
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
                      <th>Order ID</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Order Status</th>
                      <th>View Details</th>

                      <th colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders
                      .slice(
                        pageNumber * ordersPerPage,
                        (pageNumber + 1) * ordersPerPage
                      )
                      .map((order) => (
                        <tr key={order._id}>
                          <td><p className="text-muted mb-0 font-size-11">{order.orderDate}</p></td>
                          <td><p className="text-muted mb-0 font-size-11">{order.orderId}</p></td>
                          <td>
                            <div className="d-flex">
                              <h5 className="font-size-13 text-truncate mb-1">
                                <Link className="text-dark">
                                  {order.customerName}
                                  <p className="text-muted mb-0 font-size-11">
                                    {order.customerEmail}
                                  </p>
                                </Link>
                              </h5>
                            </div>
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
                              {order.orderStatus}
                            </h6>
                          </td>
                          <td>
                            <h6 className="mb-1 font-size-13">
                              <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#contactModal${order._id}`}>
                                <i class="fas fa-eye"></i>
                              </button>
                              <div className={`modal fade contactModal${order._id}`} id={`contactModal${order._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${order._id}`} aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id={`exampleModalLabelStatus${order._id}`}>Orders Information</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                      <table class="table table-hover mb-0">
                                        <thead>
                                          <tr>
                                            <th>-</th>
                                            <th>-</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Order Id</td>
                                            <td>{order.orderId}</td>
                                          </tr>
                                          <tr>
                                            <td>Order Date</td>
                                            <td>{order.orderDate}</td>
                                          </tr>
                                          <tr>
                                            <td>package Id</td>
                                            <td>{order.packageId}</td>
                                          </tr>
                                          <tr>
                                            <td>Package Name</td>
                                            <td>{order.packageName}</td>
                                          </tr>
                                          <tr>
                                            <td>Package Price</td>
                                            <td>{order.packagePrice}</td>
                                          </tr>
                                          <tr>
                                            <td>Payment Status</td>
                                            <td>{order.paymentStatus}</td>
                                          </tr>
                                          <tr>
                                            <td>Order Status</td>
                                            <td>{order.orderStatus}</td>
                                          </tr>
                                          <tr>
                                            <td>Customer Email</td>
                                            <td>{order.customerEmail}</td>
                                          </tr>
                                          <tr>
                                            <td>Customer Name</td>
                                            <td>{order.customerName}</td>
                                          </tr>
                                          <tr>
                                            <td>Customer Website</td>
                                            <td>{order.customerWebsite}</td>
                                          </tr>
                                          <tr>
                                            <td>Customer Note</td>
                                            <td>{order.customerNote}</td>
                                          </tr>
                                          <tr>
                                            <td>Address</td>
                                            <td>
                                              <p style={{ whiteSpace: 'pre-wrap' }}>
                                                {formatText(order.address)}
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Country Name</td>
                                            <td>{order.countryName}</td>
                                          </tr>
                                          <tr>
                                            <td>city Name</td>
                                            <td>{order.cityName}</td>
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
                            <div className="btn btn-soft-primary btn-sm">
                              <button
                                type="button"
                                className="btn btn-primary waves-light waves-effect"
                                data-bs-toggle="modal"
                                data-bs-target={`#updatemodal_${order._id}`}
                              >
                                Update
                                <i className="mdi mdi-arrow-right ms-1" />
                              </button>
                              <div
                                className="modal fade"
                                id={`updatemodal_${order._id}`}
                                tabIndex={-1}
                                role="dialog"
                                aria-labelledby={`updatemodalTitle_${order._id}`}
                                aria-hidden="true"
                              >
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title">Order Status </h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                      <p>Current Order Status - {order.orderStatus}</p>
                                      <p>Seller Balance - {seller.currentBalance}</p>
                                      <label className="mt-1">Update Order Status </label>
                                      <div class="form-group mb-3">
                                        <select class="form-control" name="orderStatus" value={order.orderStatus} onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value, order.paymentStatus)}>
                                          <option value="Accepted">Accepted</option>
                                          <option value="Pending">Pending</option>
                                          <option value="Cancelled">Cancelled</option>
                                          <option value="Delivered">Delivered</option>
                                        </select>
                                      </div>
                                      <p>Current Payment Status - {order.paymentStatus}</p>
                                      <label className="mt-1">Update Payment Status</label>
                                      <div class="form-group mb-3">
                                        <select class="form-control" name="paymentStatus" value={order.paymentStatus} onChange={(e) => handleUpdateOrderStatus(order._id, order.orderStatus, e.target.value)}>
                                          <option value="Paid">Paid</option>
                                          <option value="Pending">Pending</option>
                                          <option value="Cancelled">Cancelled</option>
                                          <option value="Refunded">Refunded</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
  );
};
export default AllOrders;
