import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";
import { toast } from "react-toastify";

const FindLeads = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [newlyAddedLeads, setNewlyAddedLeads] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchPosition, setSearchPosition] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchWebsite, setSearchWebsite] = useState('');
    const [addedLeadIds, setAddedLeadIds] = useState([]);

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/Shah-Limon/canvaProjectImage/main/LeadData/leads-file.json`)
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

    const addLead = (leadData) => {
        fetch('http://localhost:5000/add-my-lead', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setNewlyAddedLeads(prevLeads => [...prevLeads, result]);
                setAddedLeadIds(prevIds => [...prevIds, result.insertedId]);
                toast.success('Lead Added Successfully!', {
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
                console.error('Error:', error);
                showToastMessage("Error adding lead", "error");
            });
    };


    const showToastMessage = (message, type = "success") => {
        console.log(`Toast message: ${message}, Type: ${type}`);
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

    function formatText(text) {
        const lines = [];
        for (let i = 0; i < text.length; i += 30) {
            lines.push(text.substr(i, 30));
        }
        return lines.join('\n');
    }





    return (
        <>

            <SidebarMenu></SidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Leads List</h4>
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
                                        <div class="table-responsive">
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Position</th>
                                                        <th>Industry</th>
                                                        <th>Website</th>
                                                        <th>Location</th>
                                                        <th>View</th>
                                                        <th>-</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {leads === null ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : currentLeads.map((data, index) => (
                                                        <tr key={data._id}>
                                                            <td>{data.personName}</td>
                                                            <td>
                                                                <p>
                                                                    {data.title.length > 25
                                                                        ? data.title.slice(0, 25) + "..."
                                                                        : data.title}
                                                                </p>
                                                            </td>
                                                            <td><p>
                                                                {data.industry.length > 25
                                                                    ? data.industry.slice(0, 25) + "..."
                                                                    : data.industry}
                                                            </p></td>
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
                                                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#contactModal${data._id}`}>
                                                                    <i class="fas fa-eye"></i>
                                                                </button>
                                                                <div className={`modal fade contactModal${data._id}`} id={`contactModal${data._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${data._id}`} aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id={`exampleModalLabelStatus${data._id}`}>Lead Info</h5>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <table class="table table-hover mb-0">

                                                                                    <thead>
                                                                                        <tr>

                                                                                            <th>-</th>
                                                                                            <th>-</th>

                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr>

                                                                                            <td>Website</td>
                                                                                            <td>{data.website}</td>

                                                                                        </tr>
                                                                                        <tr>

                                                                                            <td>companyEmail</td>
                                                                                            <td>{data.companyEmail}</td>

                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>companySize</td>
                                                                                            <td>{data.companySize}</td>
                                                                                        </tr>


                                                                                        <tr>
                                                                                            <td>companyAbout</td>
                                                                                            <td>
                                                                                                <p style={{ whiteSpace: 'pre-wrap' }}>
                                                                                                    {formatText(data.companyAbout)}
                                                                                                </p>
                                                                                            </td>
                                                                                        </tr>

                                                                                        {
                                                                                            data.companyFounded &&
                                                                                            <tr>
                                                                                                <td>companyFounded</td>
                                                                                                <td>{data.companyFounded ? data.companyFounded : '-'}</td>
                                                                                            </tr>
                                                                                        }

                                                                                        {
                                                                                            data.companyFacebook &&
                                                                                            <tr>

                                                                                                <td>companyFacebook</td>
                                                                                                <p style={{ whiteSpace: 'pre-wrap' }}>
                                                                                                    {formatText(data.companyFacebook)}
                                                                                                </p>

                                                                                            </tr>
                                                                                        }

                                                                                        <tr>
                                                                                            <td>companyLinkedIn</td>
                                                                                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                                                                                {formatText(data.companyLinkedIn)}
                                                                                            </p>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>industry</td>

                                                                                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                                                                                {formatText(data.industry)}
                                                                                            </p>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td>companySize</td>
                                                                                            <td>{data.companySize}</td>
                                                                                        </tr>


                                                                                    </tbody>

                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => addLead(data)} disabled={isLeadAdded(data._id)} className="btn btn-success waves-effect waves-light">{isLeadAdded(data._id) ? "Added" : "Add Lead"}</button>
                                                            </td>
                                                        </tr>
                                                    ))}
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

export default FindLeads;
