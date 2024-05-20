import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';
import "./Invoice.css"


const GenerateInvoice = () => {
    const { id } = useParams();
    const [logo, setLogo] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [contact, setContact] = useState({});
    const [social, setSocial] = useState({});
    const currentDomain = window.location.hostname;

    useEffect(() => {
        fetch(`http://localhost:5000/logo`)
            .then((res) => res.json())
            .then((info) => setLogo(info[0]));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/contact/`)
            .then((res) => res.json())
            .then((info) => setContact(info[0]));
    }, []);


    useEffect(() => {
        fetch(`http://localhost:5000/invoice/${id}`)
            .then((res) => res.json())
            .then((info) => setInvoice(info));
    }, [id]);
    const handleDownload = () => {
        const element = document.getElementById('download_section');
        html2pdf(element, {
            filename: `invoice_${invoice.invoiceId}.pdf`,
            margin: 1,
            image: { type: 'png', quality: 1 },
            html2canvas: { dpi: 192, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        });
    };

    const handleCopyLink = () => {
        // Copy current URL to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => {

                toast.success('URL copied to clipboard', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
            })
            .catch((error) => {
                console.error('Error copying URL to clipboard:', error);
            });
    };

    return (
        <>
            <div className="cs-container">
                <div className="cs-invoice cs-style1">
                    <div className="cs-invoice_in" id="download_section">
                        <div className="cs-invoice_head cs-type1 cs-mb25">
                            <div className="cs-invoice_left">
                                <p className="cs-invoice_number cs-primary_color cs-mb5 cs-f16">
                                    <b className="cs-primary_color">Invoice No:</b> {invoice.invoiceId}
                                </p>
                                <p className="cs-invoice_date cs-primary_color cs-m0">
                                    <b className="cs-primary_color">Date: </b>{invoice.invoiceDate}
                                </p>
                            </div>
                            <div className="cs-invoice_right cs-text_right">
                                <div className="cs-logo cs-mb5">
                                    <img src={logo.logo} alt="Logo" />
                                </div>
                            </div>
                        </div>
                        <div className="cs-invoice_head cs-mb10">
                            <div className="cs-invoice_left">
                                <b className="cs-primary_color">Invoice To:</b>
                                <p>
                                    {invoice.personName} <br />
                                    {invoice.address}<br />
                                    {invoice.personEmail}
                                </p>
                            </div>
                            <div className="cs-invoice_right cs-text_right">
                                <b className="cs-primary_color">Pay To:</b>
                                <p>
                                    {currentDomain}<br />
                                    {contact.address}<br />
                                    {contact.email}
                                </p>
                            </div>
                        </div>
                        <div className="cs-table cs-style1">
                            <div className="cs-round_border">
                                <div className="cs-table_responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                                                    Item
                                                </th>
                                                <th className="cs-width_4 cs-semi_bold cs-primary_color cs-focus_bg">
                                                    Description
                                                </th>
                                                <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg">
                                                    Invoice Status
                                                </th>
                                                <th className="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">
                                                    Price
                                                </th>
                                                <th className="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg cs-text_right">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="cs-width_3">{invoice.item}</td>
                                                <td className="cs-width_4">
                                                    {invoice.itemDescription}
                                                </td>
                                                <td className="cs-width_2">{invoice.invoiceStatus === 'unPaid' && <> Un Paid</>}
                                                    {invoice.invoiceStatus === 'paid' && <>Paid </> }
                                                    {invoice.invoiceStatus === 'Cancelled' && <>Cancelled </> }
                                                </td>
                                                <td className="cs-width_1">${invoice.price}</td>
                                                <td className="cs-width_2 cs-text_right">${invoice.price}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div className="cs-invoice_footer cs-border_top">
                                    <div className="cs-left_footer cs-mobile_hide">
                                        <p className="cs-mb0">
                                            <b className="cs-primary_color">Additional Information:</b>
                                        </p>
                                        <p className="cs-m0">
                                            {invoice.additionalInformation}
                                        </p>
                                    </div>
                                    <div className="cs-right_footer">
                                        <table>
                                            <tbody>
                                                <tr className="cs-border_left">
                                                    <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                                                        Subtoal
                                                    </td>
                                                    <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                                                        ${invoice.price}
                                                    </td>
                                                </tr>
                                                <tr className="cs-border_left">
                                                    <td className="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">
                                                        Others
                                                    </td>
                                                    <td className="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">
                                                        $0
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="cs-invoice_footer">
                                <div className="cs-left_footer cs-mobile_hide" />
                                <div className="cs-right_footer">
                                    <table>
                                        <tbody>
                                            <tr className="cs-border_none">
                                                <td className="cs-width_3 cs-border_top_0 cs-bold cs-f16 cs-primary_color">
                                                    Total Amount
                                                </td>
                                                <td className="cs-width_3 cs-border_top_0 cs-bold cs-f16 cs-primary_color cs-text_right">
                                                    ${invoice.price}
                                                </td>
                                            </tr>



                                        </tbody>

                                    </table>
                                    <div className="d-flex justify-content-end">
                                        <button className="cs-invoice_btn cs-color2">


                                            {invoice.invoiceStatus === 'unPaid' && <> <Link className='cs-invoice_btn cs-color2' to={`/invoice-payment/${invoice._id}`}>
                                                <span>Pay Now</span>

                                            </Link>
                                            </>}
                                            {invoice.invoiceStatus === 'paid' && <>Invoice has already been Paid.</>}
                                            {invoice.invoiceStatus === 'Cancelled' && <>Invoice have been Cancelled.</>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cs-note">

                            <div className="cs-note_right">
                                <p className="cs-mb0">
                                    <b className="cs-primary_color cs-bold">Note:</b>
                                </p>
                                <p className="cs-m0">
                                    {invoice.note}
                                </p>
                            </div>
                        </div>
                        {/* .cs-note */}
                    </div>
                    <div className="cs-invoice_btns cs-hide_print">
                        <a className="cs-invoice_btn cs-color1" onClick={handleCopyLink}>

                            <span>Copy Invoice Link</span>
                        </a>
                        <button id="download_btn" className="cs-invoice_btn cs-color2" onClick={handleDownload}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ionicon"
                                viewBox="0 0 512 512"
                            >
                                <title>Download</title>
                                <path
                                    d="M336 176h40a40 40 0 0140 40v208a40 40 0 01-40 40H136a40 40 0 01-40-40V216a40 40 0 0140-40h40"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={32}
                                />
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={32}
                                    d="M176 272l80 80 80-80M256 48v288"
                                />
                            </svg>
                            <span>Download</span>
                        </button>
                    </div>
                </div>
            </div>




        </>
    );
};

export default GenerateInvoice;