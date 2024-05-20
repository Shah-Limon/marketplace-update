// import React, { useEffect, useState } from "react";
// import SidebarMenu from "../../components/Shared/SidebarMenu";
// import Pagination from "../../components/Shared/Pagination";
// import toast from "react-hot-toast";

// const Admin = () => {
//     const [allUsers, setAllUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchName, setSearchName] = useState("");
//     const [searchEmail, setSearchEmail] = useState("");
//     const [searchRole, setSearchRole] = useState("");

//     useEffect(() => {
//         fetch(`http://localhost:5000/users`)
//             .then((res) => res.json())
//             .then((info) => {
//                 setAllUsers(info.reverse());
//                 setFilteredUsers(info);
//             });
//     }, []);

//     useEffect(() => {
//         // Apply filters
//         let filtered = allUsers.filter(userData =>
//             userData.userName.toLowerCase().includes(searchName.toLowerCase()) &&
//             userData.UserEmail.toLowerCase().includes(searchEmail.toLowerCase()) &&
//             (searchRole === "" || userData.userRole === searchRole)
//         );
//         setFilteredUsers(filtered);
//     }, [searchName, searchEmail, searchRole, allUsers]);

//     //pagination 
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentService = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };
//     const handleEditCustomer = (event, id) => {
//         event.preventDefault();
//         const userName = event.target.userName.value;
//         const profileURL = event.target.profileURL.value;
//         const userRole = event.target.userRole.value;
//         const UserEmail = event.target.UserEmail.value;
//         const address = event.target.address.value;
//         const city = event.target.city.value;
//         const country = event.target.country.value;

//         const edit = {
//             userName,
//             profileURL,
//             userRole,
//             UserEmail,
//             address,
//             city,
//             country
//         };

//         const url = `http://localhost:5000/update-user/${id}`;
//         fetch(url, {
//             method: "PUT",
//             headers: {
//                 "content-type": "application/json",
//             },
//             body: JSON.stringify(edit),
//         })
//             .then((res) => res.json())
//             .then((result) => {
//                 toast.success('User Updated Successfully!');
//                 event.target.reset();
//                 const modal = document.querySelector(`.colorModal${id}`);
//                 if (modal) {
//                     modal.classList.remove('show');
//                 }
//                 const modalBackdrop = document.querySelector('.modal-backdrop');
//                 if (modalBackdrop) {
//                     modalBackdrop.parentNode.removeChild(modalBackdrop);
//                 }
//                 fetch(`http://localhost:5000/users`)
//                     .then((res) => res.json())
//                     .then((info) => setAllUsers(info.reverse()));
//             })
//             .catch((error) => {
//                 console.error('Error creating service:', error);
//             });
//     };

//     const handleDeleteUser = (userId) => {
//         fetch(`http://localhost:5000/user/${userId}`, {
//             method: "DELETE",
//         })
//             .then((res) => res.json())
//             .then(() => {
//                 const updatedUsers = allUsers.filter((user) => user._id !== userId);
//                 setAllUsers(updatedUsers);
//             });
//     };
//     return (
//         <>
//             <SidebarMenu></SidebarMenu>
//             <div className="main-content">
//                 <div className="page-content">
//                     <div className="container-fluid">
//                         <div className="row">
//                             <div className="col-12">
//                                 <div className="card">
//                                     <div className="card-body">
//                                         <h4 className="card-title">Users List</h4>
//                                         <div className="row mb-3">
//                                             <div className="col-md-4">
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     placeholder="Search by Name"
//                                                     value={searchName}
//                                                     onChange={(e) => setSearchName(e.target.value)}
//                                                 />
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <input
//                                                     type="email"
//                                                     className="form-control"
//                                                     placeholder="Search by Email"
//                                                     value={searchEmail}
//                                                     onChange={(e) => setSearchEmail(e.target.value)}
//                                                 />
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <select
//                                                     className="form-select"
//                                                     value={searchRole}
//                                                     onChange={(e) => setSearchRole(e.target.value)}
//                                                 >
//                                                     <option value="">All</option>
//                                                     <option value="Seller">Seller</option>
//                                                     <option value="Buyer">Buyer</option>
//                                                     <option value="Admin">Admin</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="table-responsive">
//                                             <table className="table table-editable table-nowrap align-middle table-edits">
//                                                 <thead>
//                                                     <tr>
//                                                         <th>Image</th>
//                                                         <th>Name</th>
//                                                         <th>Email</th>
//                                                         <th>User Role</th>
//                                                         <th>Edit</th>
//                                                         <th>Delete</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {allUsers === null ? (
//                                                         <tr>
//                                                             <td colSpan="4">Loading...</td>
//                                                         </tr>
//                                                     ) : currentService.map((e, index) => (
//                                                         <tr key={e._id}>
//                                                             <td>
//                                                                 <div className="avatar-sm">
//                                                                     <span className="avatar-title rounded bg-light">
//                                                                         <img
//                                                                             src={e?.profileURL}
//                                                                             className="avatar-sm"
//                                                                             alt={e.userName}
//                                                                             style={{ objectFit: 'cover', borderRadius: '50%' }}
//                                                                         />
//                                                                     </span>
//                                                                 </div>
//                                                             </td>
//                                                             <td data-field="name">{e.userName}</td>
//                                                             <td data-field="age">{e.UserEmail}</td>
//                                                             <td data-field="age">{e.userRole}</td>
//                                                             <td >
//                                                                 <button className="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
//                                                                     <i className="fas fa-pencil-alt"></i>
//                                                                 </button>
//                                                             </td>
//                                                             <td >
//                                                                 <button className="btn btn-outline-danger btn-sm edit" title="delete" type="button" onClick={() => handleDeleteUser(e._id)}>
//                                                                     <i className=" ri-delete-bin-6-line"></i>
//                                                                 </button>
//                                                             </td>
//                                                             <td>
//                                                                 <div className={`modal fade colorModal${e._id}`} id={`colorModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
//                                                                     <div className="modal-dialog modal-dialog-centered">
//                                                                         <div className="modal-content">
//                                                                             <div className="modal-header">
//                                                                                 <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>Edit</h5>
//                                                                                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                                                             </div>
//                                                                             <div className="modal-body">
//                                                                                 <form className="comment-form" onSubmit={(event) => handleEditCustomer(event, e._id)}>
//                                                                                     <div className="fadeInUp style-2 text-center">
//                                                                                         <div className="main-title"><h3>Edit User Info</h3></div>
//                                                                                     </div>
//                                                                                     <div className="columns  gap20">
//                                                                                         <fieldset className="email">
//                                                                                             <label className="mb-2">User Name</label>
//                                                                                             <input
//                                                                                                 type="text"
//                                                                                                 placeholder="User Name"
//                                                                                                 className="form-control"
//                                                                                                 name="userName"
//                                                                                                 defaultValue={e.userName}
//                                                                                             />
//                                                                                         </fieldset>
//                                                                                         <fieldset className="email">
//                                                                                             <label className="mb-2">User Image</label>
//                                                                                             <input
//                                                                                                 type="text"
//                                                                                                 placeholder="User Name"
//                                                                                                 className="form-control"
//                                                                                                 name="profileURL"
//                                                                                                 defaultValue={e.profileURL}
//                                                                                             />
//                                                                                         </fieldset>
//                                                                                         <div className="">
//                                                                                             <label htmlFor="inp-2">Select Role</label>
//                                                                                             <select
//                                                                                                 required
//                                                                                                 className="form-control"
//                                                                                                 name="userRole"
//                                                                                                 defaultValue={e.userRole}
//                                                                                             >
//                                                                                                 <option value="" disabled>
//                                                                                                     Select a role
//                                                                                                 </option>
//                                                                                                 <option value="Seller">
//                                                                                                     Seller
//                                                                                                 </option>
//                                                                                                 <option value="Buyer">
//                                                                                                     Buyer
//                                                                                                 </option>
//                                                                                                 <option value="Admin">
//                                                                                                     Admin
//                                                                                                 </option>
//                                                                                             </select>
//                                                                                         </div>

//                                                                                         <fieldset className="email">
//                                                                                             <label className="mb-2">User Email</label>
//                                                                                             <input
//                                                                                                 type="email"
//                                                                                                 placeholder="User Email"
//                                                                                                 className="form-control"
//                                                                                                 name="UserEmail"
//                                                                                                 defaultValue={e.UserEmail}
//                                                                                             />
//                                                                                         </fieldset>
//                                                                                         <fieldset className="email">
//                                                                                             <label className="mb-2">Address</label>
//                                                                                             <input
//                                                                                                 type="text"
//                                                                                                 placeholder="Address"
//                                                                                                 className="form-control"
//                                                                                                 name="address"
//                                                                                                 defaultValue={e.address}
//                                                                                             />
//                                                                                         </fieldset>
//                                                                                         <fieldset className="email">
//                                                                                             <label className="mb-2">City</label>
//                                                                                             <input
//                                                                                                 type="text"
//                                                                                                 placeholder="City"
//                                                                                                 className="form-control"
//                                                                                                 name="city"
//                                                                                                 defaultValue={e.city}
//                                                                                             />
//                                                                                         </fieldset>
//                                                                                         <fieldset className="email">
//                                                                                             <label className="mb-2">Country</label>
//                                                                                             <input
//                                                                                                 type="text"
//                                                                                                 placeholder="country"
//                                                                                                 className="form-control"
//                                                                                                 name="country"
//                                                                                                 defaultValue={e.country}
//                                                                                             />
//                                                                                         </fieldset>
//                                                                                     </div>
//                                                                                     <div className="text-center">
//                                                                                         <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
//                                                                                             Edit
//                                                                                         </button>
//                                                                                     </div>
//                                                                                 </form>
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                         <Pagination
//                                             currentPage={currentPage}
//                                             totalPages={Math.ceil(allUsers.length / itemsPerPage)}
//                                             onPageChange={handlePageChange}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Admin;


import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import Pagination from "../../components/Shared/Pagination";
import toast from "react-hot-toast";

const Admin = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchRole, setSearchRole] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then((res) => res.json())
            .then((info) => {
                setAllUsers(info.reverse());
                setFilteredUsers(info);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    useEffect(() => {
        // Apply filters
        let filtered = allUsers.filter(userData =>
            (userData.userName || "").toLowerCase().includes(searchName.toLowerCase()) &&
            (userData.UserEmail || "").toLowerCase().includes(searchEmail.toLowerCase()) &&
            (searchRole === "" || userData.userRole === searchRole)
        );
        setFilteredUsers(filtered);
    }, [searchName, searchEmail, searchRole, allUsers]);

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEditCustomer = (event, id) => {
        event.preventDefault();
        const userName = event.target.userName.value;
        const profileURL = event.target.profileURL.value;
        const userRole = event.target.userRole.value;
        const UserEmail = event.target.UserEmail.value;
        const address = event.target.address.value;
        const city = event.target.city.value;
        const country = event.target.country.value;

        const edit = {
            userName,
            profileURL,
            userRole,
            UserEmail,
            address,
            city,
            country
        };

        const url = `http://localhost:5000/update-user/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(edit),
        })
            .then((res) => res.json())
            .then((result) => {
                toast.success('User Updated Successfully!');
                event.target.reset();
                const modal = document.querySelector(`.colorModal${id}`);
                if (modal) {
                    modal.classList.remove('show');
                }
                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                fetch(`http://localhost:5000/users`)
                    .then((res) => res.json())
                    .then((info) => setAllUsers(info.reverse()));
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        fetch(`http://localhost:5000/user/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const updatedUsers = allUsers.filter((user) => user._id !== userId);
                setAllUsers(updatedUsers);
            });
    };

    return (
        <>
            <SidebarMenu></SidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Users List</h4>
                                        <div className="row mb-3">
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search by Name"
                                                    value={searchName}
                                                    onChange={(e) => setSearchName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Search by Email"
                                                    value={searchEmail}
                                                    onChange={(e) => setSearchEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <select
                                                    className="form-select"
                                                    value={searchRole}
                                                    onChange={(e) => setSearchRole(e.target.value)}
                                                >
                                                    <option value="">All</option>
                                                    <option value="Seller">Seller</option>
                                                    <option value="Buyer">Buyer</option>
                                                    <option value="Admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>User Role</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allUsers.length === 0 ? (
                                                        <tr>
                                                            <td colSpan="6">Loading...</td>
                                                        </tr>
                                                    ) : currentService.map((e, index) => (
                                                        <tr key={e._id}>
                                                            <td>
                                                                <div className="avatar-sm">
                                                                    <span className="avatar-title rounded bg-light">
                                                                        <img
                                                                            src={e?.profileURL || "default-image-url"}
                                                                            className="avatar-sm"
                                                                            alt={e.userName}
                                                                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td data-field="name">{e.userName || "N/A"}</td>
                                                            <td data-field="age">{e.UserEmail || "N/A"}</td>
                                                            <td data-field="age">{e.userRole || "N/A"}</td>
                                                            <td>
                                                                <button className="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-outline-danger btn-sm edit" title="Delete" type="button" onClick={() => handleDeleteUser(e._id)}>
                                                                    <i className=" ri-delete-bin-6-line"></i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <div className={`modal fade colorModal${e._id}`} id={`colorModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>Edit</h5>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form className="comment-form" onSubmit={(event) => handleEditCustomer(event, e._id)}>
                                                                                    <div className="fadeInUp style-2 text-center">
                                                                                        <div className="main-title"><h3>Edit User Info</h3></div>
                                                                                    </div>
                                                                                    <div className="columns  gap20">
                                                                                        <fieldset className="email">
                                                                                            <label className="mb-2">User Name</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                placeholder="User Name"
                                                                                                className="form-control"
                                                                                                name="userName"
                                                                                                defaultValue={e.userName}
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="email">
                                                                                            <label className="mb-2">User Image</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                placeholder="Profile URL"
                                                                                                className="form-control"
                                                                                                name="profileURL"
                                                                                                defaultValue={e.profileURL}
                                                                                            />
                                                                                        </fieldset>
                                                                                        <div className="">
                                                                                            <label htmlFor="inp-2">Select Role</label>
                                                                                            <select
                                                                                                required
                                                                                                className="form-control"
                                                                                                name="userRole"
                                                                                                defaultValue={e.userRole}
                                                                                            >
                                                                                                <option value="" disabled>
                                                                                                    Select a role
                                                                                                </option>
                                                                                                <option value="Seller">
                                                                                                    Seller
                                                                                                </option>
                                                                                                <option value="Buyer">
                                                                                                    Buyer
                                                                                                </option>
                                                                                                <option value="Admin">
                                                                                                    Admin
                                                                                                </option>
                                                                                            </select>
                                                                                        </div>

                                                                                        <fieldset className="email">
                                                                                            <label className="mb-2">User Email</label>
                                                                                            <input
                                                                                                type="email"
                                                                                                placeholder="User Email"
                                                                                                className="form-control"
                                                                                                name="UserEmail"
                                                                                                defaultValue={e.UserEmail}
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="email">
                                                                                            <label className="mb-2">Address</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                placeholder="Address"
                                                                                                className="form-control"
                                                                                                name="address"
                                                                                                defaultValue={e.address}
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="email">
                                                                                            <label className="mb-2">City</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                placeholder="City"
                                                                                                className="form-control"
                                                                                                name="city"
                                                                                                defaultValue={e.city}
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="email">
                                                                                            <label className="mb-2">Country</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                placeholder="Country"
                                                                                                className="form-control"
                                                                                                name="country"
                                                                                                defaultValue={e.country}
                                                                                            />
                                                                                        </fieldset>
                                                                                    </div>
                                                                                    <div className="text-center">
                                                                                        <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                                                            Edit
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
                                            totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
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

export default Admin;
