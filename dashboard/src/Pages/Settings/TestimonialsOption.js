import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const TestimonialsOption = () => {
    const [testimonial, setTestimonial] = useState([]);
    const [title, setTitle] = useState({});
    const [user] = useAuthState(auth);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/testimonials`)
            .then((res) => res.json())
            .then((info) => setTestimonial(info));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/testimonials-title`)
            .then((res) => res.json())
            .then((info) => setTitle(info[0]));
    }, [id]);


    const handleEditTestimonialsTitle = (event, titleId) => { // Receive titleId here
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;

        const add = {
            title,
            description,
        };

        const url = `http://localhost:5000/testimonial-title/${titleId}`; // Use titleId instead of title._id
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(add),
        })
            .then((res) => res.json())
            .then((result) => {
                event.target.reset();

                // Close the modal
                const modal = document.querySelector('.modal');
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
            })
            .catch((error) => {
                // Handle error
                console.error('Error updating testimonial title:', error);
            });
    };


    const handleEditTestimonials = (event, id) => {
        event.preventDefault();
        const personName = event.target.personName.value;
        const personTitle = event.target.personTitle.value;
        const desc = event.target.desc.value;
        const personImg = event.target.personImg.value;
        const edit = {
            personName,
            personTitle,
            personImg,
            desc,
        };
        const url = `http://localhost:5000/testimonial/${id}`;
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
                const modal = document.querySelector(`.HelpOptionModal${id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                // Fetch the updated list of services
                fetch(`http://localhost:5000/testimonials`)
                    .then((res) => res.json())
                    .then((info) => setTestimonial(info));
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
                            <div class="col-sm-6 col-md-4 col-xl-3">
                                <div class="my-4 text-center">
                                    <button type="button" class="btn btn-success waves-effect waves-light"
                                        data-bs-toggle="modal" data-bs-target=".bs-example-modal-center-addServices"><i
                                            class="mdi mdi-plus me-2"></i>Edit Testimonials Title</button>
                                </div>
                                <div class="modal fade bs-example-modal-center-addServices" tabindex="-1" role="dialog"
                                    aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form className="comment-form" onSubmit={(event) => handleEditTestimonialsTitle(event, title._id)}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Edit Testimonials Title</h3></div>
                                                    </div>
                                                    <div class="justify-content-center align-items-baseline">
                                                        <div class="col-sm">
                                                            <label className="mt-1">Title Text</label>
                                                            <div class="form-group mb-3">
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Title Text"
                                                                    name="title"
                                                                    defaultValue={title.title}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div class="col-sm">
                                                            <label className="mt-1">Enter description</label>
                                                            <div class="form-group mb-3">
                                                                <textarea
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter description"
                                                                    name="description"
                                                                    defaultValue={title.description}
                                                                />
                                                            </div>
                                                        </div>


                                                    </div>

                                                    <div className="text-center">
                                                        <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                            Update Title
                                                        </button>

                                                    </div>
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
                                            <h4 class="card-title">Testimonials Lists</h4>

                                            <div class="table-responsive">
                                                <table class="table table-editable table-nowrap align-middle table-edits">
                                                    <thead>
                                                        <tr>

                                                            <th>Person Name</th>
                                                            <th>Person Title</th>
                                                            <th>Edit</th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {testimonial === null ? (
                                                            <tr>
                                                                <td colSpan="4">Loading...</td>
                                                            </tr>
                                                        ) : testimonial.map((e, index) => (
                                                            <tr key={e._id}>

                                                                <td>{e.personName}</td>
                                                                <td>{e.personTitle}</td>
                                                                <td>
                                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#HelpOptionModal${index}`}>
                                                                        <i class="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                    <div className={`modal fade HelpOptionModal${e._id}`} id={`HelpOptionModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>Edit</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <form className="comment-form" onSubmit={(event) => handleEditTestimonials(event, e._id)}>
                                                                                        <div className="fadeInUp style-2 text-center">
                                                                                            <div className="main-title"><h3>Edit Testimonial</h3></div>
                                                                                        </div>
                                                                                        <div className="justify-content-center align-items-baseline">
                                                                                            <div className="col-sm">
                                                                                                <label className="mt-1">Enter Person Name</label>
                                                                                                <div className="form-group mb-3">
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        placeholder="Enter Person Name"
                                                                                                        name="personName"
                                                                                                        defaultValue={e.personName}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-sm">
                                                                                                <label className="mt-1">Enter Person Title</label>
                                                                                                <div className="form-group mb-3">
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        placeholder="Enter Person Title"
                                                                                                        name="personTitle"
                                                                                                        defaultValue={e.personTitle}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-sm">
                                                                                                <label className="mt-1">Upload Person Image</label>
                                                                                                <div className="form-group mb-3">
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        name="personImg"
                                                                                                        placeholder="person Img URL"
                                                                                                        defaultValue={e.personImg}
                                                                                                    />

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-sm">
                                                                                                <label className="mt-1">Testimonial Description</label>
                                                                                                <div className="form-group mb-3">
                                                                                                    <textarea
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        placeholder="Type Testimonial Description"
                                                                                                        name="desc"
                                                                                                        defaultValue={e.desc}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>


                                                                                        </div>

                                                                                        <div className="text-center">
                                                                                            <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                                                                Update Testimonial
                                                                                            </button>

                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        ))}
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

export default TestimonialsOption;
