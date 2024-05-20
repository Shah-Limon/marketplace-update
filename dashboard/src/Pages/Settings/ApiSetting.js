import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";

const ApiSetting = () => {
    const [apiList, setApiList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/apis`)
            .then((res) => res.json())
            .then((info) => setApiList(info.reverse()));
    }, []);


    const handleCreateService = (event) => {
        event.preventDefault();
        const apiName = event.target.apiName.value;
        const credentials = event.target.credentials.value;
        const apiFor = event.target.apiFor.value;

        const add = {
            apiName,
            credentials,
            apiFor
        };

        const url = `http://localhost:5000/add-api`;
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
                fetch(`http://localhost:5000/apis`)
                    .then((res) => res.json())
                    .then((info) => setApiList(info.reverse()));
            })
            .catch((error) => {
                // Handle error
                console.error('Error creating service:', error);
            });
    };


    const handleEditService = (event, id) => {
        event.preventDefault();
        const credentials = event.target.credentials.value;
        const edit = {
            credentials,
        };
        const url = `http://localhost:5000/api/${id}`;
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
                fetch(`http://localhost:5000/apis`)
                    .then((res) => res.json())
                    .then((info) => setApiList(info.reverse()));
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
                            {/* <div class="col-sm-6 col-md-4 col-xl-3">
                                <div class="my-4 text-center">
                                    <button type="button" class="btn btn-success waves-effect waves-light"
                                        data-bs-toggle="modal" data-bs-target=".bs-example-modal-center-addServices"><i
                                            class="mdi mdi-plus me-2"></i>Add Api</button>
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
                                                        <div className="main-title"><h3>Add Api</h3></div>
                                                    </div>
                                                    <div className="columns  gap20">
                                                        <fieldset className="email">
                                                            <label className="mb-2">Api Name</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Api Name"
                                                                className="form-control"
                                                                name="apiName"
                                                            />
                                                        </fieldset>
                                                        <select name="apiFor">
                                                            <option value="resend">Resend</option>
                                                            <option value="openAi">openAi</option>


                                                        </select>


                                                        <fieldset className="email">
                                                            <label className="mb-2">Credentials/ KEY</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Credentials/key Info"
                                                                className="form-control"
                                                                name="credentials"
                                                            />
                                                        </fieldset>



                                                    </div>

                                                    <div className="text-center">
                                                        <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                            Add Api
                                                        </button>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                            <div class="row">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Api Lists</h4>

                                            <div class="table-responsive">
                                                <table class="table table-editable table-nowrap align-middle table-edits">
                                                    <thead>
                                                        <tr>

                                                            <th>Api Name</th>
                                                            <th>Credentials/KEY</th>
                                                            <th>Edit</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {apiList === null ? (
                                                            <tr>
                                                                <td colSpan="4">Loading...</td>
                                                            </tr>
                                                        ) : apiList.map((e, index) => (
                                                            <tr key={e._id}>

                                                                <td style={{ width: '20%' }} data-field="name">{e.apiName}</td>
                                                                <td data-field="age">{e.credentials}</td>
                                                                <td style={{ width: '10%' }}>

                                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                                        <i class="fas fa-pencil-alt"></i>
                                                                    </button>
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
                                                                                            <div className="main-title"><h3>Edit API</h3></div>
                                                                                        </div>
                                                                                        <div className="columns  gap20">

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Credentials/ KEY</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="Credentials/key Info"
                                                                                                    className="form-control"
                                                                                                    name="credentials"
                                                                                                    defaultValue={e.credentials}
                                                                                                />
                                                                                            </fieldset>
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

export default ApiSetting;
