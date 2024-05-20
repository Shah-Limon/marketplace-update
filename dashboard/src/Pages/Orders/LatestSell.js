import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const LatestSell = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth)

    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then((res) => res.json())
            .then((info) => setOrders(info.reverse()));
    }, [user]);
    return (
        <>
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Latest Transactions</h4>
                        <div className="table-responsive">
                            <table
                                className="table table-centered border table-nowrap mb-0"
                                style={{
                                    borderCollapse: "collapse",
                                    borderSpacing: 0,
                                    width: "100%"
                                }}
                            >
                                <thead className="bg-light">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Billing Name</th>
                                        <th>Package Name</th>
                                        <th>Price</th>
                                        <th>Order Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.slice(0, 9).map(order =>
                                            <tr>
                                                <td>
                                                    {order.orderId}
                                                    <p className="text-muted mb-0 font-size-11">{order.orderDate}</p>
                                                </td>
                                                <td>
                                                    <div className="d-flex">
                                                        <div>
                                                            <h5 className="font-size-13 text-truncate mb-1">
                                                                <Link className="text-dark">
                                                                    {order.customerName}
                                                                </Link>
                                                            </h5>
                                                            <p className="text-muted mb-0 font-size-11 text-uppercase">
                                                                {order.customerEmail}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1 font-size-13">{order.packageName}</h6>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1 font-size-13">${order.packagePrice}</h6>
                                                    <p className="text-success text-uppercase  mb-0 font-size-11">
                                                        <i className="mdi mdi-circle-medium" />
                                                        {order.paymentStatus}
                                                    </p>
                                                </td>
                                                <td>
                                                    <h6 className="mb-1 font-size-13">{order.orderStatus}</h6>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            <div class="d-flex justify-content-center">
                                <Link to="/admin/orders" type="button" class="btn btn-success waves-effect waves-light m-2 text-center">
                                    <i class="ri-eye-line me-2"></i>
                                    See All
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LatestSell;