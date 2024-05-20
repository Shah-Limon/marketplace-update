// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import Loading from "../Loading";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import auth from "../../../firebase.init";

// // const ReceivedPayment = () => {
// //     const { id } = useParams();
// //     const navigate = useNavigate();

// //     const [order, setOrder] = useState(null);
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         fetch(`http://localhost:5000/order/${id}`)
// //             .then((res) => res.json())
// //             .then((info) => {
// //                 setOrder(info);
// //                 setLoading(false);
// //             });
// //     }, [id]);

// //     const [user] = useAuthState(auth)
// //     const [seller, setSeller] = useState({});
// //     useEffect(() => {
// //         // http://localhost:5000/users?userEmail=seller13@gmail.com
// //         fetch(`http://localhost:5000/users?userEmail=${order.sellerEmail}`)
// //             .then((res) => res.json())
// //             .then((info) => setSeller(info[0]));
// //     }, [order.sellerEmail]);

// //     const [commission, SetCommissions] = useState({});
// //     useEffect(() => {
// //         fetch(`http://localhost:5000/commissions`)
// //             .then((res) => res.json())
// //             .then((info) => SetCommissions(info[0]));
// //     }, []);

// //     useEffect(() => {
// //         const updateOrderData = async () => {
// //             try {
// //                 if (!order) return;
// //                 const updateOrder = {
// //                     paymentStatus: "Paid",
// //                 };
// //                 const url = `http://localhost:5000/payment-received/${id}`;
// //                 const response = await fetch(url, {
// //                     method: "PUT",
// //                     headers: {
// //                         "content-type": "application/json",
// //                     },
// //                     body: JSON.stringify(updateOrder),
// //                 });
// //                 if (response.ok) {
// //                     navigate("/buyer/orders");
// //                 } else {
// //                     console.error("Order update failed.");
// //                 }
// //             } catch (error) {
// //                 console.error("An error occurred:", error);
// //             }
// //         };

// //         if (!loading && order) {
// //             updateOrderData();
// //         }
// //     }, [loading, order, id, navigate]);



// //     return (
// //         <div>
// //             <div>
// //                 {loading ? (
// //                     <Loading />
// //                 ) : (
// //                     <div className="contact__page section-padding pb-0 h-100">
// //                         <div className="container">
// //                             <div className="row text-center ">
// //                                 <div className="col-lg-12">
// //                                     <div className="contact__page-form">
// //                                         <section className="testimonials s2">
// //                                             <div className="container">
// //                                                 <div className="row">
// //                                                     <div className="col-md-12">
// //                                                         <div className="testimonials__main">
// //                                                             <div className="block-text center">
// //                                                                 <h4 className="heading">
// //                                                                     We have received your payment.
// //                                                                     {order._id}
// //                                                                 </h4>
// //                                                             </div>
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         </section>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default ReceivedPayment;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Loading from "../Loading";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../../firebase.init";

// const ReceivedPayment = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch(`http://localhost:5000/order/${id}`)
//             .then((res) => res.json())
//             .then((info) => {
//                 setOrder(info);
//                 setLoading(false);
//             });
//     }, [id]);

//     const [user] = useAuthState(auth);
//     const [seller, setSeller] = useState({});
//     useEffect(() => {
//         fetch(`http://localhost:5000/users?userEmail=${order?.sellerEmail}`)
//             .then((res) => res.json())
//             .then((info) => setSeller(info[0]));
//     }, [order?.sellerEmail]);

//     const [commissionRate, setCommissionRate] = useState(0);
//     useEffect(() => {
//         fetch(`http://localhost:5000/commissions`)
//             .then((res) => res.json())
//             .then((info) => setCommissionRate(info[0]?.commission || 0));
//     }, []);

//     useEffect(() => {
//         const updateOrderData = async () => {
//             try {
//                 if (!order) return;
//                 const updateOrder = {
//                     paymentStatus: "Paid",
//                 };
//                 const url = `http://localhost:5000/payment-received/${id}`;
//                 const response = await fetch(url, {
//                     method: "PUT",
//                     headers: {
//                         "content-type": "application/json",
//                     },
//                     body: JSON.stringify(updateOrder),
//                 });
//                 if (response.ok) {
//                     // Update seller's balance after deducting commission
//                     const orderPrice = order.price || 0;
//                     const commissionAmount = (orderPrice * commissionRate) / 100;
//                     const updatedBalance = seller.currentBalance + orderPrice - commissionAmount;
//                     await fetch(`http://localhost:5000/user-balance/${seller._id}`, {
//                         method: "PUT",
//                         headers: {
//                             "content-type": "application/json",
//                         },
//                         body: JSON.stringify({ currentBalance: updatedBalance }),
//                     });
//                     navigate("/buyer/orders");
//                 } else {
//                     console.error("Order update failed.");
//                 }
//             } catch (error) {
//                 console.error("An error occurred:", error);
//             }
//         };

//         if (!loading && order) {
//             updateOrderData();
//         }
//     }, [loading, order, id, navigate, commissionRate, seller]);

//     return (
//         <div>
//             <div>
//                 {loading ? (
//                     <Loading />
//                 ) : (
//                     <div className="contact__page section-padding pb-0 h-100">
//                         <div className="container">
//                             <div className="row text-center ">
//                                 <div className="col-lg-12">
//                                     <div className="contact__page-form">
//                                         <section className="testimonials s2">
//                                             <div className="container">
//                                                 <div className="row">
//                                                     <div className="col-md-12">
//                                                         <div className="testimonials__main">
//                                                             <div className="block-text center">
//                                                                 <h4 className="heading">
//                                                                     We have received your payment.
//                                                                     {order._id}
//                                                                 </h4>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </section>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ReceivedPayment;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const ReceivedPayment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seller, setSeller] = useState({});
    const [commissionRate, setCommissionRate] = useState(0);
    const [user] = useAuthState(auth);

    useEffect(() => {
        // Fetch order data
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:5000/order/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch order");
                }
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    useEffect(() => {
        // Fetch seller data
        const fetchSeller = async () => {
            try {
                if (order?.sellerEmail) {
                    const response = await fetch(`http://localhost:5000/users?userEmail=${order.sellerEmail}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch seller");
                    }
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setSeller(data[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching seller:", error);
            }
        };

        fetchSeller();
    }, [order?.sellerEmail]);

    useEffect(() => {
        // Fetch commission rate
        const fetchCommissionRate = async () => {
            try {
                const response = await fetch(`http://localhost:5000/commissions`);
                if (!response.ok) {
                    throw new Error("Failed to fetch commission");
                }
                const data = await response.json();
                setCommissionRate(data[0]?.commission || 0);
            } catch (error) {
                console.error("Error fetching commission:", error);
            }
        };

        fetchCommissionRate();
    }, []);

    // useEffect(() => {
    //     // Update order data
    //     const updateOrderData = async () => {
    //         try {
    //             if (!order || !seller._id || order.loading || seller.loading) return;
    
    //             const orderPrice = order.packagePrice || 0;
    //             const commissionAmount = (orderPrice * commissionRate) / 100;
    
    //             const responseSeller = await fetch(`http://localhost:5000/user/${seller._id}`);
    //             if (!responseSeller.ok) {
    //                 throw new Error("Failed to fetch seller data");
    //             }
    //             const sellerData = await responseSeller.json();
    
    //             if (!sellerData) {
    //                 throw new Error("Seller data not found");
    //             }
    
    //             const updatedBalance = sellerData.currentBalance + orderPrice - commissionAmount;
    
    //             // Update seller's balance first
    //             await fetch(`http://localhost:5000/user-balance/${seller._id}`, {
    //                 method: "PUT",
    //                 headers: {
    //                     "content-type": "application/json",
    //                 },
    //                 body: JSON.stringify({ currentBalance: updatedBalance }),
    //             });
    
    //             // Then update order payment status
    //             const updateOrder = {
    //                 paymentStatus: "Paid",
    //             };
    
    //             const url = `http://localhost:5000/payment-received/${id}`;
    //             const response = await fetch(url, {
    //                 method: "PUT",
    //                 headers: {
    //                     "content-type": "application/json",
    //                 },
    //                 body: JSON.stringify(updateOrder),
    //             });
    
    //             if (!response.ok) {
    //                 throw new Error("Failed to update order");
    //             }
    
    //             navigate("/buyer/orders");
    //         } catch (error) {
    //             console.error("An error occurred:", error);
    //         }
    //     };
    
    //     updateOrderData();
    // }, [order, seller, id, commissionRate, navigate]);
    useEffect(() => {
        // Update order data
        const updateOrderData = async () => {
            try {
                if (!order || !seller._id || order.loading || seller.loading) return;
    
                const orderPrice = parseFloat(order.packagePrice || 0);
                const commissionAmount = (orderPrice * commissionRate) / 100;
    
                const responseSeller = await fetch(`http://localhost:5000/user/${seller._id}`);
                if (!responseSeller.ok) {
                    throw new Error("Failed to fetch seller data");
                }
                const sellerData = await responseSeller.json();
    
                if (!sellerData) {
                    throw new Error("Seller data not found");
                }
    
                const currentBalance = parseFloat(sellerData.currentBalance || 0);
                const updatedBalance = currentBalance + orderPrice - commissionAmount;
    
                // Update seller's balance first
                await fetch(`http://localhost:5000/user-balance/${seller._id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ currentBalance: updatedBalance }),
                });
    
                // Then update order payment status
                const updateOrder = {
                    paymentStatus: "Paid",
                };
    
                const url = `http://localhost:5000/payment-received/${id}`;
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(updateOrder),
                });
    
                if (!response.ok) {
                    throw new Error("Failed to update order");
                }
    
                navigate("/buyer/orders");
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
    
        updateOrderData();
    }, [order, seller, id, commissionRate, navigate]);
    

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className="contact__page section-padding pb-0 h-100">
                    <div className="container">
                        <div className="row text-center ">
                            <div className="col-lg-12">
                                <div className="contact__page-form">
                                    <section className="testimonials s2">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="testimonials__main">
                                                        <div className="block-text center">
                                                            <h4 className="heading">
                                                                We have received your payment.
                                                                {order && order._id}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReceivedPayment;

