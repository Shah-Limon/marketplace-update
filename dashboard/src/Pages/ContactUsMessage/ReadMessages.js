
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Shared/Pagination";
import { useParams } from "react-router-dom";

const ReadMessages = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/contact-messages?status=Read`)
            .then((res) => res.json())
            .then((info) => setMessages(info.reverse()));
    }, []);

    // Calculate the index of the last item to display
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate the index of the first item to display
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get the current items to display
    const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleMarkAsRead = (id) => {
        const url = `http://localhost:5000/contact-message/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ messageStatus: "UnRead" }),
        })
            .then((res) => res.json())
            .then((result) => {
                fetch(`http://localhost:5000/contact-messages?status=Read`)
                    .then((res) => res.json())
                    .then((info) => {
                        setMessages(info.reverse());
                        setShowModal(false);
                    });
            });
    };

    const openModal = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedMessage(null);
        setShowModal(false);
    };


    useEffect(() => {
        // If selectedMessage is not null and it exists in the updated messages list,
        // update selectedMessage with the updated message data
        if (selectedMessage) {
            const updatedSelectedMessage = messages.find(message => message._id === selectedMessage._id);
            if (updatedSelectedMessage) {
                setSelectedMessage(updatedSelectedMessage);
            } else {
                // If the selectedMessage is not found in the updated messages list,
                // close the modal
                setShowModal(false);
            }
        }
    }, [messages]);


    let rowNumber = 1;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Read Messages List</h4>
                            <div className="table-responsive">
                                <table className="table table-editable table-nowrap align-middle table-edits">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Sender Name</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentMessages.map((message, index) => (
                                            <tr key={message._id}>
                                              <td>{message.date}</td>
                                                <td>{message.name}</td>
                                                <td>{message.email}</td>
                                                <td>{message.subject}</td>
                                                <td style={{ width: '100px' }}>
                                                    <button type="button" className="btn btn-danger btn-block waves-effect waves-light" onClick={() => openModal(message)}>
                                                        <i className="dripicons-preview"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(messages.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {selectedMessage && (
                <div key={selectedMessage._id} className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Read Message</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="email" className="form-control" defaultValue={selectedMessage.name} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" defaultValue={selectedMessage.email} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label>Subject</label>
                                    <input type="text" className="form-control" placeholder="Subject" defaultValue={selectedMessage.subject} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label>Message</label>
                                    <textarea id="textarea" className="form-control" maxLength="225" rows="3" value={selectedMessage.message} readOnly></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => handleMarkAsRead(selectedMessage._id)}>Mark Unread <i className="fab fa-telegram-plane ms-1"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ReadMessages;


