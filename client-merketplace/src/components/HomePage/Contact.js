import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const navigate = useNavigate();

    const notifySuccess = () => {
        toast.success("Message Sent Successfully!");
    };

    const UserContactMessage = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const message = event.target.message.value;
        const subject = event.target.subject.value;
        const date = event.target.date.value;
        const messageStatus = event.target.messageStatus.value;

        const contact = {
            name,
            email,
            message,
            subject,
            date,
            messageStatus,
        };

        const url = `http://localhost:5000/add-contact-message`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(contact),
        })
            .then((res) => res.json())
            .then((result) => {
                event.target.reset();
                notifySuccess();
            });
    };
    // Function to get the current date in yyyy-MM-dd format
    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <>
                <section className="contact-page-area pd-top-100 pd-bottom-70">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-contact-wrap text-center">
                                    <div className="thumb">
                                        <img src="assets/img/icon/map-marker.png" alt="img" />
                                    </div>
                                    <h4>Our Address</h4>
                                    <p>PSD Building, 2 AlBahr St, Loskia</p>
                                    <p>sripur, jamukara.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-contact-wrap text-center">
                                    <div className="thumb">
                                        <img src="assets/img/icon/phone-pad.png" alt="img" />
                                    </div>
                                    <h4>Our Phone</h4>
                                    <p>Office Telephone : 0029129102320</p>
                                    <p>Mobile : 000 2324 39493</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-contact-wrap text-center">
                                    <div className="thumb">
                                        <img src="assets/img/icon/envelope.png" alt="img" />
                                    </div>
                                    <h4>Our Email</h4>
                                    <p>Main Email : Dmarket@website.com</p>
                                    <p>Inquiries : Info@market.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact-form-area bg-sky-blue pd-top-100 pd-bottom-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 text-center">
                                <div className="sign-in-area">
                                    <div className="section-title text-center">
                                        <h6>Contact</h6>
                                        <h3>Get in Touch</h3>
                                    </div>
                                    <form className="contact-form-wrap" onSubmit={UserContactMessage}>
                                        <input
                                            type="date"
                                            hidden
                                            name="date"
                                            value={currentDate}
                                            onChange={(e) => setCurrentDate(e.target.value)}
                                        />
                                        <input
                                            hidden
                                            type="text"
                                            name="messageStatus"
                                            value="UnRead"
                                        />
                                        <div className='d-flex'>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="single-input-wrap input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Your Name"
                                                        name='name'
                                                    />
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="far fa-user" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="single-input-wrap input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Your Email"
                                                        name='email'
                                                    />
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="far fa-envelope" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-input-wrap input-group">
                                            <label htmlFor="inp-2">Subject</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Subject"
                                                name='subject'
                                            />
                                        </div>
                                        <div className="single-input-wrap input-group">
                                            <label htmlFor="inp-2">Message</label>
                                            <textarea
                                                className="form-control"
                                                rows={4}
                                                placeholder="Message"
                                                name='message'
                                                defaultValue={""}
                                            />

                                        </div>
                                        <div className="submit-area text-center">
                                            <button type="submit" className="btn btn-base">
                                                SEND MESSAGE{" "}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>

        </>
    );
};

export default Contact;