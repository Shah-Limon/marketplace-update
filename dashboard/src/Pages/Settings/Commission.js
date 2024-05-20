import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";

const Commission = () => {
    const [commission, SetCommissions] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/commissions`)
            .then((res) => res.json())
            .then((info) => SetCommissions(info[0]));
    }, []);

    const handleEditPayment = (event, id) => {
        event.preventDefault();
        const commission = event.target.commission.value;
        const edit = {
            commission,
        };
        const url = `http://localhost:5000/commission/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(edit),
        })
            .then((res) => res.json())
            .then((result) => {
                event.target.reset();
                const modal = document.querySelector(`.colorModal${id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                // Fetch the updated list of services
                fetch(`http://localhost:5000/commissions`)
                    .then((res) => res.json())
                    .then((info) => SetCommissions(info[0]));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    return (
        <>
            <SidebarMenu></SidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h2 class="card-title">Edit Commission</h2>
                                        <div class="table-responsive">
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Commission Rate</th>
                                                        <th>Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr key={commission._id}>
                                                        <td data-field="age">{commission.commission}%</td>
                                                        <td style={{ width: '10%' }}>
                                                            <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${commission._id}`}>
                                                                <i class="fas fa-pencil-alt"></i>
                                                            </button>
                                                            <div className={`modal fade colorModal${commission._id}`} id={`colorModal${commission._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${commission._id}`} aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id={`exampleModalLabelStatus${commission._id}`}>Edit</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <form className="comment-form" onSubmit={(event) => handleEditPayment(event, commission._id)}>
                                                                                <div className="fadeInUp style-2 text-center">
                                                                                    <div className="main-title"><h3>Edit Commission Rate</h3></div>
                                                                                </div>
                                                                                <div className="columns  gap20">
                                                                                    <fieldset className="email">
                                                                                        <label className="mb-2">Commission Rate</label>
                                                                                        <input
                                                                                            type="text"
                                                                                            placeholder="Commission Rate"
                                                                                            className="form-control"
                                                                                            name="commission"
                                                                                            defaultValue={commission.commission}
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
                                                        </td>
                                                    </tr>
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

export default Commission;
