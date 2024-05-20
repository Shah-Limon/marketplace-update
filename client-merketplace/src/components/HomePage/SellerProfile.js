import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../Shared/Pagination';

const SellerProfile = () => {
    const [seller, setSeller] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [categories, SetCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/user/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((info) => setSeller(info))
            .catch((error) => {
                console.error("Error fetching lead data:", error);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/products?sellerEmail=${seller.UserEmail}`)
            .then((res) => res.json())
            .then((info) => setProducts(info.reverse()));
    }, [seller]);
    useEffect(() => {
        fetch(`http://localhost:5000/orders?sellerEmail=${seller.UserEmail}`)
            .then((res) => res.json())
            .then((info) => setOrders(info.reverse()));
    }, [seller]);
    useEffect(() => {
        fetch(`http://localhost:5000/category`)
            .then((res) => res.json())
            .then((info) => SetCategories(info));
    }, []);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/product-reviews`)
            .then((res) => res.json())
            .then((info) => {
                setReviews(info);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }, []);

    // Function to get the number of reviews for a specific product
    const getReviewCount = (productId) => {
        const productReviews = reviews.filter(review => review.productId === productId);
        return productReviews.length;
    };

    const getProductCount = (categoryName) => {
        return products.filter(product => product.category === categoryName).length;
    };

    const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase()));

    const uniqueCategories = [...new Set(categories.map(category => category.category))];

    // Pagination Logic
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
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

    return (
        <>
            <div
                className="breadcrumb-area"
                style={{ backgroundImage: 'url("https://solverwp.com/demo/html/drketa/assets/img/breadcrumb/1.png")' }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-inner">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="media v-bc-inner">
                                            <div className="media-left">
                                                <img className='rounded' src={seller.profileURL} alt={seller.userName} width={130} height={130} style={{ objectFit: 'cover' }} />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h3><p>{seller.userName}</p></h3>
                                                <p> <i className="fa fa-check" />{' '}
                                                    {seller.userRole}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7 align-self-center">
                                        <ul className="v-bc-list-inner text-lg-right">
                                            <li>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <img src="https://solverwp.com/demo/html/drketa/assets/img/icon/4.png" alt="img" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        {products.length > 0 ? (
                                                            <>
                                                                <h4>{products.length}</h4>
                                                                <p>Listing Products</p>
                                                            </>
                                                        ) : (
                                                            <p>Not listing Products yet.</p>
                                                        )}
                                                    </div>

                                                </div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <img src="https://solverwp.com/demo/html/drketa/assets/img/icon/5.png" alt="img" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        {orders.length > 0 ? (
                                                            <>
                                                                <h4>{orders.length}</h4>
                                                                <p>Sales</p>
                                                            </>
                                                        ) : (
                                                            <p>Not Yet Order</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="blog-page-area pd-top-100 pd-bottom-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 order-lg-last">
                            <div className="all-item-section all-item-area-2">
                                <div className="row">
                                    {currentProducts.map(e =>
                                        <div className="all-isotope-item col-lg-6 col-sm-6" key={e._id}>
                                            <div className="thumb">
                                                <Link className="gallery-fancybox" to={`/product/${e._id}`}>
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
                                                <a href="#" className="author-details align-item-center">
                                                    <span className="mt-2">
                                                        <div className="isotope-filters item-isotope-btn text-lg-right">
                                                            <button className="button active ml-0">
                                                                Buy Now
                                                            </button>
                                                        </div>
                                                    </span>
                                                </a>
                                                <span className="price bg-white float-right">${e.price}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
                            <h4>Reviews</h4>
                        </div>
                        <div className="col-lg-4 order-lg-first">
                            <div className="sidebar-area">
                                <div className="widget widget-search">
                                    <div className="single-search-inner">
                                        <input type="text" placeholder="Search here" value={searchTerm} onChange={handleSearchInputChange} />
                                        <button>
                                            <i className="la la-search" />
                                        </button>
                                    </div>
                                </div>
                                <div className="widget widget-category widget-border">
                                    <h5 className="widget-title">Category</h5>
                                    <ul>
                                        {uniqueCategories.map(categoryName => (
                                            <li key={categoryName}>
                                                <Link to={`/category/${encodeURIComponent(categoryName)}`}>{categoryName}({getProductCount(categoryName)})</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SellerProfile;