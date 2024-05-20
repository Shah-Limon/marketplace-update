import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import auth from "../../firebase.init";
import Pagination from "../../components/Shared/Pagination";
import { Link } from "react-router-dom";

const SellerProducts = () => {
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);
    useEffect(() => {
        fetch(`http://localhost:5000/products?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setProducts(info.reverse()));
    }, [user?.email]);

    const [categories, SetCategories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/categories`)
            .then((res) => res.json())
            .then((info) => SetCategories(info.reverse()));
    }, [user]);

    const [productDescription, setProductDescription] = useState("");

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
                if (info.length > 0) {
                    fetchProductDescription(info[0]._id);
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

    const handleEditService = (event, id) => {
        event.preventDefault();
        const productName = event.target.productName.value;
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
                // Fetch the updated list of services
                fetch(`http://localhost:5000/products?sellerEmail=${user?.email}`)
                    .then((res) => res.json())
                    .then((info) => setProducts(info.reverse()));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    const handleDeleteProduct = (id) => {
        console.log("Deleting product with id:", id); // Add this line to check if id is being received correctly
        fetch(`http://localhost:5000/delete-product/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to delete product');
            }
            return res.json();
        })
        .then(() => {
            // Update the state by fetching the updated list of products
            fetch(`http://localhost:5000/products?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setProducts(info.reverse()));
            toast.success("Product deleted successfully");
        })
        .catch((error) => {
            console.error('Error deleting product:', error);
            toast.error("Error deleting product");
        });
    };
    



    const [paymentStatusFilter, setPaymentStatusFilter] = useState("all"); // Step 1

    const handlePaymentStatusChange = (event) => { // Step 2
        setPaymentStatusFilter(event.target.value);
    };

    // Filtered products based on payment status
    const filteredProducts = paymentStatusFilter === "all" ? products : products.filter(product => product.paymentStatus === paymentStatusFilter);
    return (
        <>
            <div className="main-content m-5">
                <div className="page-content">
                    <div className="container-fluid">
                        <div class="col-sm-6 col-md-4 col-xl-3">
                            <div class="my-4 text-center">
                                <Link to="/seller/add-product" type="button" class="btn btn-primary m-3 mt-5">
                                    <i class="mdi mdi-plus me-2"></i>Add Product
                                </Link>
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
                                                            <td >
                                                                <div className="isotope-filters item-isotope-btn">
                                                                    <button className="button active" data-toggle="modal" data-target={`#exampleModal${index}`}>
                                                                        <i class="fas fa-pencil-alt"></i>
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
                                                                                                name="productDescription"
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
                                        {products.length > itemsPerPage && (
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={Math.ceil(products.length / itemsPerPage)}
                                                onPageChange={handlePageChange}
                                            />
                                        )}
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

export default SellerProducts;
