import React, { useEffect, useState } from "react";

const EmailSetting = () => {
    
    const [emails, setEmail] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/emails`)
            .then((res) => res.json())
            .then((info) => setEmail(info[0]));
    }, []);



    const handleEditPayment = (event, id) => {
        event.preventDefault();
        const email = event.target.email.value;

        const edit = {
            email,

        };
        const url = `http://localhost:5000/email-from/${emails._id}`;
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
                const modal = document.querySelector(`.emailModal${emails._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                // Fetch the updated list of services
                fetch(`http://localhost:5000/emails`)
                    .then((res) => res.json())
                    .then((info) => setEmail(info[0]));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    return (
        <>
            <>
                <div className="col-lg-3 col-md-3 col-6 mb-4">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="p-4">
                                <div className="d-flex">
                                    <div className="flex-1">
                                        <h3 className="mb-3">
                                            <span
                                                className="counter_value"
                                                data-target={519545}>
                                                <>
                                                    <span>Email Setting</span>
                                                </>
                                            </span>
                                        </h3>
                                    </div>
                                </div>


                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#emailModal${emails._id}`}>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <div className={`modal fade emailModal${emails._id}`} id={`emailModal${emails._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${emails._id}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`exampleModalLabelStatus${emails._id}`}>Edit</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="comment-form" onSubmit={(event) => handleEditPayment(event, emails._id)}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Update Email</h3></div>
                                                    </div>
                                                    <div class="justify-content-center align-items-baseline">
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter  Email</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Type Email"
                                                                    name="email"
                                                                    defaultValue={emails.email}
                                                                />
                                                            </div>
                                                        </div>
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

                            </div>
                            <div>
                                <div
                                    id="visitors_charts"
                                    className="apex-charts"
                                    dir="ltr"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default EmailSetting;
