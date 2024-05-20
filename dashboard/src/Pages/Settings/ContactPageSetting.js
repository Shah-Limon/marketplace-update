import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";

const ContactPageSetting = () => {
    const [contact, setContact] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/contact`)
            .then((res) => res.json())
            .then((info) => setContact(info[0]));
    }, []);



    const handleEditPayment = (event, id) => {
        event.preventDefault();
        const description = event.target.description.value;
        const titleOne = event.target.titleOne.value;
        const titleTwo = event.target.titleTwo.value;
        const address = event.target.address.value;
        const phone = event.target.phone.value;
        const email = event.target.email.value;
        const edit = {
            description,
            titleOne,
            titleTwo,
            address,
            phone,
            email,
        };
        const url = `http://localhost:5000/contact/${contact._id}`;
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
                const modal = document.querySelector(`.contactModal${contact._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                // Fetch the updated list of services
                fetch(`http://localhost:5000/contact`)
                    .then((res) => res.json())
                    .then((info) => setContact(info[0]));
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
                                                    <span>Contact Page Setting</span>
                                                </>
                                            </span>
                                        </h3>
                                    </div>
                                </div>


                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#contactModal${contact._id}`}>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <div className={`modal fade contactModal${contact._id}`} id={`contactModal${contact._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${contact._id}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`exampleModalLabelStatus${contact._id}`}>Edit</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="comment-form" onSubmit={(event) => handleEditPayment(event, contact._id)}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Edit Contact Page Information</h3></div>
                                                    </div>
                                                    <div class="justify-content-center align-items-baseline">
                                                        <div class="col-sm">
                                                            <label className="mt-1">Title (1st Part)</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Type Title"
                                                                    name="titleOne"
                                                                    defaultValue={contact.titleOne}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Title (2nd Part)</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Type Title"
                                                                    name="titleTwo"
                                                                    defaultValue={contact.titleTwo}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">description</label>
                                                            <div class="form-group mb-3">
                                                                <textarea
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Type Title Top Text"
                                                                    name="description"
                                                                    defaultValue={contact.description}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Address</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Type Your Address"
                                                                    name="address"
                                                                    defaultValue={contact.address}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Phone Number</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Type Phone Number"
                                                                    name="phone"
                                                                    defaultValue={contact.phone}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Email</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Type Email"
                                                                    name="email"
                                                                    defaultValue={contact.email}
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

export default ContactPageSetting;
