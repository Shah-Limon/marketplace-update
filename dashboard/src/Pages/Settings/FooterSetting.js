import React, { useEffect, useState } from "react";

const FooterSetting = () => {
    const [footer, setFooter] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/footer-links`)
            .then((res) => res.json())
            .then((info) => setFooter(info[0]));
    }, []);



    const handleEditPayment = (event, id) => {
        event.preventDefault();
        const FooterAbout = event.target.FooterAbout.value;
        const CopyRight = event.target.CopyRight.value;

        const edit = {
            FooterAbout,
            CopyRight,
        };
        const url = `http://localhost:5000/footer-link/${footer._id}`;
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
                const modal = document.querySelector(`.footerModal${footer._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                // Fetch the updated list of services
                fetch(`http://localhost:5000/footer-footer`)
                    .then((res) => res.json())
                    .then((info) => setFooter(info[0]));
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
                                                    <span>Footer Setting</span>
                                                </>
                                            </span>
                                        </h3>
                                    </div>
                                </div>


                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#footerModal${footer._id}`}>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <div className={`modal fade footerModal${footer._id}`} id={`footerModal${footer._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${footer._id}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`exampleModalLabelStatus${footer._id}`}>Edit</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="comment-form" onSubmit={(event) => handleEditPayment(event, footer._id)}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Update Footer Info</h3></div>
                                                    </div>
                                                    <div class="justify-content-center align-items-baseline">
                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter Short About</label>
                                                            <div class="form-group mb-3">
                                                                <textarea
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Type short About"
                                                                    name="FooterAbout"
                                                                    defaultValue={footer.FooterAbout}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter CopyRight Text</label>
                                                            <div class="form-group mb-3">
                                                                <textarea
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter CopyRight Text"
                                                                    name="CopyRight"
                                                                    defaultValue={footer.CopyRight}
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

export default FooterSetting;
