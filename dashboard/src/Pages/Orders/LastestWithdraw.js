import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import toast from "react-hot-toast";
import auth from "../../firebase.init";
import Pagination from "../../components/Shared/Pagination";

const LastestWithdraw = () => {
    const [withdraw, setWithdraw] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/all-withdraw`)
            .then((res) => res.json())
            .then((info) => setWithdraw(info.reverse()));
    }, [user?.email]);


    // Search
    const [searchInput, setSearchInput] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredWithdrawals = withdraw.filter((withdrawal) => {
        const matchesSearchInput =
            withdrawal.withdrawal_id.toLowerCase().includes(searchInput.toLowerCase()) ||
            withdrawal.withdrawalUserEmail.toLowerCase().includes(searchInput.toLowerCase());

        const matchesStatusFilter = statusFilter === "all" || withdrawal.withdrawalStatus === statusFilter;

        return matchesSearchInput && matchesStatusFilter;
    });

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        setCurrentPage(1); // Reset current page when search changes
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
        setCurrentPage(1); // Reset current page when status filter changes
    };

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = filteredWithdrawals.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleEditService = (event, id) => {
        event.preventDefault();
        const withdrawalStatus = event.target.withdrawalStatus.value;

        const edit = {
            withdrawalStatus,
        };
        const url = `http://localhost:5000/withdraw-status/${id}`;
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
                toast.success("Withdrawal Status updated Successfully");
                const modal = document.querySelector(`.colorModal${id}`);
                if (modal) {
                    modal.classList.remove('show');
                }
                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                fetch(`http://localhost:5000/all-withdraw`)
                    .then((res) => res.json())
                    .then((info) => setWithdraw(info.reverse()));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    return (
        <>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Latest Withdrawal</h4>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by Withdrawal ID or User Email"
                                        value={searchInput}
                                        onChange={handleSearchInputChange}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <select
                                        className="form-select"
                                        value={statusFilter}
                                        onChange={handleStatusFilterChange}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="processing">Processing</option>
                                    </select>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-editable table-nowrap align-middle table-edits">
                                    <thead>
                                        <tr>
                                            <th>Withdrawal ID</th>
                                            <th>Date</th>
                                            <th>User Email</th>
                                            <th>Paypal Email</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdraw === null ? (
                                            <tr>
                                                <td colSpan="4">Loading...</td>
                                            </tr>
                                        ) : currentService.map((e, index) => (
                                            <tr key={e._id}>

                                                <td data-field="name">{e.withdrawal_id}</td>
                                                <td data-field="age">{e.withdrawalDate}</td>
                                                <td data-field="age">{e.withdrawalUserEmail}</td>
                                                <td data-field="age">{e.paypalEmail}</td>
                                                <td data-field="age">${e.withdrawalAmount} USD</td>
                                                <td data-field="age">{e.withdrawalStatus}</td>
                                                <td>
                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                        <i class="fas fa-pencil-alt"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className={`modal fade colorModal${e._id}`} id={`colorModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>Update Withdrawal Status</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form className="comment-form" onSubmit={(event) => handleEditService(event, e._id)}>
                                                                        <div className="fadeInUp style-2 text-center">
                                                                        </div>
                                                                        <div className="columns  gap20">
                                                                            <fieldset className="withdrawalStatus">
                                                                                <label className="mb-2">Withdrawal Status</label>
                                                                                <select
                                                                                    name="withdrawalStatus"
                                                                                    className="form-select"
                                                                                    defaultValue={e.withdrawalStatus}
                                                                                >
                                                                                    <option value="pending">Pending</option>
                                                                                    <option value="completed">Completed</option>
                                                                                    <option value="cancelled">Cancelled</option>
                                                                                    <option value="processing">Processing</option>
                                                                                </select>
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
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(withdraw.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LastestWithdraw;
