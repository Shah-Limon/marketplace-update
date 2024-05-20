import React, { useEffect, useState } from "react";
import BuyerSidebarMenu from "./BuyerSidebarMenu";
import BuyerLastestBuying from "./BuyerLastestBuying";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import BuyerOrders from "./BuyerOrders";

const BuyerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/orders?userEmail=${user.email}`)
                .then((res) => res.json())
                .then((info) => {
                    setOrders(info.reverse());
                })
                .catch((error) => {
                    console.error("Error fetching orders: ", error);
                });
        }
    }, [user]);

    const paidOrders = orders.filter(order => order.paymentStatus === 'Received');
    const totalSalesAmount = paidOrders.reduce((total, order) => total + parseFloat(order.packagePrice), 0).toFixed(2);
    return (
        <>
            <BuyerSidebarMenu></BuyerSidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Buyer Dashboard</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card">
                                            <div className="card-body p-0">
                                                <div className="p-4">
                                                    <div className="d-flex">
                                                        <div className="flex-1">
                                                            <h3 className="mb-3">
                                                                <span className="counter_value badge bg-soft-primary text-primary fw-bold font-size-26 mb-0">
                                                                    ${totalSalesAmount}
                                                                </span>
                                                            </h3>
                                                        </div>
                                                        <div className="">
                                                            <p className="badge bg-soft-primary text-primary fw-bold font-size-12 mb-0">
                                                                Total Expenses
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-muted font-size-14 mb-0">Total Expenses</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="card">
                                            <div className="card-body p-0">
                                                <div className="p-4">
                                                    <div className="d-flex">
                                                        <div className="flex-1">
                                                            <h3 className="mb-3">
                                                                <span className="counter_value badge bg-soft-primary text-primary fw-bold font-size-26 mb-0">
                                                                    {orders.length}
                                                                </span>
                                                            </h3>
                                                        </div>
                                                        <div className="">
                                                            <p className="badge bg-soft-primary text-primary fw-bold font-size-12 mb-0">
                                                                Total Orders
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-muted font-size-14 mb-0">Total Orders</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BuyerLastestBuying></BuyerLastestBuying>
                     
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyerDashboard;
