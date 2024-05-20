import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";

const NewsLatter = () => {
    const [newsLetters, SetNewsLetters] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/news-letters`)
            .then((res) => res.json())
            .then((info) => SetNewsLetters(info.reverse()))
            .catch((error) => {
                // Handle error
                console.error('Error fetching newsletters:', error);
            });
    }, []);


    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = newsLetters.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleCreateNewsLetter = (event) => {
        event.preventDefault();
        const newsLettersName = event.target.newsLettersName.value;
        const newsLetterFor = event.target.newsLetterFor.value;
        const sendTo = event.target.sendTo.value;
        const subject = event.target.subject.value;
        const message = event.target.message.value;


        const add = {
            newsLettersName,
            newsLetterFor,
            sendTo,
            subject,
            message
        };

        const url = `http://localhost:5000/add-news-letter`;
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
                fetch(`http://localhost:5000/news-letters`)
                    .then((res) => res.json())
                    .then((info) => SetNewsLetters(info.reverse()))
                    .catch((error) => {
                        // Handle error
                        console.error('Error fetching newsletters:', error);
                    });
            })
            .catch((error) => {
                // Handle error
                console.error('Error creating service:', error);
            });
    };


    const handleEditNewsLetter = (event, id) => {
        event.preventDefault();
        const newsLettersName = event.target.newsLettersName.value;
        const newsLetterFor = event.target.newsLetterFor.value;
        const sendTo = event.target.sendTo.value;
        const subject = event.target.subject.value;
        const message = event.target.message.value;

        const edit = {
            newsLettersName,
            newsLetterFor,
            sendTo,
            subject,
            message
        };

        const url = `http://localhost:5000/news-letter/${id}`;
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
                fetch(`http://localhost:5000/news-letters`)
                    .then((res) => res.json())
                    .then((info) => SetNewsLetters(info.reverse()))
                    .catch((error) => {
                        // Handle error
                        console.error('Error fetching newsletters:', error);
                    });
            })
            .catch((error) => {

                console.error('Error creating service:', error);
            });
    };


    const handleDelete = (userId) => {
        fetch(`http://localhost:5000/news-letter/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const updatedUsers = newsLetters.filter((user) => user._id !== userId);
                SetNewsLetters(updatedUsers);
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
                                            class="mdi mdi-plus me-2"></i>Add News Letter</button>
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
                                                <form className="comment-form" onSubmit={handleCreateNewsLetter}>
                                                    <div className="fadeInUp style-2 text-center">
                                                        <div className="main-title"><h3>Add News Letters</h3></div>
                                                    </div>
                                                    <div className="columns  gap20">
                                                        <fieldset className="email">
                                                            <label className="mb-2">News Letters Name</label>
                                                            <input
                                                                type="text"
                                                                placeholder="News Letters Name"
                                                                className="form-control"
                                                                name="newsLettersName"
                                                            />
                                                        </fieldset>



                                                        <fieldset className="message">
                                                            <label className="mb-2">Select News Letter For</label>
                                                            <select class="form-control" name="newsLetterFor">
                                                                <option value="orders">Orders</option>
                                                                <option value="leads">Leads</option>
                                                            </select>
                                                        </fieldset>


                                                        <fieldset className="email">
                                                            <label className="mb-2">Sent News-Letter Email</label>
                                                            <input
                                                                type="email"
                                                                placeholder="Sent News Letter Email"
                                                                className="form-control"
                                                                name="sendTo"
                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Subject</label>
                                                            <input
                                                                type="text"
                                                                placeholder="Subject"
                                                                className="form-control"
                                                                name="subject"

                                                            />
                                                        </fieldset>

                                                        <fieldset className="email">
                                                            <label className="mb-2">Message</label>

                                                            <textarea required class="form-control" name="message" rows="5"></textarea>
                                                        </fieldset>

                                                    </div>

                                                    <div className="text-center">
                                                        <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                            Add News Letter
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

                                                            <th>News Letter Name</th>
                                                            <th>Subject</th>
                                                            <th>Email</th>
                                                            <th>News Latter For</th>
                                                            <th>Edit</th>
                                                            <th>View</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {newsLetters === null ? (
                                                            <tr>
                                                                <td colSpan="4">Loading...</td>
                                                            </tr>
                                                        ) : currentService.map((e, index) => (
                                                            <tr key={e._id}>
                                                                <td style={{ width: '20%' }} data-field="name">{e.newsLettersName}</td>
                                                                <td data-field="age">{e.subject}</td>
                                                                <td data-field="age">{e.sendTo}</td>
                                                                <td data-field="age">{e.newsLetterFor}</td>

                                                                <td>
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
                                                                                    <form className="comment-form" onSubmit={(event) => handleEditNewsLetter(event, e._id)}>
                                                                                        <div className="columns  gap20">
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">News Letters Name</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="News Letters Name"
                                                                                                    className="form-control"
                                                                                                    name="newsLettersName"
                                                                                                    defaultValue={e.newsLettersName}
                                                                                                />
                                                                                            </fieldset>
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Sent News-Letter Email</label>
                                                                                                <input
                                                                                                    type="email"
                                                                                                    placeholder="Sent News Letter Email"
                                                                                                    className="form-control"
                                                                                                    name="sendTo"
                                                                                                    defaultValue={e.sendTo}
                                                                                                />
                                                                                            </fieldset>
                                                                                            <fieldset className="message">
                                                                                                <label className="mb-2">Select News Letter For</label>
                                                                                                <select class="form-control" name="newsLetterFor">
                                                                                                    <option value="orders">Orders</option>
                                                                                                    <option value="leads">Leads</option>
                                                                                                </select>
                                                                                            </fieldset>
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Subject</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    defaultValue={e.subject}
                                                                                                    placeholder="Subject"
                                                                                                    className="form-control"
                                                                                                    name="subject"
                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Message</label>

                                                                                                <textarea required class="form-control" name="message" rows="5" defaultValue={e.newsLettersName}></textarea>
                                                                                            </fieldset>

                                                                                        </div>

                                                                                        <div className="text-center">
                                                                                            <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                                                                Edit News-Letter
                                                                                            </button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>


                                                                {/*new letter view  */}
                                                                <td>
                                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#newsLettersView${index}`}>
                                                                        <i class="fas fa-eye"></i>
                                                                    </button>
                                                                    <div className={`modal fade newsLettersView${e._id}`} id={`newsLettersView${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>View News Letter</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <form className="comment-form">
                                                                                        <div className="columns  gap20">
                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">News Letters Name</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    placeholder="News Letters Name"
                                                                                                    className="form-control"

                                                                                                    defaultValue={e.newsLettersName}
                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Sent To News-Letter</label>
                                                                                                <input
                                                                                                    type="email"
                                                                                                    placeholder="Sent News Letter Email"
                                                                                                    className="form-control"
                                                                                                    value={e.sendTo}
                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Subject</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    defaultValue={e.subject}
                                                                                                    placeholder="Subject"
                                                                                                    className="form-control"
                                                                                                    name="subject"
                                                                                                />
                                                                                            </fieldset>

                                                                                            <fieldset className="email">
                                                                                                <label className="mb-2">Message</label>

                                                                                                <textarea required class="form-control" name="message" rows="5" defaultValue={e.newsLettersName}></textarea>
                                                                                            </fieldset>

                                                                                        </div>

                                                                                        <div className="text-center">
                                                                                            <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                                                                Sent
                                                                                            </button>

                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td>

                                                                    <button class="btn btn-outline-danger btn-sm edit" title="delete" type="button" onClick={() => handleDelete(e._id)}>
                                                                        <i class=" ri-delete-bin-6-line"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                </table>
                                            </div>
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={Math.ceil(newsLetters.length / itemsPerPage)}
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

export default NewsLatter;
