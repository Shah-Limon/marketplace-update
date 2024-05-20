import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SidebarMenu from '../../components/Shared/SidebarMenu';
import Pagination from '../../components/Shared/Pagination';

const EmailTemplate = () => {
    const [emails, setEmails] = useState([]);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [searchSubject, setSearchSubject] = useState('');
    const [searchBody, setSearchBody] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/Shah-Limon/amazonas/master/email.json`)
            .then((res) => res.json())
            .then((info) => {
                const shuffledEmails = info.map(email => ({
                    ...email
                }));
                setEmails(shuffledEmails);
                setFilteredEmails(shuffledEmails);
            });
    }, []);

    useEffect(() => {
        filterEmails();
    }, [searchSubject, searchBody, currentPage]);

    const filterEmails = () => {
        const filtered = emails.filter(email => {
            const subjectMatch = email.subject.toLowerCase().includes(searchSubject.toLowerCase());
            const bodyMatch = email.body.toLowerCase().includes(searchBody.toLowerCase());
            return subjectMatch && bodyMatch;
        });
        setFilteredEmails(filtered);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Message copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentleads = filteredEmails.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <SidebarMenu />
            <div className="main-content">
                <div className="page-content">
                    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary" id='new-dashboard'>
                        <div className="flex-grow-1 overflow-y-lg-auto">
                            <div className="container-fluid mt-5 mb-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-body p-0">
                                                <div className="table-filter-info">
                                                    <div className="d-flex flex-wrap justify-content-between">
                                                        <div className="form-group col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control border"
                                                                placeholder="Search by Subject"
                                                                value={searchSubject}
                                                                onChange={(e) => setSearchSubject(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <input
                                                                type="text"
                                                                className="form-control border"
                                                                placeholder="Search by Type"
                                                                value={searchBody}
                                                                onChange={(e) => setSearchBody(e.target.value)}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='container'>
                                <div className='mt-50 row'>
                                    {currentleads.map((email, index) =>
                                        <div className="col-lg-4 col-md-6 col-12 mb-15" key={index}>
                                            <div className="card text-center">
                                                <div className="card-header">Email Templates</div>
                                                <div className="card-body">
                                                    <h5 className="card-title">Subject: {email.subject}</h5>
                                                    <p>
                                                        Message: {email.body}
                                                    </p>
                                                    <div className="d-flex justify-content-evenly">
                                                        <button className="btn btn-primary" onClick={() => copyToClipboard(email.body)}>
                                                            Copy message
                                                        </button>
                                                        <a href="#" type="button" className='btn btn-primary' data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                            View Full Email
                                                        </a>
                                                        <div className="modal fade" id={`colorModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>View Email Templates</h5>
                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <h5 className="card-title">Subject: {email.subject}</h5>
                                                                        <p>
                                                                            Message: {email.body}
                                                                        </p>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button className="btn btn-primary" onClick={() => copyToClipboard(email.body)}>
                                                                            Copy message
                                                                        </button>
                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="pagination-container mb-50">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(filteredEmails.length / itemsPerPage)}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default EmailTemplate;
