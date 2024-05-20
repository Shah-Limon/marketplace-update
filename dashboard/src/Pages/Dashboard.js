import React, { useEffect, useState } from "react";
import SidebarMenu from "../components/Shared/SidebarMenu";
import LatestSell from "./Orders/LatestSell";
import LastestWithdraw from "./Orders/LastestWithdraw";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [AllUsers, setAllUsers] = useState([]);
  const [products, setProducts] = useState([]);



  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info.reverse()));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((info) => setAllUsers(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((info) => setProducts(info));
  }, []);

  return (
    <>
      <SidebarMenu></SidebarMenu>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">Dashboard</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="p-4">
                          <div className="d-flex">
                            <div className="flex-1">
                              <h3 className="mb-3">
                                <span className="counter_value badge bg-soft-primary text-primary fw-bold font-size-26 mb-0">
                                  {products.length}
                                </span>
                              </h3>
                            </div>
                            <div className="">
                              <p className="badge bg-soft-primary text-primary fw-bold font-size-12 mb-0">
                                Total Products Added
                              </p>
                            </div>
                          </div>
                          <h5 className="text-muted font-size-14 mb-0">Total Products Added</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="p-4">
                          <div className="d-flex">
                            <div className="flex-1">
                              <h3 className="mb-3">
                                <span className="counter_value badge bg-soft-primary text-primary fw-bold font-size-26 mb-0">
                                  {orders.length}
                                </span>
                              </h3>
                            </div>
                            <div className="">
                              <p className="badge bg-soft-primary text-primary fw-bold font-size-12 mb-0">
                                Total Orders
                              </p>
                            </div>
                          </div>
                          <h5 className="text-muted font-size-14 mb-0">Total Orders</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="card">
                      <div className="card-body p-0">
                        <div className="p-4">
                          <div className="d-flex">
                            <div className="flex-1">
                              <h3 className="mb-3">
                                <span className="counter_value badge bg-soft-primary text-primary fw-bold font-size-26 mb-0">
                                  {AllUsers.length}
                                </span>
                              </h3>
                            </div>
                            <div className="">
                              <p className="badge bg-soft-primary text-primary fw-bold font-size-12 mb-0">
                                Total Users
                              </p>
                            </div>
                          </div>
                          <h5 className="text-muted font-size-14 mb-0">Total Users</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <LatestSell></LatestSell>
                <LastestWithdraw></LastestWithdraw>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
