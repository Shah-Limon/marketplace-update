import React, { useEffect, useState } from 'react';
import LatestSelling from './LatestSelling';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Pagination from '../../Shared/Pagination';

const TopSelling = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setOrders(info));
    }, [user]);


    useEffect(() => {
        fetch(`http://localhost:5000/products?sellerEmail=${user?.email}`)
            .then((res) => res.json())
            .then((info) => setProducts(info));
    }, [user]);

    // Calculate total sales for each product
    const productsSales = {};
    orders.forEach(order => {
        const productName = order.packageName;
        if (!productsSales[productName]) {
            productsSales[productName] = 0;
        }
        productsSales[productName]++;
    });
    // Calculate total selling price for products with payment status "Received"
    const totalSellingPrice = orders
        .filter(order => order.paymentStatus === "Received")
        .reduce((acc, order) => acc + parseFloat(order.packagePrice), 0);

    const totalAllSellingPrice = orders
        .reduce((acc, order) => acc + parseFloat(order.packagePrice), 0);

    // Convert product sales into array and sort by sales count
    const sortedProducts = Object.entries(productsSales).sort((a, b) => b[1] - a[1]);


    //pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSell = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="row">
                <LatestSelling />
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-5 col-9">
                                    <h5 className="font-size-15 mb-3">Top Selling Products</h5>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-nowrap mb-0">
                                    <tbody>
                                        {sortedProducts.map(([productName, sales]) => {
                                            const product = products.find(prod => prod.productName === productName);
                                            return (
                                                <tr key={productName}>
                                                    <td>
                                                        <div className="avatar-sm">
                                                            <span className="avatar-title rounded bg-light">
                                                                <img
                                                                    src={product?.featuredImage}
                                                                    className="avatar-sm"
                                                                    alt={productName}
                                                                />
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="">
                                                            <h6 className="mb-0">{productName}</h6>
                                                            <p className="fw-bold mb-0">Total Sales: {sales}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="">
                                                            <h6 className="mb-0">Total Received Price</h6>
                                                            <p className="fw-bold mb-0">${totalSellingPrice.toFixed(2)}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="">
                                                            <h6 className="mb-0">Total Selling With Pending Price</h6>
                                                            <p className="fw-bold mb-0">${totalAllSellingPrice.toFixed(2)}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className='mt-3'>
                                    <Pagination

                                        currentPage={currentPage}
                                        totalPages={Math.ceil(sortedProducts.length / itemsPerPage)}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopSelling;
