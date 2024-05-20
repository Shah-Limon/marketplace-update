import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";

const Managers = () => {
    const [managers, setmanagers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/managers`)
            .then((res) => res.json())
            .then((info) => setmanagers(info.reverse()));
    }, []);

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = managers.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleCreateCustomer = (event) => {
        event.preventDefault();
        const userName = event.target.userName.value;
        const userEmail = event.target.userEmail.value;
        const location = event.target.location.value;
        const userRole = event.target.userRole.value;

        const add = {
            userName,
            userEmail,
            location,
            userRole
        };

        const url = `http://localhost:5000/add-manager`;
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
                fetch(`http://localhost:5000/managers`)
                    .then((res) => res.json())
                    .then((info) => setmanagers(info.reverse()));
            })
            .catch((error) => {

                console.error('Error creating service:', error);
            });
    };


    const handleEditCustomer = (event, id) => {
        event.preventDefault();
        const userName = event.target.userName.value;
        const userEmail = event.target.userEmail.value;
        const location = event.target.location.value;
        const userRole = event.target.userRole.value;

        const edit = {
            userName,
            userEmail,
            location,
            userRole
        };

        const url = `http://localhost:5000/manager/${id}`;
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
                fetch(`http://localhost:5000/managers`)
                    .then((res) => res.json())
                    .then((info) => setmanagers(info.reverse()));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        fetch(`http://localhost:5000/manager/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const updatedUsers = managers.filter((user) => user._id !== userId);
                setmanagers(updatedUsers);
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
                                            class="mdi mdi-plus me-2"></i>Add Managers</button>
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
                                                <form className="comment-form" onSubmit={handleCreateCustomer}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Add Managers</h3></div>
                                                    </div>
                                                    <div className="columns  gap20">
                                                        <input
                                                            hidden
                                                            type="text"
                                                            name="userRole"
                                                            value="Manager"
                                                        />


                                                        <fieldset className="email">
                                                            <label className="mb-2">Manager Name</label>
                                                            <input
                                                                required
                                                                type="text"
                                                                placeholder="Manager Name"
                                                                className="form-control"
                                                                name="userName"
                                                            />
                                                        </fieldset>
                                                        <fieldset className="email">
                                                            <label className="mb-2">Manager Email</label>
                                                            <input
                                                                required
                                                                type="email"
                                                                placeholder="Manager Email"
                                                                className="form-control"
                                                                name="userEmail"
                                                            />
                                                        </fieldset>
                                                        <fieldset className="email">
                                                            <label className="mb-2">location</label>
                                                            <input
                                                                required
                                                                type="text"
                                                                placeholder="Location"
                                                                className="form-control"
                                                                name="location"
                                                            />
                                                        </fieldset>
                                                    </div>

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
                                            <h4 class="card-title">Managers List</h4>

                                            <div class="table-responsive">
                                                <table class="table table-editable table-nowrap align-middle table-edits">
                                                    <thead>
                                                        <tr>

                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>location</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {managers === null ? (
                                                            <tr>
                                                                <td colSpan="4">Loading...</td>
                                                            </tr>
                                                        ) : currentService.map((e, index) => (
                                                            <tr key={e._id}>

                                                                <td style={{ width: '20%' }} data-field="name">{e.userName}</td>
                                                                <td data-field="age">{e.userEmail}</td>
                                                                <td data-field="age">{e.location}</td>
                                                                <td style={{ width: '10%' }}>

                                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                                        <i class="fas fa-pencil-alt"></i>
                                                                    </button>

                                                                </td>
                                                                <td style={{ width: '10%' }}>

                                                                    <button class="btn btn-outline-danger btn-sm edit" title="delete" type="button" onClick={() => handleDeleteUser(e._id)}>
                                                                        <i class=" ri-delete-bin-6-line"></i>
                                                                    </button>

                                                                </td>
                                                                <td>

                                                                    <div className={`modal fade colorModal${e._id}`} id={`colorModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>Edit</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <form className="comment-form" onSubmit={(event) => handleEditCustomer(event, e._id)}>
                                                                                        <div className="fadeInUp style-2 text-center">
                                                                                            <div className="main-title"><h3>Edit Manager Info</h3></div>
                                                                                        </div>
                                                                                        <div className="columns  gap20">
                                                                                            <fieldset className="email">
                                                                                                <input
                                                                                                 hidden
                                                                                                    type="text"
                                                                                                    name="userRole"
                                                                                                    defaultValue={e.userRole}
                                                                                                />
                                                                                                <label className="mb-2">Manager Name</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="Manager Name"
                                                                                                    className="form-control"
                                                                                                    name="userName"
                                                                                                    defaultValue={e.userName}
                                                                                                />
                                                                                            </fieldset>
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Manager Email</label>
                                                                                                <input
                                                                                                    type="email"
                                                                                                    placeholder="Manager Email"
                                                                                                    className="form-control"
                                                                                                    name="userEmail"
                                                                                                    defaultValue={e.userEmail}
                                                                                                />
                                                                                            </fieldset>
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">location</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="location"
                                                                                                    className="form-control"
                                                                                                    name="location"
                                                                                                    defaultValue={e.location}
                                                                                                />
                                                                                            </fieldset>



                                                                                        </div>

                                                                                        <div className="text-center">
                                                                                            <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                                                                Edit
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
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={Math.ceil(managers.length / itemsPerPage)}
                                                onPageChange={handlePageChange}
                                            />
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

export default Managers;
