import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const HelpOption = () => {
    const [helpOption, setHelpOption] = useState([]);
    const [title, setTitle] = useState({});
    const [user] = useAuthState(auth);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/all-help-section`)
            .then((res) => res.json())
            .then((info) => setHelpOption(info));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/help-section-title`)
            .then((res) => res.json())
            .then((info) => setTitle(info[0]));
    }, [id]);

    const handleDelete = (serviceId) => {
        fetch(`http://localhost:5000/delete-help/${serviceId}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res;
            })
            .then(() => {
                const updatedChoose = helpOption.filter((e) => e._id !== serviceId);
                setHelpOption(updatedChoose);
            })
            .catch((error) => {
                console.error("There was a problem with the delete request:", error);
            });
    };


    const handleCreateHelp = (event) => {
        event.preventDefault();
        const image = event.target.image.value;
        const title = event.target.title.value;
        const description = event.target.description.value;

        const add = {
            image,
            title,
            description,
        };

        const url = `http://localhost:5000/add-help`;
        fetch(url, {
            method: "POST",
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

                // Fetch the updated list of services
                fetch(`http://localhost:5000/all-help-section`)
                    .then((res) => res.json())
                    .then((info) => setHelpOption(info.reverse()));
            })
            .catch((error) => {
                // Handle error
                console.error('Error creating service:', error);
            });
    };


    const handleEditHelp = (event, id) => {
        event.preventDefault();
        const image = event.target.image.value;
        const title = event.target.title.value;
        const description = event.target.description.value;
        const edit = {
            image,
            title,
            description,
        };
        const url = `http://localhost:5000/edit-help-section/${id}`;
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
                fetch(`http://localhost:5000/all-help-section`)
                    .then((res) => res.json())
                    .then((info) => setHelpOption(info.reverse()));
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
                                            class="mdi mdi-plus me-2"></i>Add Help Option</button>
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
                                                <form className="comment-form" onSubmit={handleCreateHelp}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Add Help Option</h3></div>
                                                    </div>
                                                    <div className="columns  gap20">
                                                        <fieldset className="name ">
                                                            <label>Image URL</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter Image URL"
                                                                className="mb-20 form-control"
                                                                name="image"
                                                                tabIndex={2}
                                                                required
                                                            />
                                                        </fieldset>
                                                        <fieldset className="Enter Title">
                                                            <label>Enter Title</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Enter Title"
                                                                className="mb-20 form-control"
                                                                name="title"
                                                                tabIndex={2}
                                                                defaultValue=""
                                                                aria-required="true"
                                                                required=""
                                                            />
                                                        </fieldset>
                                                    </div>

                                                    <fieldset className="Enter Short Description">
                                                        <label>Enter Short Description</label>
                                                        <textarea
                                                            id="message"
                                                            name="description"
                                                            rows={4}
                                                            placeholder="Description"
                                                            className="mb-20 form-control"
                                                            tabIndex={4}
                                                            aria-required="true"
                                                            required=""
                                                            defaultValue={""}
                                                        />
                                                    </fieldset>

                                                    <div className="text-center">
                                                        <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                            Add
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
                                            <h4 class="card-title">Help Option Lists</h4>

                                            <div class="table-responsive">
                                                <table class="table table-editable table-nowrap align-middle table-edits">
                                                    <thead>
                                                        <tr>

                                                            <th>Title</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {helpOption === null ? (
                                                            <tr>
                                                                <td colSpan="4">Loading...</td>
                                                            </tr>
                                                        ) : helpOption.map((e, index) => (
                                                            <tr key={e._id}>

                                                                <td>{e.title}</td>
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
                                                                                    <form className="comment-form" onSubmit={(event) => handleEditHelp(event, e._id)}>
                                                                                        <div className="fadeInUp style-2 text-center">
                                                                                            <div className="main-title"><h3>Edit API</h3></div>
                                                                                        </div>
                                                                                        <div className="columns  gap20">
                                                                                            <fieldset className="name ">
                                                                                                <label>Image URL</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="Enter Image URL"
                                                                                                    className="mb-20 form-control"
                                                                                                    name="image"
                                                                                                    tabIndex={2}
                                                                                                    required
                                                                                                    defaultValue={e.image}
                                                                                                />
                                                                                            </fieldset>
                                                                                            <fieldset className="Enter Title">
                                                                                                <label>Enter Title</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="Enter Title"
                                                                                                    className="mb-20 form-control"
                                                                                                    name="title"
                                                                                                    tabIndex={2}
                                                                                                    defaultValue={e.title}
                                                                                                    aria-required="true"
                                                                                                    required=""
                                                                                                />
                                                                                            </fieldset>
                                                                                        </div>

                                                                                        <fieldset className="Enter Short Description">
                                                                                            <label>Enter Short Description</label>
                                                                                            <textarea

                                                                                                name="description"
                                                                                                rows={4}
                                                                                                placeholder="Description"
                                                                                                className="mb-20 form-control"
                                                                                                tabIndex={4}
                                                                                                aria-required="true"
                                                                                                required
                                                                                                defaultValue={e.description}
                                                                                            />
                                                                                        </fieldset>

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

                                                                <td> <button class="btn btn-outline-danger btn-sm edit" title="delete" type="button" onClick={() => handleDelete(e._id)}>
                                                                    <i class=" ri-delete-bin-6-line"></i>
                                                                </button></td>
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

export default HelpOption;
