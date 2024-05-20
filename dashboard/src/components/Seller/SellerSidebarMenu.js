import React from "react";
import { Link } from "react-router-dom";



const SellerSidebarMenu = () => {
    return (
        <div className="vertical-menu">
            <div data-simplebar="" className="h-100">
                {/*- Sidemenu */}
                <div id="sidebar-menu">
                    {/* Left Menu Start */}
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>

                        <li>
                            <Link to='/seller/dashboard' className="waves-effect">
                                <i className="ri-dashboard-line" />
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link to='/seller/products' className="waves-effect">
                                <i className="ri-product-hunt-line" />
                                <span>Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/seller/orders' className="waves-effect">
                                <i className="ri-calendar-2-line" />
                                <span>Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/seller/withdraw' className="waves-effect">
                            <i class="ri-currency-fill"></i>                       
                                <span>Withdraw</span>
                            </Link>
                        </li>
                        <li>
                            <a href="javascript: void(0);" className="has-arrow waves-effect">
                                <i class=" fas fa-cog"></i>
                                <span>Setting</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <Link to='/seller/update-profile'>Update Profile</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="http://localhost:3000/" className="waves-effect" target="_blank">
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

export default SellerSidebarMenu;
