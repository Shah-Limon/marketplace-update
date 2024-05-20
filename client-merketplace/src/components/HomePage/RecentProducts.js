// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const RecentProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         fetch(`http://localhost:5000/products`)
//             .then((res) => res.json())
//             .then((info) => {
//                 setProducts(info.reverse());
//                 const uniqueCategories = [...new Set(info.map((item) => item.category))];
//                 setCategories(uniqueCategories);
//             });
//     }, []);
//     const [reviews, setReviews] = useState([]);

//     useEffect(() => {
//         fetch(`http://localhost:5000/product-reviews`)
//             .then((res) => res.json())
//             .then((info) => setReviews(info))
//             .catch((error) => {
//                 console.error('Error fetching reviews:', error);
//             });
//     }, []);

//     // Function to get the number of reviews for a specific product
//     const getReviewCount = (productId) => {
//         const productReviews = reviews.filter((review) => review.productId === productId);
//         return productReviews.length;
//     };

//     return (
//         <>
//             {categories.map((category) => (
//                 <section key={category} className="all-item-area pd-top-90 pd-bottom-100">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-4">
//                                 <div className="section-title">
//                                     <h3>{category}</h3>
//                                 </div>
//                             </div>
//                             <div className="col-lg-8 mt-2">
//                                 <div className="isotope-filters item-isotope-btn text-lg-right">
//                                     <button className="button active ml-0">
//                                         <Link to={`/category/${category.categorySlug}`}>Show All Category Products</Link>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="all-item-section all-item-area-2">
//                             <div className="row">
//                                 {products
//                                     .filter((product) => product.category === category)
//                                     .slice(0, 3)
//                                     .map((e) => (
//                                         <div key={e._id} className="all-isotope-item col-lg-4 col-md-6 col-sm-12">
//                                             <div className="thumb">
//                                                 <Link className="gallery-fancybox" to={`/product/${e._id}`}>
//                                                     <img
//                                                         src={e.featuredImage}
//                                                         width={370}
//                                                         height={270}
//                                                         alt="images"
//                                                         style={{ objectFit: 'contain' }}
//                                                     />
//                                                 </Link>
//                                                 <Link to={`/product/${e._id}`} className="btn btn-white">
//                                                     More Details
//                                                 </Link>
//                                             </div>
//                                             <div className="item-details">
//                                                 <h4>
//                                                     <Link to={`/product/${e._id}`}>{e.productName}</Link>
//                                                 </h4>
//                                                 <span className="ratting">
//                                                     <i className="fa fa-star" />
//                                                     <i className="fa fa-star" />
//                                                     <i className="fa fa-star" />
//                                                     <i className="fa fa-star" />
//                                                     <i className="fa fa-star" />
//                                                     <span>({getReviewCount(e._id)})</span>
//                                                 </span>
//                                                 <p>
//                                                     <Link to={`/category/${e.categorySlug}`}>Category: {e.category}</Link>
//                                                 </p>
//                                                 <Link to="/" className="author-details align-item-center">
//                                                     <span className="mt-2">
//                                                         <div className="isotope-filters item-isotope-btn text-lg-right">
//                                                             <button className="button active ml-0">
//                                                                 <Link to={`/buy/${e._id}`}>Buy Now</Link>
//                                                             </button>
//                                                         </div>
//                                                     </span>
//                                                 </Link>
//                                                 <span className="price bg-white float-right">${e.price}</span>
//                                             </div>
//                                         </div>
//                                     ))}
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             ))}
//         </>
//     );
// };

// export default RecentProducts;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then((res) => res.json())
            .then((info) => {
                setProducts(info.reverse());
                const uniqueCategories = [...new Set(info.map((item) => item.category))];
                setCategories(uniqueCategories);
            });
    }, []);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/product-reviews')
            .then((res) => res.json())
            .then((info) => setReviews(info))
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }, []);

    const getReviewCount = (productId) => {
        const productReviews = reviews.filter((review) => review.productId === productId);
        return productReviews.length;
    };

    return (
        <>
            {categories.map((category) => {
                const categorySlug = products.find((product) => product.category === category)?.categorySlug;
                return (
                    <section key={category} className="all-item-area pd-top-90 pd-bottom-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="section-title">
                                        <h3>{category}</h3>
                                    </div>
                                </div>
                                <div className="col-lg-8 mt-2">
                                    <div className="isotope-filters item-isotope-btn text-lg-right">
                                        <button className="button active ml-0">
                                            <Link to={`/category/${categorySlug}`}>Show All Items</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="all-item-section all-item-area-2">
                                <div className="row">
                                    {products
                                        .filter((product) => product.category === category)
                                        .slice(0, 3)
                                        .map((product) => (
                                            <div key={product._id} className="all-isotope-item col-lg-4 col-md-6 col-sm-12">
                                                <div className="thumb">
                                                    <Link className="gallery-fancybox" to={`/product/${product._id}`}>
                                                        <img
                                                            src={product.featuredImage}
                                                            width={370}
                                                            height={270}
                                                            alt="images"
                                                            style={{ objectFit: 'contain' }}
                                                        />
                                                    </Link>
                                                    <Link to={`/product/${product._id}`} className="btn btn-white">
                                                        More Details
                                                    </Link>
                                                </div>
                                                <div className="item-details">
                                                    <h4>
                                                        <Link to={`/product/${product._id}`}>{product.productName}</Link>
                                                    </h4>
                                                    <span className="ratting">
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <span>({getReviewCount(product._id)})</span>
                                                    </span>
                                                    <p>
                                                        <Link to={`/category/${product.categorySlug}`}>Category: {product.category}</Link>
                                                    </p>
                                                    <Link to="/" className="author-details align-item-center">
                                                        <span className="mt-2">
                                                            <div className="isotope-filters item-isotope-btn text-lg-right">
                                                                <button className="button active ml-0">
                                                                    <Link to={`/buy/${product._id}`}>Buy Now</Link>
                                                                </button>
                                                            </div>
                                                        </span>
                                                    </Link>
                                                    <span className="price bg-white float-right">${product.price}</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
};

export default RecentProducts;
