import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";


const UpdateBuyerProfile = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [user] = useAuthState(auth)

    useEffect(() => {
        fetch(`http://localhost:5000/users?userEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => {
                setAllUsers(info.reverse());
                setFilteredUsers(info);
            });
    }, [user]);

    const handleEditCustomer = (event, id, index) => {
        event.preventDefault();
        const userName = event.target.userName.value;
        const profileURL = event.target.profileURL.value;
        const address = event.target.address.value;
        const city = event.target.city.value;
        const country = event.target.country.value;

        const edit = {
            userName,
            profileURL,
            address,
            city,
            country
        };

        const url = `http://localhost:5000/update-user-profile/${id}`;
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
                const modal = document.querySelector(`#exampleModal${index}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                // Fetch the updated data after successful edit
                fetch(`http://localhost:5000/users?userEmail=${user?.email}`)
                    .then((res) => res.json())
                    .then((info) => {
                        setAllUsers(info);
                        setFilteredUsers(info); 
                    });
            })

    };

    return (
        <>
            <div className="blog-page-area pd-top-100 pd-bottom-100">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">User</h4>
                                        <div className="table-responsive">
                                            <table className="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Image</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>User Role</th>
                                                        <th>Update</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allUsers === null ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : filteredUsers.map((e, index) => (
                                                        <tr key={e._id}>
                                                            <td>
                                                                <div className="avatar-sm">
                                                                    <span className="avatar-title rounded bg-light">
                                                                        <img
                                                                            src={e?.profileURL}
                                                                            className="avatar-sm"
                                                                            alt={e.userName}
                                                                            style={{ objectFit: 'cover', borderRadius: '50%', width: '75px' }}
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td data-field="name">{e.userName}</td>
                                                            <td data-field="age">{e.UserEmail}</td>
                                                            <td data-field="age">{e.userRole}</td>
                                                            <td >
                                                                <div className="isotope-filters item-isotope-btn">
                                                                    <button type="button" className="button active" data-toggle="modal" data-target={`#exampleModal${index}`}>
                                                                        Update
                                                                    </button>
                                                                </div>
                                                                <div class="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                    <div class="modal-dialog modal-lg">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <h5 class="modal-title" id="exampleModalLabel">View Infomation</h5>
                                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form className="comment-form" onSubmit={(event) => handleEditCustomer(event, e._id, index)}>
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
                                                                                                placeholder="User Image"
                                                                                                className="form-control"
                                                                                                name="profileURL"
                                                                                                defaultValue={e.profileURL}
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
                                                                                                placeholder="country"
                                                                                                className="form-control"
                                                                                                name="country"
                                                                                                defaultValue={e.country}
                                                                                            />
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

export default UpdateBuyerProfile;
