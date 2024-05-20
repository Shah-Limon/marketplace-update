import React from "react";
import { Link } from "react-router-dom";



const SidebarMenu = () => {
    return (
        <div className="vertical-menu">
            <div data-simplebar="" className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">Menu</li>
                        <li>
                            <Link to='/admin/dashboard' className="waves-effect">
                                <i className="ri-dashboard-line" />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/messages' className="waves-effect">
                                <i className="ri-mail-send-line" />
                                <span>Messages</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/orders' className="waves-effect">
                                <i className="ri-calendar-2-line" />
                                <span>Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/all-withdrawal' className="waves-effect">
                                <i className="ri-exchange-dollar-line" />
                                <span>All Withdrawal</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/all-products' className="waves-effect">
                                <i className="ri-product-hunt-line" />
                                <span>All Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/categories' className="waves-effect">
                                <i className="ri-newspaper-line" />
                                <span>All Categories</span>
                            </Link>
                        </li>
                        <li>
                            <a href="javascript: void(0);" className="has-arrow waves-effect">
                                <i className="ri-user-settings-line" />
                                <span>Users</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="true">
                                <li>
                                    <Link to="/admin/users/admins">Manage Users</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/admin/support-messages' className="waves-effect">
                                <i className="ri-newspaper-line" />
                                <span>Support Messages</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/settings" className="waves-effect">
                                <i class=" fas fa-cog"></i>
                                <span>Settings</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;
