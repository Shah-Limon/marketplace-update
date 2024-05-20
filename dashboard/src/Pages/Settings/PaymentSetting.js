import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";

const PaymentSetting = () => {
    const [paymentEmail, SetPaymentEmail] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/payments`)
            .then((res) => res.json())
            .then((info) => SetPaymentEmail(info[0]));
    }, []);

    const handleEditPayment = (event, id) => {
        event.preventDefault();
        const email = event.target.email.value;
        const edit = {
            email,
        };
        const url = `http://localhost:5000/payment/${id}`;
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
                fetch(`http://localhost:5000/payments`)
                    .then((res) => res.json())
                    .then((info) => SetPaymentEmail(info[0]));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    return (
        <>
            <>
                <SidebarMenu></SidebarMenu>
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <h2 class="card-title">Edit Paypal Email</h2>
                                            <div class="table-responsive">
                                                <table class="table table-editable table-nowrap align-middle table-edits">
                                                    <thead>
                                                        <tr>
                                                            <th>Paypal Email</th>
                                                            <th>Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr key={paymentEmail._id}>
                                                            <td data-field="age">{paymentEmail.email}</td>
                                                            <td style={{ width: '10%' }}>

                                                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${paymentEmail._id}`}>
                                                                    <i class="fas fa-pencil-alt"></i>
                                                                </button>
                                                                <div className={`modal fade colorModal${paymentEmail._id}`} id={`colorModal${paymentEmail._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${paymentEmail._id}`} aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id={`exampleModalLabelStatus${paymentEmail._id}`}>Edit</h5>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form className="comment-form" onSubmit={(event) => handleEditPayment(event, paymentEmail._id)}>
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
                                                                                                defaultValue={paymentEmail.email}
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
        </>
    );
};

export default PaymentSetting;
