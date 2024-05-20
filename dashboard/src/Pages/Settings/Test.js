import React from 'react';

const Test = () => {
    return (
        <>
            <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#contactModal${orders._id}`}>
                <i class="fas fa-pencil-alt"></i>
            </button>
            <div className={`modal fade contactModal${orders._id}`} id={`contactModal${orders._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${orders._id}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`exampleModalLabelStatus${orders._id}`}>Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="comment-form">
                                <div className="fadeInUp style-2 text-center">
                                    <div className="main-title"><h3>Edit Paypal Email</h3></div>
                                </div>
                                <div className="columns  gap20">

                                    <fieldset className="email">
                                        <label className="mb-2">Payment Email</label>
                                        <input
                                            type="text"
                                            placeholder="Payment Email"
                                            className="form-control"
                                            name="email"
                                            defaultValue={orders.email}
                                        />
                                    </fieldset>
                                </div>

                                <div className="text-center">
                                    <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                        Update
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Test;