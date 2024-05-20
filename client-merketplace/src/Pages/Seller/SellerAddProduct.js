import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const SellerAddProduct = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/categories`)
            .then((res) => res.json())
            .then((info) => setCategories(info.reverse()));
    }, [user]);

    const [productDescription, setProductDescription] = useState("");

    const quillModules = {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
        ],
    };

    const handleCreate = (event) => {
        event.preventDefault();
        const sellerEmail = event.target.sellerEmail.value;
        const productName = event.target.productName.value;
        const price = event.target.price.value;
        const selectedCategorySlug = event.target.category.value;
        const selectedCategory = categories.find(category => category.slug === selectedCategorySlug);
        const categoryName = selectedCategory?.categoryName;
        const featuredImage = event.target.featuredImage.value;
        const productImageOne = event.target.productImageOne.value;
        const productImageTwo = event.target.productImageTwo.value;
        const productImageThree = event.target.productImageThree.value;
        const accessLink = event.target.accessLink.value;
        const guideLine = event.target.guideLine.value;

        const add = {
            sellerEmail,
            productName,
            price,
            category: categoryName,
            categorySlug: selectedCategorySlug,
            productDescription,
            featuredImage,
            productImageOne,
            productImageTwo,
            productImageThree,
            accessLink,
            guideLine,
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
                navigate('/seller/products');
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    return (
        <>
            <div className="main-content m-5">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form className="comment-form" onSubmit={handleCreate}>
                                            <div className="fadeInUp style-2 text-center">
                                                <div className="main-title"><h3>Add Product</h3></div>
                                            </div>
                                            <div className="columns gap20">
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
                                                    <select name="category" className="form-control" required>
                                                        <option value="">Select a category</option>
                                                        {categories.map((category) => (
                                                            <option key={category._id} value={category.slug}>
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
                </div>
            </div>
        </>
    );
};

export default SellerAddProduct;
