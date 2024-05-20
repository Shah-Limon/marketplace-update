import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {

    const [orders, setOrders] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/orders?sellerEmail=${user?.email}`)
                .then((res) => res.json())
                .then((info) => {
                    setOrders(info.reverse());
                })
                .catch((error) => {
                    console.error("Error fetching orders: ", error);
                });
        }
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:5000/users?userEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setUserInfo(info[0]));
    }, [user]);

    const paidOrders = orders.filter(order => order.paymentStatus === 'Paid');
    const totalSalesAmount = paidOrders.reduce((total, order) => total + parseFloat(order.packagePrice), 0).toFixed(2);

    const currentBalanceNumber = parseFloat(userInfo.currentBalance);
    const formattedBalance = isNaN(currentBalanceNumber) ? '0.00' : currentBalanceNumber.toFixed(2);






    return (
        <section className="blog-page-area pd-top-100 pd-bottom-100">
            <div className="container">
                Welcome, {user?.email}
                <div className="row">
                    <div className="col-lg-4">
                        <div className="sidebar-area">
                            <div className="widget widget-client text-center">
                                <div className="thumb">
                                    <img src="https://cdn-icons-png.freepik.com/512/7892/7892379.png" alt="img" />
                                </div>
                                <h3 className="mb-3">
                                    <span className="counter_value badge bg-soft-primary text-primary fw-bold font-size-26 mb-0">
                                        ${formattedBalance}
                                    </span>
                                </h3>
                                <h4>Current Balance</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar-area">
                            <div className="widget widget-client text-center">
                                <div className="thumb">
                                    <img src="https://cdn-icons-png.freepik.com/512/11786/11786683.png" alt="img" />
                                </div>
                                <h3 className="mb-3">
                                    <span className="counter_value badge bg-soft-primary text-primary fw-bold font-size-26 mb-0">
                                        ${totalSalesAmount}
                                    </span>
                                </h3>
                                <h4>Total Earning</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar-area">
                            <div className="widget widget-client text-center">
                                <div className="thumb">
                                    <img src="https://cdn-icons-png.freepik.com/512/5901/5901074.png" alt="img" />
                                </div>
                                <h3 className="mb-3">
                                    <span className="counter_value badge bg-soft-primary text-primary fw-bold font-size-26 mb-0">
                                        {orders.length === 1 ? "1 item order" : `${orders.length} items orders`}
                                    </span>
                                </h3>
                                <div className="isotope-filters item-isotope-btn">
                                    <button className="button active">
                                        <Link to="/seller/orders">Total Orders</Link>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="col-lg-4">
                        <div className="sidebar-area">
                            <div className="widget widget-client text-center">
                                <div className="thumb">
                                    <img src="https://cdn-icons-png.freepik.com/512/4070/4070660.png" alt="img" />
                                </div>
                                <div className="isotope-filters item-isotope-btn">
                                    <button className="button active">
                                        <Link to="/seller/withdraw">Withdraw Balance</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar-area">
                            <div className="widget widget-client text-center">
                                <div className="thumb">
                                    <img src="https://cdn-icons-png.freepik.com/512/2268/2268705.png" alt="img" />
                                </div>
                                <div className="isotope-filters item-isotope-btn">
                                    <button className="button active">
                                        <Link to="/seller/products">Products</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar-area">
                            <div className="widget widget-client text-center">
                                <div className="thumb">
                                    <img src="https://cdn-icons-png.freepik.com/512/11430/11430276.png" alt="img" />
                                </div>
                                <div className="isotope-filters item-isotope-btn">
                                    <button className="button active">
                                        <Link to="/update-profile">Update Profile</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerDashboard;