import React, { useEffect, useState } from "react";
import SellerSidebarMenu from "../SellerSidebarMenu";
import Pagination from "../../Shared/Pagination";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SidebarMenu from "../../Shared/SidebarMenu";
import slugify from "slugify"; // Import slugify library
import toast from "react-hot-toast";


const Category = () => {
    const [user] = useAuthState(auth);
    const [categories, SetCategories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/categories?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => SetCategories(info.reverse()));
    }, [user?.email]);

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = categories.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Function to generate unique slug
    const generateSlug = (name) => {
        const baseSlug = slugify(name, { lower: true });
        return `${baseSlug}`;
    };


    const handleCreateCustomer = (event) => {
        event.preventDefault();
        const categoryName = event.target.categoryName.value;
        const sellerEmail = event.target.sellerEmail.value;
        const slug = generateSlug(categoryName);

        // Check if the slug already exists
        const existingCategory = categories.find(category => category.slug === slug);
        if (existingCategory) {
            // Display error message indicating that category already exists
            // You can use a toast library like react-toastify to display toast messages
            toast.error("Category already exists");
            return; // Exit the function
        }

        const add = {
            categoryName,
            sellerEmail,
            slug,
        };

        const url = `http://localhost:5000/add-category`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(add),
        })
            .then((res) => res.json())
            .then((result) => {
                event.target.reset();

                // Close the modal
                const modal = document.querySelector('.modal');
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                fetch(`http://localhost:5000/categories?sellerEmail=${user?.email}`)
                    .then((res) => res.json())
                    .then((info) => SetCategories(info.reverse()));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };


    const handleEditCustomer = (event, id) => {
        event.preventDefault();
        const categoryName = event.target.categoryName.value;
        const edit = {
            categoryName,
        };

        const url = `http://localhost:5000/seller-category/${id}`;
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
                const modal = document.querySelector(`.colorModal${id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                fetch(`http://localhost:5000/categories?sellerEmail=${user?.email}`)
                    .then((res) => res.json())
                    .then((info) => SetCategories(info.reverse()));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };
    const handleDeleteUser = (userId) => {
        fetch(`http://localhost:5000/seller-category/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const updatedUsers = categories.filter((user) => user._id !== userId);
                SetCategories(updatedUsers);
            });
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
                                    data-bs-toggle="modal" data-bs-target=".bs-example-modal-center-addServices"><i
                                        class="mdi mdi-plus me-2"></i>Add Category</button>
                            </div>
                            <div class="modal fade bs-example-modal-center-addServices" tabindex="-1" role="dialog"
                                aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="comment-form" onSubmit={handleCreateCustomer}>
                                                <div className="fadeInUp style-2 text-center">
                                                    <div className="main-title"><h3>Add Category</h3></div>
                                                </div>
                                                <div className="columns  gap20">
                                                    <input
                                                        hidden
                                                        type="text"
                                                        value={user?.email}
                                                        name="sellerEmail"
                                                    />
                                                    <fieldset className="email">
                                                        <label className="mb-2">Category Name</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Category Name"
                                                            className="form-control"
                                                            name="categoryName"
                                                        />
                                                    </fieldset>

                                                </div>
                                                <div className="text-center">
                                                    <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                        Add
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
                                        <h4 class="card-title">Categories List</h4>
                                        <div class="table-responsive">
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Category Name</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories === null ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : currentService.map((e, index) => (
                                                        <tr key={e._id}>
                                                            <td data-field="name">{e.categoryName}</td>

                                                            <td>

                                                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                                    <i class="fas fa-pencil-alt"></i>
                                                                </button>
                                                            </td>
                                                            <td>

                                                                <button class="btn btn-outline-danger btn-sm edit" title="delete" type="button" onClick={() => handleDeleteUser(e._id)}>
                                                                    <i class=" ri-delete-bin-6-line"></i>
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
                                                                                        <div className="main-title"><h3>Edit Category Info</h3></div>
                                                                                    </div>
                                                                                    <div className="columns  gap20">
                                                                                        <fieldset className="email">
                                                                                            <label className="mb-2">Category Name</label>
                                                                                            <input
                                                                                                required
                                                                                                type="text"
                                                                                                placeholder="Category Name"
                                                                                                className="form-control"
                                                                                                name="categoryName"
                                                                                                defaultValue={e.categoryName}
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
                                            totalPages={Math.ceil(categories.length / itemsPerPage)}
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

export default Category;
