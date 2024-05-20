import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";
import { toast } from "react-toastify";

const MyLeads = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [newlyAddedLeads, setNewlyAddedLeads] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchPosition, setSearchPosition] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchWebsite, setSearchWebsite] = useState('');
    const [addedLeadIds, setAddedLeadIds] = useState([]);
    const [leadsNote, setLeadsNote] = useState([]);
    const [leadsColor, setLeadsColor] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5000/my-all-leads`)
            .then((res) => res.json())
            .then((info) => {
                const shuffledLeads = [...info];
                for (let i = shuffledLeads.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffledLeads[i], shuffledLeads[j]] = [shuffledLeads[j], shuffledLeads[i]];
                }
                setLeads(shuffledLeads);
                setFilteredLeads(shuffledLeads);
            });
    }, []);

    const [fromEmail, setFromEmail] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/emails`)
            .then((res) => res.json())
            .then((info) => setFromEmail(info[0]));
    }, []);

    // Define function to handle sending email
    // const handleSendEmail = (data) => {
    //     // Get data for the email (to, subject, message) from 'data' parameter
    //     const { to, subject, message } = data;

    //     // Send email
    //     fetch(`http://localhost:5000/mail-sent/${data._id}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             from: fromEmail.email,
    //             to: to,
    //             subject: subject,
    //             message: message,
    //         }),
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 toast.success("Email sent successfully!");
    //             } else {
    //                 toast.error("Failed to send email");
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error sending email:', error);
    //             toast.error("An error occurred while sending the email");
    //         });
    // };
    // Define function to handle sending email
    const handleSendEmail = (data) => {
        // Get data for the email (to, subject, message) from 'data' parameter
        const { id, to, subject, message } = data; // Extract lead's ID (_id) from data

        // Send email
        fetch(`http://localhost:5000/mail-sent/${id}`, { // Pass _id as part of the URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: to,
                subject: subject,
                message: message,
            }),
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Email sent successfully!");
                } else {
                    toast.error("Failed to send email");
                }
            })
            .catch(error => {
                console.error('Error sending email:', error);
                toast.error("An error occurred while sending the email");
            });
    };


    useEffect(() => {
        filterLeads();
    }, [searchName, searchPosition, searchEmail, searchWebsite, newlyAddedLeads]);

    const filterLeads = () => {
        const filtered = leads.filter(lead => {
            const nameMatch = lead.industry.toLowerCase().includes(searchName.toLowerCase());
            const positionMatch = lead.title.toLowerCase().includes(searchPosition.toLowerCase());
            const emailMatch = lead.location.toLowerCase().includes(searchEmail.toLowerCase());
            return nameMatch && positionMatch && emailMatch;
        });
        setFilteredLeads(filtered.concat(newlyAddedLeads));
    };

    const isLeadAdded = (leadId) => {
        return addedLeadIds.includes(leadId);
    };

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddNote = (event, leadId) => {
        event.preventDefault();
        const note = event.target.Note.value;

        const url = `http://localhost:5000/lead-note/${leadId}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ Note: note }),
        })
            .then((res) => res.json())
            .then((updatedLead) => {
                setLeads((prevLeads) =>
                    prevLeads.map((lead) =>
                        lead._id === leadId ? { ...lead, Note: note } : lead
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating note:", error);
            });
    };




    useEffect(() => {
        fetch(`http://localhost:5000/my-all-leads-note`)
            .then((res) => res.json())
            .then((info) => {
                setLeadsNote(info.reverse());
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/my-all-leads-color`)
            .then((res) => res.json())
            .then((info) => {
                setLeadsColor(info.reverse());
            });
    }, []);

    const handleDelete = (leadId) => {
        fetch(`http://localhost:5000/delete-my-leads/${leadId}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                toast.success("Lead deleted successfully!");
                // Update leads state to remove the deleted lead
                setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== leadId));
            } else {
                toast.error("Failed to delete lead");
            }
        })
        .catch((error) => {
            console.error('Error deleting lead:', error);
            toast.error("An error occurred while deleting the lead");
        });
    };
    




    return (
        <>
            <SidebarMenu />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <h4 className="card-title">My Leads {leads.length}</h4>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">My Leads {leads.length}</h4>
                                        <div className="table-filter-info">
                                            <div className="d-flex flex-wrap justify-content-between">
                                                <div className="form-group col-lg-4 col-md-4 col-sm-6">
                                                    <label>Industry</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border"
                                                        placeholder="Search by Industry"
                                                        value={searchName}
                                                        onChange={(e) => setSearchName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group col-lg-4 col-md-4 col-sm-6">
                                                    <label>Position</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border"
                                                        placeholder="Search by Position"
                                                        value={searchPosition}
                                                        onChange={(e) => setSearchPosition(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group col-lg-4 col-md-4 col-sm-6">
                                                    <label>Location</label>
                                                    <input
                                                        type="text"
                                                        className="form-control border"
                                                        placeholder="Search by location"
                                                        value={searchEmail}
                                                        onChange={(e) => setSearchEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Position</th>
                                                        <th>Industry</th>
                                                        <th>Website</th>
                                                        <th>Location</th>
                                                        <th>Send Mail</th>
                                                        <th>Note</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {leads === null ? (
                                                        <tr>
                                                            <td colSpan="6">Loading...</td>
                                                        </tr>
                                                    ) : currentLeads.map((data, index) => {
                                                        const leadColor = leadsColor.find(e => e._id === data._id)?.leadColor || 'd';
                                                        return (
                                                            <tr key={data._id} id={`tr${index}`} style={{ backgroundColor: leadColor }}>
                                                                <td>{data.personName}</td>
                                                                <td>
                                                                    <p>
                                                                        {data.title.length > 25
                                                                            ? data.title.slice(0, 25) + "..."
                                                                            : data.title}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <p>
                                                                        {data.industry.length > 25
                                                                            ? data.industry.slice(0, 25) + "..."
                                                                            : data.industry}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <p>
                                                                        {data.website.length > 25
                                                                            ? data.website.slice(0, 25) + "..."
                                                                            : data.website}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <p>
                                                                        {data.location.length > 25
                                                                            ? data.location.slice(0, 25) + "..."
                                                                            : data.location}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <h6 className="mb-1 font-size-13">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-primary waves-light waves-effect"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target={`#composemodal${index}`} // Changed data-bs-dismiss to data-bs-target
                                                                        >
                                                                            <i className="ri-mail-add-line"></i>
                                                                        </button>
                                                                        <div
                                                                            className="modal fade"
                                                                            id={`composemodal${index}`}
                                                                            tabIndex={-1}
                                                                            role="dialog"
                                                                            aria-labelledby="composemodalTitle"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h5 className="modal-title" id="composemodalTitle">
                                                                                            Sent Message
                                                                                        </h5>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn-close"
                                                                                            data-bs-dismiss="modal"
                                                                                            aria-label="Close"
                                                                                        />
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <div>
                                                                                            <div className="mb-3">
                                                                                                <label>From</label>
                                                                                                <input type="email" className="form-control" placeholder="To" defaultValue={fromEmail.email} />
                                                                                            </div>
                                                                                            <div className="mb-3">
                                                                                                <label>To</label>
                                                                                                <input type="email" className="form-control" placeholder="To" defaultValue={data.personEmail} />
                                                                                            </div>
                                                                                            <div className="mb-3">
                                                                                                <label>Subject</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    placeholder="Subject"
                                                                                                    name="Subject"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="mb-3">
                                                                                                <label>Message</label>
                                                                                                <textarea
                                                                                                    id="textarea"
                                                                                                    className="form-control"
                                                                                                    rows={3}
                                                                                                    placeholder="Type message for customer"
                                                                                                    name="Message"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-secondary"
                                                                                            data-bs-dismiss="modal"
                                                                                        >
                                                                                            Close
                                                                                        </button>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-primary"
                                                                                            onClick={() => handleSendEmail({ id: data._id, to: data.personEmail, subject: 'Subject', message: 'Message' })}
                                                                                        >
                                                                                            Send <i className="fab fa-telegram-plane ms-1" />
                                                                                        </button>

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </h6>
                                                                </td>
                                                                <td>
                                                                    {leadsNote?.some(note => note._id === data._id) ? (
                                                                        leadsNote.map(note => note._id === data._id && (
                                                                            <form
                                                                                key={note._id}
                                                                                id={`contactformNote-${data._id}`}
                                                                                onSubmit={(event) => handleAddNote(event, data._id)}
                                                                            >
                                                                                <fieldset>
                                                                                    <input
                                                                                        className="note"
                                                                                        required
                                                                                        name="Note"
                                                                                        placeholder="Note"
                                                                                        defaultValue={note.Note}
                                                                                    />

                                                                                    <button
                                                                                        className="btn btn-sm btn-primary"
                                                                                        type="submit"
                                                                                    >
                                                                                        +
                                                                                    </button>
                                                                                    <div id="result" />
                                                                                </fieldset>
                                                                            </form>
                                                                        ))
                                                                    ) : (
                                                                        <form
                                                                            key={`new-note-form-${data._id}`}
                                                                            id={`contactformNote-${data._id}`}
                                                                            onSubmit={(event) => handleAddNote(event, data._id)}
                                                                        >
                                                                            <fieldset>
                                                                                <input
                                                                                    className="note"
                                                                                    required
                                                                                    name="Note"
                                                                                    placeholder="Note"
                                                                                    defaultValue=""
                                                                                />

                                                                                <button
                                                                                    className="btn btn-sm btn-primary"
                                                                                    type="submit"
                                                                                >
                                                                                    +
                                                                                </button>

                                                                            </fieldset>
                                                                        </form>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <button class="btn btn-outline-danger btn-sm edit" title="delete" type="button" onClick={() => handleDelete(data._id)}>
                                                                        <i class=" ri-delete-bin-6-line"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={Math.ceil(filteredLeads.length / itemsPerPage)}
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
    );
};

export default MyLeads;
