import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";
import { toast } from "react-toastify";

const FindLinkedinProfiles = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [newlyAddedLeads, setNewlyAddedLeads] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchPosition, setSearchPosition] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchWebsite, setSearchWebsite] = useState('');
    const [addedLeadIds, setAddedLeadIds] = useState([]);

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/Shah-Limon/em-list/master/profile-leads.json`)
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
    }, [searchName, searchEmail, searchWebsite, newlyAddedLeads]);

    const filterLeads = () => {
        const filtered = leads.filter(lead => {
            const nameMatch = lead.Industry.toLowerCase().includes(searchName.toLowerCase());
            const emailMatch = lead.company.toLowerCase().includes(searchEmail.toLowerCase());
            return nameMatch  && emailMatch;
        });
        setFilteredLeads(filtered.concat(newlyAddedLeads));
    };

    const addLead = (leadData) => {
        fetch('http://localhost:5000/add-my-leads', {
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




    return (
        <>
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
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-6">
                                                        <label>Industry</label>
                                                        <input
                                                            type="text"
                                                            className="form-control border"
                                                            placeholder="Search by Industry"
                                                            value={searchName}
                                                            onChange={(e) => setSearchName(e.target.value)}
                                                        />
                                                    </div>
                                                    
                                                    <div className="form-group col-lg-6 col-md-6 col-sm-6">
                                                        <label>Company</label>
                                                        <input
                                                            type="text"
                                                            className="form-control border"
                                                            placeholder="Search by Company"
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
                                                            <th>Website</th>
                                                            <th>Industry</th>
                                                            <th>Location</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {leads === null ? (
                                                            <tr>
                                                                <td colSpan="4">Loading...</td>
                                                            </tr>
                                                        ) : currentLeads.map((data, index) => (
                                                            <tr key={data._id}>
                                                                <td>{data.name}</td>
                                                                <td>
                                                                    <p>
                                                                        {data.website.length > 25
                                                                            ? data.website.slice(0, 25) + "..."
                                                                            : data.website}
                                                                    </p>
                                                                </td>
                                                                <td><p>
                                                                    {data.Industry.length > 25
                                                                        ? data.Industry.slice(0, 25) + "..."
                                                                        : data.Industry}
                                                                </p></td>
                                                               

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
        </>
    );
};

export default FindLinkedinProfiles;
