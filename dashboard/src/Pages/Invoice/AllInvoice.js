import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import { ToastContainer, toast } from "react-toastify";
import CreateInvoice from "./CreateInvoice";
import Pagination from "../../components/Shared/Pagination";

const AllInvoice = () => {
    const [services, setServices] = useState([]);
    const [filteredInvoice, setFilteredInvoice] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [invoiceStatus, setInvoiceStatus] = useState('');
    const [emailSentStatus, setEmailSentStatus] = useState({});


    useEffect(() => {
        fetch(`http://localhost:5000/invoices`)
            .then((res) => res.json())
            .then((info) => {
                setServices(info.reverse());
                setFilteredInvoice(info);
            });
    }, []);


    useEffect(() => {
        filterLeads();
    }, [searchName, searchEmail, invoiceStatus]);

    const filterLeads = () => {
        const filtered = services.filter(e => {
            const nameMatch = e.personName.toLowerCase().includes(searchName.toLowerCase());
            const emailMatch = e.personEmail.toLowerCase().includes(searchEmail.toLowerCase());
            const statusMatch = invoiceStatus ? e.invoiceStatus === invoiceStatus : true;
            return nameMatch && emailMatch && statusMatch;
        });
        setFilteredInvoice(filtered);
    };

    const handleStatus = async (event, id, index) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const status = formData.get('invoiceStatus');

        try {
            const response = await fetch(`http://localhost:5000/invoice/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ invoiceStatus: status })
            });

            if (response.ok) {
                toast.success('Status updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });

                // Fetch updated data after successful update
                const updatedDataResponse = await fetch(`http://localhost:5000/invoices`);
                const updatedData = await updatedDataResponse.json();
                setServices(updatedData.reverse());
                setFilteredInvoice(updatedData.reverse());
            } else {
                // Handle error
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };


    const sendEmail = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/sendEmail/${id}`, {
                method: 'POST',
            });
            if (response.ok) {
                setEmailSentStatus({ [id]: 'success' });
                toast.success('Email sent successfully!', {
                    // Toast notification options
                });
            } else {
                setEmailSentStatus({ [id]: 'failed' });
                // Handle error
                console.error('Failed to send email');
            }
        } catch (error) {
            setEmailSentStatus({ [id]: 'failed' });
            console.error('Network error:', error);
        }
    };

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvoice = filteredInvoice.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const updateInvoiceList = (newInvoice) => {
        // Update the state to add the new invoice to the list
        setServices([newInvoice, ...services]);
        setFilteredInvoice([newInvoice, ...filteredInvoice]); // Update filteredInvoice state as well
    };



    return (
        <>
            <SidebarMenu></SidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">

                        <div class="col-sm-6 col-md-4 col-xl-3">
                            <div class="my-4 text-center">
                                <button type="button" class="btn btn-success waves-effect waves-light"
                                    data-bs-toggle="modal" data-bs-target=".bs-example-modal-center"><i
                                        class="mdi mdi-plus me-2"></i>Create Invoice</button>
                            </div>

                            <div class="modal fade bs-example-modal-center" tabindex="-1" role="dialog"
                                aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <CreateInvoice updateInvoiceList={updateInvoiceList} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title mb-3">Invoice Lists</h4>
                                        <div className="d-flex flex-wrap justify-content-between mb-5">
                                            <div className="form-group col-3">
                                                <input
                                                    type="text"
                                                    className="form-control border"
                                                    placeholder="Search by Name"
                                                    value={searchName}
                                                    onChange={(e) => setSearchName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                <input
                                                    type="text"
                                                    className="form-control border"
                                                    placeholder="Search by Email"
                                                    value={searchEmail}
                                                    onChange={(e) => setSearchEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                <select
                                                    className="form-control border invoiceStatus"
                                                    value={invoiceStatus}
                                                    onChange={(e) => setInvoiceStatus(e.target.value)}
                                                >
                                                    <option value="">Filter by Status</option>
                                                    <option value="unPaid">Un Paid</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div class="table-responsive">
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Invoice Name</th>
                                                        <th>Invoice Email</th>
                                                        <th>Sent Email</th>
                                                        <th>Invoice Status</th>
                                                        <th>Invoice Link</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        currentInvoice.map((data, index) =>
                                                            <tr data-id="1">

                                                                <td>{data.invoiceDate}</td>
                                                                <td>{data.personName}</td>
                                                                <td>{data.personEmail}</td>
                                                                <td>
                                                                    {data.emailSent === 'yes' ? 'Email sent successfully' : (
                                                                        <>
                                                                            {emailSentStatus[data._id] === 'success' ? 'Email sent successfully' : (
                                                                                <button className="btn btn-success waves-effect waves-light" onClick={() => sendEmail(data._id)}>Send Email</button>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </td>

                                                                <td>{data.invoiceStatus === 'unPaid' && <> Un Paid</>}
                                                                    {data.invoiceStatus === 'paid' && <>Paid</>}
                                                                    {data.invoiceStatus === 'Cancelled' && <>Cancelled</>}

                                                                </td>
                                                                <td>
                                                                    <Link to={`/invoice/${data._id}`} className="tf-button tf-color-green bg-gradient">
                                                                        <span>View</span>
                                                                    </Link>
                                                                </td>
                                                                <td style={{ width: '100px' }}>

                                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                                        <i class="fas fa-pencil-alt"></i>
                                                                    </button>
                                                                </td>
                                                                <td>

                                                                    <div className="modal fade" id={`colorModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
                                                                        <div className="modal-dialog modal-dialog-centered">
                                                                            <div className="modal-content">
                                                                                <div className="modal-header">
                                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>Set Status</h5>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <form onSubmit={(event) => handleStatus(event, data._id, index)}>
                                                                                        <label htmlFor="color">Select Option:</label>
                                                                                        <br></br>
                                                                                        <select className="form-select" id="color" name="invoiceStatus">
                                                                                            <option value="unPaid">Un Paid</option>
                                                                                            <option value="paid">Paid</option>
                                                                                        </select>
                                                                                        <div className="modal-footer">
                                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                            <button type="submit" className="btn btn-primary">Save changes</button>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }

                                                </tbody>

                                            </table>
                                        </div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={Math.ceil(filteredInvoice.length / itemsPerPage)}
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

export default AllInvoice;
