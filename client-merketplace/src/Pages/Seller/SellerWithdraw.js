import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";
import Pagination from "../../components/Shared/Pagination";

const SellerWithdraw = () => {
    const [withdraw, setWithdraw] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/all-withdraw?withdrawalUserEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setWithdraw(info.reverse()));
    }, [user?.email]);

    const generateUniqueOrderId = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let withdrawal_id = "";
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            withdrawal_id += characters.charAt(randomIndex);
        }
        return withdrawal_id;
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = withdraw.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCreate = (event) => {
        event.preventDefault();
        const withdrawalAmount = parseFloat(event.target.withdrawalAmount.value);
        if (withdrawalAmount < 50) {
            toast.error("Minimum withdrawal amount is $50");
            return;
        }
        // Check if there's an existing pending withdrawal
        const hasPendingWithdrawal = withdraw.some(
            (item) => item.withdrawalStatus === "pending"
        );
        if (hasPendingWithdrawal) {
            toast.error("You already have a pending withdrawal request.");
            return;
        }
        const withdrawal_id = generateUniqueOrderId();
        const withdrawalDate = event.target.withdrawalDate.value;
        const withdrawalStatus = "pending";
        const withdrawalUserEmail = event.target.withdrawalUserEmail.value;
        const paypalEmail = event.target.paypalEmail.value;

        const add = {
            withdrawal_id,
            withdrawalDate,
            withdrawalStatus,
            withdrawalUserEmail,
            withdrawalAmount,
            paypalEmail,
        };

        const url = `http://localhost:5000/add-withdraw`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(add),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then((errorMessage) => {
                        throw new Error(errorMessage);
                    });
                }
                return res.json();
            })
            .then((result) => {
                event.target.reset();
                const modal = document.querySelector(".modal");
                if (modal) {
                    modal.classList.remove("show");
                }
                const modalBackdrop = document.querySelector(".modal-backdrop");
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                fetch(`http://localhost:5000/all-withdraw?sellerEmail=${user?.email}`)
                    .then((res) => res.json())
                    .then((info) => setWithdraw(info.reverse()));
            })
            .catch((error) => {
                console.error("Error creating withdrawal:", error);
                toast.error(error.message); // Display the error message to the user
            });
    };


    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    const [currentDate] = useState(formatDate(new Date()));
    return (
        <>

            <div className="main-content m-5">
                <div className="page-content">
                    <div className="container-fluid">
                        <div class="col-sm-6 col-md-4 col-xl-3">
                            <button type="button" class="btn btn-primary m-2" data-toggle="modal" data-target="#exampleModal">
                                <i class="mdi mdi-plus me-2"></i>Withdraw Request
                            </button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="comment-form" onSubmit={handleCreate}>
                                                <div className="fadeInUp style-2 text-center">
                                                    <div className="main-title"><h3>Withdraw Request</h3></div>
                                                </div>
                                                <div className="columns gap20">
                                                    <input
                                                        hidden
                                                        type="text"
                                                        name="withdrawalDate"
                                                        value={currentDate}
                                                    />
                                                    <input
                                                        hidden
                                                        type="text"
                                                        value="pending"
                                                        name="withdrawalStatus"
                                                    />
                                                    <input
                                                        hidden
                                                        type="text"
                                                        value={user?.email}
                                                        name="withdrawalUserEmail"
                                                    />
                                                    <fieldset className="email">
                                                        <label className="mb-2">withdrawal Amount</label>
                                                        <input
                                                            type="number"
                                                            required
                                                            placeholder="Withdrawal Amount"
                                                            className="form-control"
                                                            name="withdrawalAmount"
                                                        />
                                                    </fieldset>
                                                    <fieldset className="message">
                                                        <label className="mb-2">Paypal Email</label>
                                                        <input
                                                            required
                                                            name="paypalEmail"
                                                            placeholder="Enter Paypal Email"
                                                            className="form-control"
                                                        />
                                                    </fieldset>
                                                </div>
                                                <div className="text-center">
                                                    <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                        Sumbit Withdraw
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
                                        <h4 class="card-title">Withdraw Lists</h4>
                                        <div class="table-responsive">
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Withdrawal ID</th>
                                                        <th>Date</th>
                                                        <th>Withdraw Amount</th>
                                                        <th>Paypal Email</th>
                                                        <th>Withdrawal Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {withdraw === null ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : currentService.map((e, index) => e.withdrawalUserEmail === user?.email && (
                                                        <tr key={e._id}>
                                                            <td data-field="id">{e.withdrawal_id}</td>
                                                            <td data-field="date">{e.withdrawalDate}</td>
                                                            <td data-field="amount">${e.withdrawalAmount} USD</td>
                                                            <td data-field="email">{e.paypalEmail}</td>
                                                            <td data-field="status">{e.withdrawalStatus}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {withdraw.length > itemsPerPage && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(withdraw.length / itemsPerPage)}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerWithdraw;
