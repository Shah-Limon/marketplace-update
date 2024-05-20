import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import auth from "../../firebase.init";



const generateUniqueOrderId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let orderId = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderId += characters.charAt(randomIndex);
    }
    return orderId;
};
const Package = () => {
    const [product, setProduct] = useState([]);
    const [orderDate, setOrderDate] = useState("");
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then((res) => res.json())
            .then((info) => setProduct(info));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/users`)
        .then((res) => res.json())
        .then((info) => setUserInfo(info));
    }, [user]);

    const handleOrder = (event) => {
        event.preventDefault();
        const orderId = generateUniqueOrderId();
        const packageId = event.target.packageId.value;
        const packageName = event.target.packageName.value;
        const sellerEmail = event.target.sellerEmail.value;
        const packagePrice = event.target.packagePrice.value;
        const paymentStatus = event.target.paymentStatus.value;
        const orderStatus = event.target.orderStatus.value;
        const customerEmail = event.target.customerEmail.value;
        const customerName = event.target.customerName.value;
        const customerNote = event.target.customerNote.value;
        const address = event.target.address.value;
        const countryName = event.target.countryName.value;
        const cityName = event.target.cityName.value;
        const accessLink = event.target.accessLink.value;
        const guideLine = event.target.guideLine.value;

        const order = {
            orderId,
            packageId,
            sellerEmail,
            packageName,
            packagePrice,
            paymentStatus,
            orderStatus,
            customerEmail,
            customerName,
            customerNote,
            address,
            countryName,
            cityName,
            guideLine,
            accessLink,
            orderDate: orderDate,
            productReview: "none"
        };
        const url = `http://localhost:5000/new-order`;
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((result) => {
                navigate("/buyer/pending-payment/");
            });
    };
    
    useEffect(() => {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, "0");
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const year = currentDate.getFullYear();
        setOrderDate(`${day}/${month}/${year}`);
    }, []);
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((res) => res.json())
            .then((data) => {
                const sortedCountries = data.sort((a, b) =>
                    a.name.common.localeCompare(b.name.common)
                );
                setCountries(sortedCountries);
            })
            .catch((error) => {
                console.error("Error fetching country data: ", error);
            });
    }, []);
    return (
        <>
            <section className="pd-top-100 pd-bottom-100 bg-sky-blue">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10 text-center">
                            <div className="sign-in-area">
                                <h2>Fill in the Billing Information</h2>
                                {
                                    userInfo.filter(u => u.UserEmail === user?.email &&  u.userRole === 'Seller').length === 1 &&
                                    <h5>Seller Can't Buy Any Product</h5>
                                }
                               
                                {
                                      userInfo.filter(u => u.UserEmail === user?.email &&  u.userRole === 'Buyer').length === 1 &&
                                      <form className="contact-form-wrap" onSubmit={handleOrder}>
                                      <input type="text" value={product._id} name="packageId" hidden />
                                      <input type="text" value={product.productName} name="packageName" hidden />
                                      <input type="text" value={product.price} name="packagePrice" hidden />
                                      <input type="text" value={product.sellerEmail} name="sellerEmail" hidden />
                                      <input type="text" value="pending" name="paymentStatus" hidden />
                                      <input type="text" value="pending" name="orderStatus" hidden />
                                      <input type="text" value={product.guideLine} name="guideLine" hidden />
                                      <input type="text" value={product.accessLink} name="accessLink" hidden />
                                      <input
                                          hidden
                                          type="text"
                                          value={user?.email}
                                          name="customerEmail"
                                      />
                                      <div class="col-sm">
                                          <div class="form-group mb-3">
                                              <input
                                                  hidden
                                                  type="text"
                                                  className="form-control"
                                                  name="orderDate"
                                                  value={orderDate}
                                                  onChange={(e) => setOrderDate(e.target.value)}
                                              />
                                          </div>
                                      </div>
                                      <div class="col-sm">
                                          <label className="mt-1">Item Name</label>
                                          <div class="form-group mb-3">
                                              <input
                                                  required
                                                  type="text"
                                                  className="form-control border m-3"
                                                  value={product.productName}
                                              />
                                          </div>
                                      </div>
                                      <div class="col-sm">
                                          <label className="mt-1">Item Price</label>
                                          <div class="form-group mb-3">
                                              <input
                                                  required
                                                  type="text"
                                                  className="form-control border m-3"
                                                  value={product.price}
                                              />
                                          </div>
                                      </div>
                                      <div class="col-sm">
                                          <label className="mt-1">Your Full Name</label>
                                          <div class="form-group mb-3">
                                              <input
                                                  required
                                                  type="text"
                                                  className="form-control border m-3"
                                                  name="customerName"
                                                  defaultValue={userInfo.userName}
                                              />
                                          </div>
                                      </div>
                                      <div class="col-sm">
                                          <label className="mt-1">Address</label>
                                          <div class="form-group mb-3">
                                              <input required type="text" className="form-control border m-3" name="address" defaultValue={userInfo.address} />
                                          </div>
                                      </div>
                                      <div class="col-sm">
                                          <label className="mt-1">City</label>
                                          <div class="form-group mb-3">
                                              <input required type="text" className="form-control border m-3" name="cityName" defaultValue={userInfo.city} />
                                          </div>
                                      </div>
                                      <div class="col-sm">
                                          <label className="mt-1">Country</label>
                                          <div class="form-group mb-3">
                                              <select
                                                  required
                                                  className="form-control border m-3"
                                                  name="countryName"
                                                  value={selectedCountry}
                                                  onChange={(e) => setSelectedCountry(e.target.value)}
                                              >
                                                  <option value={userInfo.country}>
                                                      {userInfo.country}
                                                  </option>
                                                  {countries.map((country) => (
                                                      <option key={country.cca3} value={country.name.common}>
                                                          {country.name.common}
                                                      </option>
                                                  ))}
                                              </select>
                                          </div>
                                      </div>
                                      <div class="col-sm">
                                          <label className="mt-1">Customer Note</label>
                                          <div class="form-group mb-3">
                                              <textarea rows={4} type="text" className="form-control border m-3" name="customerNote" />
                                          </div>
                                      </div>
                                      <div class="col-sm">
                                          <button type="submit" className="btn btn-base w-100">
                                              <span>Place Order and Continue For Make Payment</span>
                                          </button>
                                      </div>
                                  </form>
                                }
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Package;
