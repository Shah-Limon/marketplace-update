import React from "react";
import SidebarMenu from "../components/Shared/SidebarMenu";

const MyLeads = () => {
    return (
        <>
            <>
                <SidebarMenu></SidebarMenu>
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="table-responsive mt-3">
                                <table
                                    className="table table-centered table-check datatable dt-responsive nowrap table-striped border"
                                    style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}
                                >
                                    <thead className="table-topbar text-uppercase">
                                        <tr>
                                            <th style={{ width: '20px' }}>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="checkAll" />
                                                    <label className="form-check-label mb-0" htmlFor="checkAll">&nbsp;</label>
                                                </div>
                                            </th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Wallet Balance</th>
                                            <th>Joining Date</th>
                                            <th>Location</th>
                                            <th>Send Message</th>
                                            <th style={{ width: '120px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="customercheck1" />
                                                    <label className="form-check-label mb-0" htmlFor="customercheck1">&nbsp;</label>
                                                </div>
                                            </td>
                                            <td>
                                                <img src="assets/images/users/avatar-1.jpg" className="rounded-circle h-auto avatar-xs me-2" />
                                                <span>Laura Monroe</span>
                                            </td>
                                            <td>LauraMMonroe@armyspy.com</td>
                                            <td>727-366-1384</td>
                                            <td>$ 3245</td>
                                            <td>06 Apr, 2020</td>
                                            <td>Canada</td>
                                            <td>

                                                <div class="col-sm-6 col-md-4 col-xl-3">
                                                    <div class="my-4 text-center">

                                                        <button class="btn btn-danger"
                                                            data-bs-toggle="modal" data-bs-target="#composemodal">
                                                            Compose
                                                        </button>
                                                    </div>

                                                    <div class="modal fade" id="composemodal" tabindex="-1" role="dialog" aria-labelledby="composemodalTitle"
                                                        aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h5 class="modal-title" id="composemodalTitle">New Message</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <form>
                                                                        <div class="mb-3">
                                                                            <input type="email" class="form-control" placeholder="To" />
                                                                        </div>

                                                                        <div class="mb-3">
                                                                            <input type="text" class="form-control" placeholder="Subject" />
                                                                        </div>
                                                                        <div class="mb-3">
                                                                            <form method="post">
                                                                                <textarea id="elm1" name="area"></textarea>
                                                                            </form>
                                                                        </div>

                                                                    </form>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                    <button type="button" class="btn btn-primary">Send <i
                                                                        class="fab fa-bs-telegram-plane ms-1"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td id="tooltip-container1">
                                                <a href="javascript:void(0);" className="me-3 text-primary" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                                    <i className="mdi mdi-pencil font-size-18"></i>
                                                </a>
                                                <a href="javascript:void(0);" className="text-danger" data-bs-container="#tooltip-container1" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                                    <i className="mdi mdi-trash-can font-size-18"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default MyLeads;
