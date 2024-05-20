import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import { ToastContainer, toast } from "react-toastify";


const CreateInvoice = ({ updateInvoiceList }) => {
    const [currentDate, setCurrentDate] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state


    useEffect(() => {
        // Function to set current date in the format YYYY-MM-DD
        const getCurrentDate = () => {
            const now = new Date();
            const year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();

            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }

            return `${year}-${month}-${day}`;
        };

        setCurrentDate(getCurrentDate());

        // Generate Invoice Id
        const uid = new ShortUniqueId();
        setInvoiceId(uid.randomUUID(10)); // Generate a random id with length 6
    }, []);

    const handleCreateInvoice = (event) => {
        event.preventDefault();
        const personName = event.target.personName.value;
        const personEmail = event.target.personEmail.value;
        const address = event.target.address.value;
        const item = event.target.item.value;
        const price = event.target.price.value;
        const itemDescription = event.target.itemDescription.value;
        const additionalInformation = event.target.additionalInformation.value;
        const invoiceDate = event.target.invoiceDate.value;
        const note = event.target.note.value;
        const invoiceStatus = event.target.invoiceStatus.value;

        const edit = {
            personName,
            personEmail,
            address,
            item,
            price,
            itemDescription,
            additionalInformation,
            note,
            invoiceDate,
            invoiceId,
            invoiceStatus
        };

        const url = `http://localhost:5000/add-invoice`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(edit),
        })
            .then((res) => res.json())
            .then((result) => {
                setIsModalOpen(false); // Close modal on success
                updateInvoiceList(result);

                toast.success('Create Invoice Successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
            });
    };



    return (
        <>

            <div className="themesflat-container">
                <div className="row justify-center">
                    <div className="col-12">
                        <div className="heading-section  fadeInUp style-2 text-center">
                            <div className="main-title">Create Invoice</div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="widget-reply  fadeInUp">
                            <form className="comment-form" onSubmit={handleCreateInvoice}>
                                <div className="fadeInUp style-2 text-center">
                                    <div className="main-title"><h3>Invoice To</h3></div>
                                </div>
                                <div className="columns  gap20">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="invoiceDate"
                                        value={currentDate}
                                        readOnly
                                        hidden
                                    />
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="invoiceStatus"
                                        value="unPaid"
                                        readOnly
                                        hidden
                                    />
                                    <fieldset className="name ">
                                        <label className="mb-2">Invoice Id</label>
                                        <input
                                            type="text"
                                            placeholder="Invoice Id"
                                            className="form-control"
                                            name="invoiceId"
                                            value={invoiceId}
                                            readOnly
                                        />
                                    </fieldset>


                                    <fieldset className="name ">
                                        <label className="mb-2">Person Name</label>
                                        <input
                                            type="text"
                                            placeholder="Person Name"
                                            className="form-control"
                                            name="personName"

                                        />
                                    </fieldset>

                                    <fieldset className="email">
                                        <label className="mb-2">Person Email</label>
                                        <input
                                            type="text"
                                            id="email"
                                            placeholder="Person Email"
                                            className="form-control"
                                            name="personEmail"

                                        />
                                    </fieldset>

                                    <fieldset className="email">
                                        <label className="mb-2">Address</label>
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            className="form-control"
                                            name="address"

                                        />
                                    </fieldset>
                                    <fieldset className="email">
                                        <label className="mb-2">Item or Service Name</label>
                                        <input
                                            type="text"
                                            placeholder="Item or Service Name."
                                            className="form-control"
                                            name="item"

                                        />
                                    </fieldset>

                                    <fieldset className="email">
                                        <label className="mb-2">Price</label>
                                        <input
                                            type="text"

                                            placeholder="Enter Price"
                                            className="form-control"
                                            name="price"

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
                                        <label className="mb-2">Additional Information</label>
                                        <textarea
                                            id="message"
                                            name="additionalInformation"
                                            rows={4}
                                            placeholder="Additional Information"
                                            className="form-control"
                                            tabIndex={4}
                                        />
                                    </fieldset>
                                    <fieldset className="message">
                                        <label className="mb-2">Note</label>
                                        <textarea
                                            id="message"
                                            name="note"
                                            rows={4}
                                            placeholder="Enter Note"
                                            className="form-control"
                                            tabIndex={4}
                                        />
                                    </fieldset>


                                </div>


                                <div className="text-center">
                                    <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                        Create
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default CreateInvoice;
