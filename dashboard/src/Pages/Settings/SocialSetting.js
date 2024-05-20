import React, { useEffect, useState } from "react";

const SocialSetting = () => {
    const [social, setSocial] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/footer-social`)
            .then((res) => res.json())
            .then((info) => setSocial(info[0]));
    }, []);



    const handleEditPayment = (event, id) => {
        event.preventDefault();
        const facebook = event.target.facebook.value;
        const twitter = event.target.twitter.value;
        const instragram = event.target.instragram.value;
        const youtube = event.target.youtube.value;
        const email = event.target.email.value;
        const edit = {
            facebook,
            twitter,
            instragram,
            youtube,
            email
        };
        const url = `http://localhost:5000/footer-social/${social._id}`;
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
                const modal = document.querySelector(`.socialModal${social._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                // Fetch the updated list of services
                fetch(`http://localhost:5000/footer-social`)
                    .then((res) => res.json())
                    .then((info) => setSocial(info[0]));
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
                                                    <span>Social Setting</span>
                                                </>
                                            </span>
                                        </h3>
                                    </div>
                                </div>


                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#socialModal${social._id}`}>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <div className={`modal fade socialModal${social._id}`} id={`socialModal${social._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${social._id}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`exampleModalLabelStatus${social._id}`}>Edit</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="comment-form" onSubmit={(event) => handleEditPayment(event, social._id)}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Update Social Account Information</h3></div>
                                                    </div>
                                                    <div class="justify-content-center align-items-baseline">

                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Facebook Link</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Facebook Link"
                                                                    name="facebook"
                                                                    defaultValue={social.facebook}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Twiiter Link</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Twiiter Link"
                                                                    name="twitter"
                                                                    defaultValue={social.twitter}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Instragram Link</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Instragram Link"
                                                                    name="instragram"
                                                                    defaultValue={social.instragram}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Youtube Link</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Youtube Link"
                                                                    name="youtube"
                                                                    defaultValue={social.youtube}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Email</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Email"
                                                                    name="email"
                                                                    defaultValue={social.email}
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

export default SocialSetting;
