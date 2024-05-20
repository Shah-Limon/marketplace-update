import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../Shared/Pagination';

const AllCategoryProducts = () => {
    const { slug } = useParams();
    console.log('slug:', slug); // Debugging line to check the value of slug
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    // Fetch category products based on slug
    useEffect(() => {
        if (slug) {
            fetch(`http://localhost:5000/category?categorySlug=${slug}`)
                .then((res) => res.json())
                .then((info) => setCategoryProducts(info))
                .catch((error) => console.error('Error fetching category products:', error));
        }
    }, [slug]);

    // Fetch all products
    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then((res) => res.json())
            .then((info) => setProducts(info.reverse()))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Fetch all categories
    useEffect(() => {
        fetch(`http://localhost:5000/category`)
            .then((res) => res.json())
            .then((info) => {
                console.log('Fetched categories:', info); // Debugging line to check categories
                setCategories(info);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    // Fetch reviews
    useEffect(() => {
        fetch(`http://localhost:5000/product-reviews`)
            .then((res) => res.json())
            .then((info) => setReviews(info))
            .catch((error) => console.error('Error fetching reviews:', error));
    }, []);

    // Function to count products for each category
    const getProductCount = (categoryName) => {
        return products.filter(product => product.category === categoryName).length;
    };

    // Filter products based on search term
    const filteredProducts = categoryProducts.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle search input change
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    // Function to get the number of reviews for a specific product
    const getReviewCount = (productId) => {
        return reviews.filter((review) => review.productId === productId).length;
    };

    return (
        <section className="blog-page-area pd-top-100 pd-bottom-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 order-lg-last">
                        <div className="all-item-section all-item-area-2">
                            <div className="row">
                                {currentProducts.map(e =>
                                    <div className="all-isotope-item col-lg-6 col-sm-6" key={e._id}>
                                        <div className="thumb">
                                            <Link to={`/product/${e._id}`} className="gallery-fancybox">
                                                <img src={e.featuredImage} width={370} height={270} alt="images" />
                                            </Link>
                                            <Link className="btn btn-white" to={`/product/${e._id}`}>
                                                More Details
                                            </Link>
                                        </div>
                                        <div className="item-details">
                                            <h4>
                                                <Link to={`/product/${e._id}`}>{e.productName}</Link>
                                            </h4>
                                            <span className="ratting">
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <span>({getReviewCount(e._id)})</span>
                                            </span>
                                            <Link to={`/buy/${e._id}`} className="author-details align-item-center">
                                                <span className="mt-2">
                                                    <div className="isotope-filters item-isotope-btn text-lg-right">
                                                        <button className="button active ml-0">
                                                            Buy Now
                                                        </button>
                                                    </div>
                                                </span>
                                            </Link>
                                            <span className="price bg-white float-right">${e.price}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {filteredProducts.length > productsPerPage && (
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
                        )}
                    </div>
                    <div className="col-lg-4 order-lg-first">
                        <div className="sidebar-area">
                            <div className="widget widget-search">
                                <div className="single-search-inner">
                                    <input
                                        type="text"
                                        placeholder="Search here"
                                        value={searchTerm}
                                        onChange={handleSearchInputChange}
                                    />
                                    <button>
                                        <i className="la la-search" />
                                    </button>
                                </div>
                            </div>
                            <div className="widget widget-category widget-border">
                                <h5 className="widget-title">Category</h5>
                                <ul>
                                    {categories.map(category => {
                                        console.log('Category:', category.categoryName, 'Slug:', category.categorySlug); // Debugging line to display category name and slug
                                        return (
                                            <li key={category.categorySlug}>
                                                <Link to={`/category/${category.categorySlug}`}>
                                                    {category.category} ({getProductCount(category.category)})
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllCategoryProducts;
