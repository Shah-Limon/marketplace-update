import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";

const Services = () => {
    const [service, setService] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/services`)
            .then((res) => res.json())
            .then((info) => setService(info.reverse()));
    }, []);

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = service.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleCreateService = (event) => {
        event.preventDefault();
        const itemName = event.target.itemName.value;
        const itemDescription = event.target.itemDescription.value;
        const DownloadLink = event.target.DownloadLink.value;

        const add = {
            itemName,
            itemDescription,
            DownloadLink,
        };

        const url = `http://localhost:5000/add-service`;
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
                fetch(`http://localhost:5000/services`)
                    .then((res) => res.json())
                    .then((info) => setService(info.reverse()));
            })
            .catch((error) => {
                // Handle error
                console.error('Error creating service:', error);
            });
    };


    const handleEditService = (event, id) => {
        event.preventDefault();
        const itemName = event.target.itemName.value;
        const itemDescription = event.target.itemDescription.value;
        const DownloadLink = event.target.DownloadLink.value;

        const edit = {
            itemName,
            itemDescription,
            DownloadLink,
        };

        const url = `http://localhost:5000/update-service/${id}`;
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
                fetch(`http://localhost:5000/services`)
                    .then((res) => res.json())
                    .then((info) => setService(info.reverse()));
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
                                            class="mdi mdi-plus me-2"></i>Add Service</button>
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
                                                <form className="comment-form" onSubmit={handleCreateService}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Add Service</h3></div>
                                                    </div>
                                                    <div className="columns  gap20">
                                                        <fieldset className="email">
                                                            <label className="mb-2">Item or Service Name</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Item or Service Name."
                                                                className="form-control"
                                                                name="itemName"
                                                            />
                                                        </fieldset>


                                                        <fieldset className="message">
                                                            <label className="mb-2">Item Description</label>
                                                            <textarea
                                                                id="message"
                                                                name="itemDescription"
                                                                rows={4}
                                                                placeholder="Item Description"
                                                                className="form-control"
                                                                tabIndex={4}
                                                            />
                                                        </fieldset>
                                                        <fieldset className="message">
                                                            <label className="mb-2">Item Downloadable link</label>
                                                            <textarea
                                                                id="message"
                                                                name="DownloadLink"
                                                                rows={4}
                                                                placeholder="Item Downloadable link"
                                                                className="form-control"
                                                                tabIndex={4}
                                                            />
                                                        </fieldset>
                                                    </div>

                                                    <div className="text-center">
                                                        <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                            Add Service
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
                                            <h4 class="card-title">Service List</h4>

                                            <div class="table-responsive">
                                                <table class="table table-editable table-nowrap align-middle table-edits">
                                                    <thead>
                                                        <tr>

                                                            <th>Service Name</th>
                                                            <th>Description</th>
                                                            <th>Edit</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {service === null ? (
                                                            <tr>
                                                                <td colSpan="4">Loading...</td>
                                                            </tr>
                                                        ) : currentService.map((e, index) => (
                                                            <tr key={e._id}>

                                                                <td style={{ width: '20%' }} data-field="name">{e.itemName}</td>
                                                                <td data-field="age">{e.itemDescription}</td>
                                                                <td style={{ width: '10%' }}>

                                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                                        <i class="fas fa-pencil-alt"></i>
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
                                                                                    <form className="comment-form" onSubmit={(event) => handleEditService(event, e._id)}>
                                                                                        <div className="fadeInUp style-2 text-center">
                                                                                            <div className="main-title"><h3>Edit Service</h3></div>
                                                                                        </div>
                                                                                        <div className="columns  gap20">
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Item or Service Name</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="Item or Service Name."
                                                                                                    className="form-control"
                                                                                                    name="itemName"
                                                                                                    defaultValue={e.itemName}
                                                                                                />
                                                                                            </fieldset>


                                                                                            <fieldset className="message">
                                                                                                <label className="mb-2">Item Description</label>
                                                                                                <textarea
                                                                                                    id="message"
                                                                                                    name="itemDescription"
                                                                                                    defaultValue={e.itemDescription}
                                                                                                    rows={4}
                                                                                                    placeholder="Item Description"
                                                                                                    className="form-control"
                                                                                                    tabIndex={4}
                                                                                                />
                                                                                            </fieldset>
                                                                                            <fieldset className="message">
                                                                                                <label className="mb-2">Item Downloadable link</label>
                                                                                                <textarea
                                                                                                    id="message"
                                                                                                    name="DownloadLink"
                                                                                                    defaultValue={e.DownloadLink}
                                                                                                    rows={4}
                                                                                                    placeholder="Item Downloadable link"
                                                                                                    className="form-control"
                                                                                                    tabIndex={4}
                                                                                                />
                                                                                            </fieldset>
                                                                                        </div>

                                                                                        <div className="text-center">
                                                                                            <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                                                                Edit Service
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
                                                totalPages={Math.ceil(service.length / itemsPerPage)}
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

export default Services;
