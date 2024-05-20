import React from "react";
import { Link } from "react-router-dom";


const BuyerSidebarMenu = () => {
    return (
        <div className="vertical-menu">
            <div data-simplebar="" className="h-100">
                {/*- Sidemenu */}
                <div id="sidebar-menu">
                    {/* Left Menu Start */}
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>
                        <li>
                            <Link to='/buyer/dashboard' className="waves-effect">
                                <i className="ri-dashboard-line" />
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link to='/buyer/pending-payment' className="waves-effect">
                            <i class="ri-time-fill"></i>
                                <span>Pending Payments</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/buyer/orders' className="waves-effect">
                                <i className="ri-calendar-2-line" />
                                <span>Orders</span>
                            </Link>
                        </li>

                        <li>
                            <a href="javascript: void(0);" className="has-arrow waves-effect">

                                <i class=" fas fa-cog"></i>
                                <span>Setting</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to='/buyer/update-profile'>Update Profile</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/buyer/support" className="waves-effect">
                                <i className="fas fa-handshake" />
                                <span>Customer Support</span>
                            </Link>
                        </li>

                    </ul>
                    {/* end ul */}
                </div>
                {/* Sidebar */}
            </div>
        </div>
    );
};

export default BuyerSidebarMenu;
