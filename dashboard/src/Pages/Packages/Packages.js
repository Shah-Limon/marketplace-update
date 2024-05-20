import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";

const Packages = () => {
    const [price, setPackage] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/all-service-pricing`)
            .then((res) => res.json())
            .then((info) => setPackage(info.reverse()));
    }, []);

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
    const currentService = price.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleCreateService = (event) => {
        event.preventDefault();
        const packageName = event.target.packageName.value;
        const serviceId = event.target.serviceId.value;
        const packagePrice = event.target.packagePrice.value;
        const featureOne = event.target.featureOne.value;
        const featureTwo = event.target.featureTwo.value;
        const featureThree = event.target.featureThree.value;
        const featureFour = event.target.featureFour.value;
        const featureFive = event.target.featureFive.value;
        const featureSix = event.target.featureSix.value;
        const featureSeven = event.target.featureSeven.value;
        const featureEight = event.target.featureEight.value;
        const featureNine = event.target.featureNine.value;
        const featureTen = event.target.featureTen.value;

        const add = {

            packageName,
            serviceId,
            packagePrice,
            featureOne,
            featureTwo,
            featureThree,
            featureFour,
            featureFive,
            featureSix,
            featureSeven,
            featureEight,
            featureNine,
            featureTen,
        };

        const url = `http://localhost:5000/add-service-pricing`;
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
                fetch(`http://localhost:5000/all-service-pricing`)
                    .then((res) => res.json())
                    .then((info) => setPackage(info.reverse()));
            })
            .catch((error) => {
                // Handle error
                console.error('Error creating service:', error);
            });
    };


    const handleEditPackage = (event, id) => {
        event.preventDefault();
        const packageName = event.target.packageName.value;
        const serviceId = event.target.serviceId.value;
        const packagePrice = event.target.packagePrice.value;
        const featureOne = event.target.featureOne.value;
        const featureTwo = event.target.featureTwo.value;
        const featureThree = event.target.featureThree.value;
        const featureFour = event.target.featureFour.value;
        const featureFive = event.target.featureFive.value;
        const featureSix = event.target.featureSix.value;
        const featureSeven = event.target.featureSeven.value;
        const featureEight = event.target.featureEight.value;
        const featureNine = event.target.featureNine.value;
        const featureTen = event.target.featureTen.value;

        const edit = {
            packageName,
            serviceId,
            packagePrice,
            featureOne,
            featureTwo,
            featureThree,
            featureFour,
            featureFive,
            featureSix,
            featureSeven,
            featureEight,
            featureNine,
            featureTen,
        };

        const url = `http://localhost:5000/update-service-pricing/${id}`;
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
                fetch(`http://localhost:5000/all-service-pricing`)
                    .then((res) => res.json())
                    .then((info) => setPackage(info.reverse()));
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
                                            class="mdi mdi-plus me-2"></i>Add Package</button>
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
                                                        <div className="main-title"><h3>Add package</h3></div>
                                                    </div>
                                                    <div className="columns  gap20">
                                                        <fieldset className="email">
                                                            <label className="mb-2">Package Name</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Package Name"
                                                                className="form-control"
                                                                name="packageName"
                                                            />
                                                        </fieldset>

                                                        <fieldset className="message">
                                                            <label className="mb-2">Set Service Price</label>
                                                            <select
                                                                className="form-control border"
                                                                name="serviceId"
                                                            >
                                                                <option value="">Select Service</option>
                                                                {
                                                                    service.map(e =>
                                                                        <option value={e._id}>{e.itemName}</option>
                                                                    )
                                                                }
                                                            </select>
                                                        </fieldset>

                                                        <fieldset className="message">
                                                            <label className="mb-2">Package Price</label>
                                                            <input
                                                                id="message"
                                                                name="packagePrice"
                                                                placeholder="Package Price"
                                                                className="form-control"
                                                            />
                                                        </fieldset>


                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature One</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="featureOne"
                                                                className="form-control"
                                                                name="featureOne"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Two</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="Feature Two"
                                                                className="form-control"
                                                                name="featureTwo"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Three</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="Feature Three"
                                                                className="form-control"
                                                                name="featureThree"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Four</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="Feature Four"
                                                                className="form-control"
                                                                name="featureFour"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Five</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="feature Five"
                                                                className="form-control"
                                                                name="featureFive"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Six</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="feature Six"
                                                                className="form-control"
                                                                name="featureSix"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Seven</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="feature Seven"
                                                                className="form-control"
                                                                name="featureSeven"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Eight</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="featureEight"
                                                                className="form-control"
                                                                name="featureEight"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Nine</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="feature Nine"
                                                                className="form-control"
                                                                name="featureNine"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Feature Ten</label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                placeholder="feature Ten"
                                                                className="form-control"
                                                                name="featureTen"

                                                            />
                                                        </fieldset>

                                                    </div>

                                                    <div className="text-center">
                                                        <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                            Add Package
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
                                            <h4 class="card-title">Packages List</h4>

                                            <div class="table-responsive">
                                                <table class="table table-editable table-nowrap align-middle table-edits">
                                                    <thead>
                                                        <tr>

                                                            <th>Package Name</th>
                                                            <th>Package Price</th>
                                                            <th>Service Name</th>
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
                                                                <td style={{ width: '20%' }} data-field="name">{e.packageName}</td>
                                                                <td data-field="age">${e.packagePrice} USD</td>
                                                                <td data-field="age">{service.find(serv => serv._id === e.serviceId)?.itemName || 'Service Not Found'}</td>
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
                                                                                    <form className="comment-form" onSubmit={(event) => handleEditPackage(event, e._id)}>
                                                                                        <div className="columns  gap20">
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Package Name</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="Package Name"
                                                                                                    className="form-control"
                                                                                                    name="packageName"
                                                                                                    defaultValue={e.packageName}
                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="message">
                                                                                                <label className="mb-2">Set Service Price</label>
                                                                                                <select
                                                                                                    className="form-control border"
                                                                                                    name="serviceId"


                                                                                                >
                                                                                                    <option value={service.find(serv => serv._id)}>{service.find(serv => serv._id === e.serviceId)?.itemName || 'Service Not Found'}</option>
                                                                                                    {
                                                                                                        service.map(e =>
                                                                                                            <option value={e._id}>{e.itemName}</option>
                                                                                                        )
                                                                                                    }
                                                                                                </select>
                                                                                            </fieldset>




                                                                                            <fieldset className="message">
                                                                                                <label className="mb-2">Package Price</label>
                                                                                                <input
                                                                                                    id="message"
                                                                                                    name="packagePrice"
                                                                                                    defaultValue={e.packagePrice}
                                                                                                    placeholder="Package Price"
                                                                                                    className="form-control"
                                                                                                />
                                                                                            </fieldset>


                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature One</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="featureOne"
                                                                                                    className="form-control"
                                                                                                    name="featureOne"
                                                                                                    defaultValue={e.featureOne}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Two</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="Feature Two"
                                                                                                    className="form-control"
                                                                                                    name="featureTwo"
                                                                                                    defaultValue={e.featureTwo}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Three</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="Feature Three"
                                                                                                    className="form-control"
                                                                                                    name="featureThree"
                                                                                                    defaultValue={e.featureThree}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Four</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="Feature Four"
                                                                                                    className="form-control"
                                                                                                    name="featureFour"
                                                                                                    defaultValue={e.featureFour}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Five</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="feature Five"
                                                                                                    className="form-control"
                                                                                                    name="featureFive"
                                                                                                    defaultValue={e.featureFive}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Six</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="feature Six"
                                                                                                    className="form-control"
                                                                                                    name="featureSix"
                                                                                                    defaultValue={e.featureSix}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Seven</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="feature Seven"
                                                                                                    className="form-control"
                                                                                                    name="featureSeven"
                                                                                                    defaultValue={e.featureSeven}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Eight</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="featureEight"
                                                                                                    className="form-control"
                                                                                                    name="featureEight"
                                                                                                    defaultValue={e.featureEight}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Nine</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="feature Nine"
                                                                                                    className="form-control"
                                                                                                    name="featureNine"
                                                                                                    defaultValue={e.featureNine}

                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Feature Ten</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    id="email"
                                                                                                    placeholder="feature Ten"
                                                                                                    className="form-control"
                                                                                                    name="featureTen"
                                                                                                    defaultValue={e.featureTen}

                                                                                                />
                                                                                            </fieldset>

                                                                                        </div>

                                                                                        <div className="text-center">
                                                                                            <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                                                                Edit Package
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
                                                totalPages={Math.ceil(price.length / itemsPerPage)}
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

export default Packages;
