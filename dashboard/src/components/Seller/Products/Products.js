import React, { useEffect, useState } from "react";
import SellerSidebarMenu from "../SellerSidebarMenu";
import Pagination from "../../Shared/Pagination";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);
    useEffect(() => {
        fetch(`http://localhost:5000/products?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setProducts(info.reverse()));
    }, [user?.email]);



    const [categories, SetCategories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/categories?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => SetCategories(info.reverse()));
    }, [user]);

    // State for product description
    const [productDescription, setProductDescription] = useState("");

    // Function to fetch product description from the database
    const fetchProductDescription = (productId) => {
        fetch(`http://localhost:5000/product/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setProductDescription(data.productDescription);
            })
            .catch((error) => {
                console.error('Error fetching product description:', error);
            });
    };
    useEffect(() => {
        fetch(`http://localhost:5000/products?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => {
                setProducts(info.reverse());
                // Assuming products[0] is the first product, you can modify this based on your logic
                if (info.length > 0) {
                    fetchProductDescription(info[0]._id); // Fetch product description for the first product
                }
            });
    }, [user?.email]);



    // Quill modules and formats
    const quillModules = {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
        ],
    };

    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentService = products.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleCreate = (event) => {
        event.preventDefault();
        const sellerEmail = event.target.sellerEmail.value;
        const productName = event.target.productName.value;
        // const productDescription = event.target.productDescription.value;
        const price = event.target.price.value;
        const category = event.target.category.value;
        const featuredImage = event.target.featuredImage.value;
        const productImageOne = event.target.productImageOne.value;
        const productImageTwo = event.target.productImageTwo.value;
        const productImageThree = event.target.productImageThree.value;
        const accessLink = event.target.accessLink.value;
        const guideLine = event.target.guideLine.value;

        const add = {
            sellerEmail, productName, price, category, productDescription, featuredImage, productImageOne, productImageTwo, productImageThree, accessLink, guideLine,
        };

        const url = `http://localhost:5000/add-product`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(add),
        })
            .then((res) => res.json())
            .then((result) => {
                toast.success("Added Successfully");
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

                // Fetch the updated list of services
                fetch(`http://localhost:5000/products?sellerEmail=${user?.email}`)
                    .then((res) => res.json())
                    .then((info) => setProducts(info.reverse()));
            })
            .catch((error) => {
                // Handle error
                console.error('Error creating service:', error);
            });
    };


    const handleEditService = (event, id) => {
        event.preventDefault();
        const productName = event.target.productName.value;
        // const productDescription = event.target.productDescription.value;
        const price = event.target.price.value;
        const category = event.target.category.value;
        const featuredImage = event.target.featuredImage.value;
        const productImageOne = event.target.productImageOne.value;
        const productImageTwo = event.target.productImageTwo.value;
        const productImageThree = event.target.productImageThree.value;
        const accessLink = event.target.accessLink.value;
        const guideLine = event.target.guideLine.value;

        const edit = {
            productName, productDescription, price, category, featuredImage, productImageOne, productImageTwo, productImageThree, accessLink, guideLine,
        };

        const url = `http://localhost:5000/product/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(edit),
        })
            .then((res) => res.json())
            .then((result) => {
                toast.success("Updated Successfully");
                event.target.reset();
                const modal = document.querySelector(`.colorModal${id}`);
                if (modal) {
                    modal.classList.remove('show');
                }
                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                // Fetch the updated list of services
                fetch(`http://localhost:5000/products?sellerEmail=${user?.email}`)
                    .then((res) => res.json())
                    .then((info) => setProducts(info.reverse()));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };


    const handleDeleteProduct = (userId) => {
        fetch(`http://localhost:5000/delete-product/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                const updatedUsers = products.filter((product) => product._id !== userId);
                setProducts(updatedUsers);
            });
    };

    return (
        <>
            <SellerSidebarMenu></SellerSidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div class="col-sm-6 col-md-4 col-xl-3">
                            <div class="my-4 text-center">
                                <button type="button" class="btn btn-success waves-effect waves-light"
                                    data-bs-toggle="modal" data-bs-target=".bs-example-modal-center-addServices"><i
                                        class="mdi mdi-plus me-2"></i>Add Product</button>
                            </div>
                            <div class="modal fade bs-example-modal-center-addServices" tabindex="-1" role="dialog"
                                aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="comment-form" onSubmit={handleCreate}>
                                                <div className="fadeInUp style-2 text-center">
                                                    <div className="main-title"><h3>Add Product</h3></div>
                                                </div>
                                                <div className="columns  gap20">
                                                    <input
                                                        hidden
                                                        type="text"
                                                        value={user?.email}
                                                        name="sellerEmail"
                                                    />
                                                    <fieldset className="email">
                                                        <label className="mb-2">Product Name</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Item or Product Name"
                                                            className="form-control"
                                                            name="productName"
                                                        />
                                                    </fieldset>
                                                    <fieldset className="message">
                                                        <label className="mb-2">Price</label>
                                                        <input
                                                            required
                                                            name="price"
                                                            placeholder="Product Price"
                                                            className="form-control"
                                                        />
                                                    </fieldset>
                                                    <fieldset className="message">
                                                        <label className="mb-2">Category</label>
                                                        <select name="category" className="form-control">
                                                            <option value="">Select a category</option>
                                                            {categories.map((category) => (
                                                                <option key={category._id} value={category.categoryName}>
                                                                    {category.categoryName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </fieldset>

                                                    <fieldset className="message">
                                                        <label className="mb-2">Product Description</label>
                                                        <ReactQuill
                                                            id={`productDescription-new`}
                                                            onChange={(value) => setProductDescription(value)}
                                                            placeholder="Product Description"
                                                            className="form-control"
                                                            modules={quillModules}
                                                            name="productDescription"
                                                        />
                                                    </fieldset>

                                                    <fieldset className="message">
                                                        <label className="mb-2">Product Featured Image</label>
                                                        <input
                                                            name="featuredImage"
                                                            placeholder="Product Image link"
                                                            className="form-control"
                                                        />
                                                    </fieldset>
                                                    <fieldset className="message">
                                                        <label className="mb-2">Product Image link One</label>
                                                        <input
                                                            name="productImageOne"
                                                            placeholder="Product Image link"
                                                            className="form-control"
                                                        />
                                                    </fieldset>
                                                    <fieldset className="message">
                                                        <label className="mb-2">Product Image link Two</label>
                                                        <input
                                                            name="productImageTwo"
                                                            placeholder="Product Image link"
                                                            className="form-control"
                                                        />
                                                    </fieldset>
                                                    <fieldset className="message">
                                                        <label className="mb-2">Product Image link Three</label>
                                                        <input
                                                            name="productImageThree"
                                                            placeholder="Product Image link"
                                                            className="form-control"
                                                        />
                                                    </fieldset>
                                                    <fieldset className="message">
                                                        <label className="mb-2">Product Access Link</label>
                                                        <input
                                                            name="accessLink"
                                                            placeholder="Product Access Link"
                                                            className="form-control"
                                                        />
                                                    </fieldset>
                                                    <fieldset className="message">
                                                        <label className="mb-2">Guide Line</label>
                                                        <textarea
                                                            id="message"
                                                            name="guideLine"
                                                            rows={4}
                                                            placeholder="Guide Line"
                                                            className="form-control"
                                                            tabIndex={4}
                                                        />
                                                    </fieldset>

                                                </div>
                                                <div className="text-center">
                                                    <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                        Add Product
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
                                        <h4 class="card-title">Products List</h4>
                                        <div class="table-responsive">
                                            <table class="table table-editable table-nowrap align-middle table-edits">
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Price</th>
                                                        <th>Category</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products === null ? (
                                                        <tr>
                                                            <td colSpan="4">Loading...</td>
                                                        </tr>
                                                    ) : currentService.map((e, index) => (
                                                        <tr key={e._id}>


                                                            <td>
                                                                <a href={`http://localhost:3000/product/${e._id}`} target="_blank" rel="noreferrer" className="text-dark mb-1 font-size-15">
                                                                    {e.productName}
                                                                </a>
                                                            </td>
                                                            <td data-field="age">${e.price} USD</td>
                                                            <td data-field="age">{e.category}</td>
                                                            <td style={{ width: '10%' }}>

                                                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#colorModal${index}`}>
                                                                    <i class="fas fa-pencil-alt"></i>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button class="btn btn-outline-danger btn-sm edit" title="delete" type="button" onClick={() => handleDeleteProduct(e._id)}>
                                                                    <i class=" ri-delete-bin-6-line"></i>
                                                                </button>
                                                                <div className={`modal fade colorModal${e._id}`} id={`colorModal${index}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${index}`} aria-hidden="true">
                                                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h5 className="modal-title" id={`exampleModalLabelStatus${index}`}>Edit</h5>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                            </div>
                                                                            <div className="modal-body">
                                                                                <form className="comment-form" onSubmit={(event) => handleEditService(event, e._id)}>
                                                                                    <div className="fadeInUp style-2 text-center">
                                                                                        <div className="main-title"><h3>Edit Product</h3></div>
                                                                                    </div>
                                                                                    <div className="columns  gap20">

                                                                                        <fieldset className="email">
                                                                                            <label className="mb-2">Product Name</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                placeholder="Item or Product Name"
                                                                                                className="form-control"
                                                                                                name="productName"
                                                                                                defaultValue={e.productName}
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Price</label>
                                                                                            <input
                                                                                                name="price"
                                                                                                defaultValue={e.price}
                                                                                                placeholder="Product Price"
                                                                                                className="form-control"
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Category ({e.category})</label>
                                                                                            <select name="category" className="form-control">
                                                                                                <option value={e.category}>{e.category}</option>
                                                                                                {categories.map((category) => (
                                                                                                    <option key={category._id} value={category.categoryName}>
                                                                                                        {category.categoryName}
                                                                                                    </option>
                                                                                                ))}
                                                                                            </select>
                                                                                        </fieldset>
                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Product Description</label>
                                                                                            <ReactQuill

                                                                                                id={`productDescription${index}`}
                                                                                                defaultValue={e.productDescription}
                                                                                                onChange={(value) => setProductDescription(value)}
                                                                                                placeholder="Product Description"
                                                                                                className="form-control"
                                                                                                modules={quillModules}
                                                                                                name="productDescription" // Added name attribute for form data access
                                                                                            />
                                                                                        </fieldset>



                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Product Featured Image</label>
                                                                                            <input
                                                                                                name="featuredImage"
                                                                                                defaultValue={e.featuredImage}
                                                                                                placeholder="Product Image link"
                                                                                                className="form-control"
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Product Image link One</label>
                                                                                            <input
                                                                                                name="productImageOne"
                                                                                                defaultValue={e.productImageOne}
                                                                                                placeholder="Product Image link"
                                                                                                className="form-control"
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Product Image link Two</label>
                                                                                            <input
                                                                                                name="productImageTwo"
                                                                                                defaultValue={e.productImageTwo}
                                                                                                placeholder="Product Image link"
                                                                                                className="form-control"
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Product Image link Three</label>
                                                                                            <input
                                                                                                name="productImageThree"
                                                                                                defaultValue={e.productImageThree}
                                                                                                placeholder="Product Image link"
                                                                                                className="form-control"
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Product Access Link</label>
                                                                                            <input

                                                                                                name="accessLink"
                                                                                                defaultValue={e.accessLink}
                                                                                                placeholder="Product Access Link"
                                                                                                className="form-control"
                                                                                            />
                                                                                        </fieldset>
                                                                                        <fieldset className="message">
                                                                                            <label className="mb-2">Guide Line</label>
                                                                                            <textarea
                                                                                                id="message"
                                                                                                name="guideLine"
                                                                                                defaultValue={e.guideLine}
                                                                                                rows={4}
                                                                                                placeholder="Guide Line"
                                                                                                className="form-control"
                                                                                                tabIndex={4}
                                                                                            />
                                                                                        </fieldset>

                                                                                    </div>
                                                                                    <div className="text-center">
                                                                                        <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                                                            Edit Product
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
                                            totalPages={Math.ceil(products.length / itemsPerPage)}
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

export default Products;
