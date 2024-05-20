import React, { useEffect, useState } from "react";
import SellerSidebarMenu from "./SellerSidebarMenu";
import TopSelling from "./Feature/TopSelling";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [user] = useAuthState(auth)

    useEffect(() => {
        fetch(`http://localhost:5000/orders?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setOrders(info.reverse()));
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/users?userEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setUserInfo(info[0]));
    }, [user]);

    const paidOrders = orders.filter(order => order.paymentStatus === 'Received');
    const totalSalesAmount = paidOrders.reduce((total, order) => total + parseFloat(order.packagePrice), 0).toFixed(2);
    const currentBalanceNumber = parseFloat(userInfo.currentBalance);
    const formattedBalance = !isNaN(currentBalanceNumber) ? currentBalanceNumber.toFixed(2) : '0.00';



    return (
        <>
            <SellerSidebarMenu></SellerSidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Seller Dashboard</h4>
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
                                                                    {!isNaN(parseFloat(userInfo.currentBalance)) ? parseFloat(userInfo.currentBalance).toFixed(2) : '0.00'}
                                                                </span>
                                                            </h3>
                                                        </div>
                                                        <div className="">
                                                            <p className="badge bg-soft-primary text-primary fw-bold font-size-12 mb-0">
                                                                Current Balance
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <h5 className="badge bg-soft-primary text-muted font-size-14 mb-0">
                                                        <Link to="/seller/withdraw">  Withdraw Balance</Link>

                                                    </h5>
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
                                                                    ${totalSalesAmount}
                                                                </span>
                                                            </h3>
                                                        </div>
                                                        <div className="">
                                                            <p className="badge bg-soft-primary text-primary fw-bold font-size-12 mb-0">
                                                                Total Earning
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <h5 className="text-muted font-size-14 mb-0">Total Earning</h5>
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
                        <TopSelling></TopSelling>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerDashboard;
