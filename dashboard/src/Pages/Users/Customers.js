import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/customers`)
            .then((res) => res.json())
            .then((info) => setCustomers(info.reverse()));
    }, []);

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = customers.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleCreateCustomer = (event) => {
        event.preventDefault();
        const customerName = event.target.customerName.value;
        const customerEmail = event.target.customerEmail.value;
        const location = event.target.location.value;
        const userRole = event.target.userRole.value;

        const add = {
            customerName,
            customerEmail,
            location,
            userRole
        };

        const url = `http://localhost:5000/add-customer`;
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
                fetch(`http://localhost:5000/customers`)
                    .then((res) => res.json())
                    .then((info) => setCustomers(info.reverse()));
            })
            .catch((error) => {

                console.error('Error creating service:', error);
            });
    };


    const handleEditCustomer = (event, id) => {
        event.preventDefault();
        const customerName = event.target.customerName.value;
        const customerEmail = event.target.customerEmail.value;
        const location = event.target.location.value;

        const edit = {
            customerName,
            customerEmail,
            location,
        };

        const url = `http://localhost:5000/update-customer/${id}`;
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
                fetch(`http://localhost:5000/customers`)
                    .then((res) => res.json())
                    .then((info) => setCustomers(info.reverse()));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        fetch(`http://localhost:5000/delete-customer/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const updatedUsers = customers.filter((user) => user._id !== userId);
                setCustomers(updatedUsers);
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
                                            class="mdi mdi-plus me-2"></i>Add Customer</button>
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
                                                        <div className="main-title"><h3>Add Customers</h3></div>
                                                    </div>
                                                    <div className="columns  gap20">
                                                        <input
                                                            hidden
                                                            type="text"
                                                            name="userRole"
                                                            value="customer"
                                                        />


                                                        <fieldset className="email">
                                                            <label className="mb-2">Customers Name</label>
                                                            <input
                                                                required
                                                                type="text"
                                                                placeholder="Customers Name"
                                                                className="form-control"
                                                                name="customerName"
                                                            />
                                                        </fieldset>
                                                        <fieldset className="email">
                                                            <label className="mb-2">Customers Email</label>
                                                            <input
                                                                required
                                                                type="email"
                                                                placeholder="Customers Email"
                                                                className="form-control"
                                                                name="customerEmail"
                                                            />
                                                        </fieldset>
                                                        <fieldset className="email">
                                                            <label className="mb-2">Customer location</label>
                                                            <input
                                                                required
                                                                type="text"
                                                                placeholder="Customer location"
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
                                            <h4 class="card-title">Customers List</h4>

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
                                                        {customers === null ? (
                                                            <tr>
                                                                <td colSpan="4">Loading...</td>
                                                            </tr>
                                                        ) : currentService.map((e, index) => (
                                                            <tr key={e._id}>

                                                                <td style={{ width: '20%' }} data-field="name">{e.customerName}</td>
                                                                <td data-field="age">{e.customerEmail}</td>
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
                                                                                            <div className="main-title"><h3>Edit Customer Info</h3></div>
                                                                                        </div>
                                                                                        <div className="columns  gap20">
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Customer Name</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="Customer Name"
                                                                                                    className="form-control"
                                                                                                    name="customerName"
                                                                                                    defaultValue={e.customerName}
                                                                                                />
                                                                                            </fieldset>
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Customer Email</label>
                                                                                                <input
                                                                                                    type="email"
                                                                                                    placeholder="customer Email"
                                                                                                    className="form-control"
                                                                                                    name="customerEmail"
                                                                                                    defaultValue={e.customerEmail}
                                                                                                />
                                                                                            </fieldset>
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Customer location</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="Customer location"
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
                                                totalPages={Math.ceil(customers.length / itemsPerPage)}
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

export default Customers;
