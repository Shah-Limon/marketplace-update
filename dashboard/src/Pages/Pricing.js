import React, { useEffect, useState } from "react";
import SidebarMenu from "../components/Shared/SidebarMenu";
import { Link } from "react-router-dom";

const Pricing = () => {
    const [pricings, setPricings] = useState([]);
    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/shahmpolash/shahmpolash/main/pricings.json`)
            .then((res) => res.json())
            .then((info) => setPricings(info));
    }, []);

    return (
        <>

            <SidebarMenu></SidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">

                        <div class="col-sm-6 col-md-4 col-xl-3">
                            <div class="my-4 text-center">
                                <button type="button" class="btn btn-success waves-effect waves-light"
                                    data-bs-toggle="modal" data-bs-target=".bs-example-modal-center"><i
                                        class="mdi mdi-plus me-2"></i>Add Package</button>
                            </div>

                            <div class="modal fade bs-example-modal-center" tabindex="-1" role="dialog"
                                aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <input type='text' placeholder="Package Name"></input>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Package List</h4>

                                        <div class="table-responsive">
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Package Name</th>
                                                        <th>Price</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        pricings.map(price =>
                                                            <tr data-id="1">
                                                                <td data-field="id" style={{ width: '80px' }}>1</td>
                                                                <td data-field="name">{price.packageName}</td>
                                                                <td data-field="age">${price.packagePrice} USD</td>
                                                                <td style={{ width: '100px' }}>
                                                                    <a class="btn btn-outline-secondary btn-sm edit" title="Edit">
                                                                        <i class="fas fa-pencil-alt"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }

                                                </tbody>

                                            </table>
                                        </div>
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

export default Pricing;
