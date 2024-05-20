import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState("all"); // Default filter is set to show all orders
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  useEffect(() => {
    fetch(`https://ecommerceseonew-99d8d5c72bb6.herokuapp.com/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info.reverse())); // Reverse the array initially
  }, []);

  // Function to filter orders based on the selected date filter
  const filterOrders = () => {
    const currentDate = new Date();
    switch (selectedDateFilter) {
      case "thisMonth":
        return orders.filter((order) => {
          const orderDate = new Date(order.orderDate);
          return orderDate.getMonth() === currentDate.getMonth();
        });
      case "last7Days":
        const last7Days = new Date();
        last7Days.setDate(currentDate.getDate() - 7);
        return orders.filter((order) => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= last7Days;
        });
      case "previousMonth":
        const firstDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        return orders.filter((order) => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= firstDayOfPreviousMonth && orderDate <= lastDayOfPreviousMonth;
        });
      case "custom":
        // Filter based on the custom date range
        return orders.filter((order) => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= customStartDate && orderDate <= customEndDate;
        });
      default:
        // Show all orders
        return orders;
    }
  };

  const filteredOrders = filterOrders();

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Recent Orders</h4>
            <div className="mb-3">
              <select
                className="form-select form-select-sm"
                value={selectedDateFilter}
                onChange={(e) => setSelectedDateFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                <option value="thisMonth">This Month</option>
                <option value="last7Days">Last 7 Days</option>
                <option value="previousMonth">Previous Month</option>
                <option value="custom">Custom Date</option>
              </select>
              {selectedDateFilter === "custom" && (
                <div className="d-flex mt-2">
                  <DatePicker
                    selected={customStartDate}
                    onChange={(date) => setCustomStartDate(date)}
                    selectsStart
                    startDate={customStartDate}
                    endDate={customEndDate}
                    placeholderText="Start Date"
                    className="form-control form-control-sm"
                  />
                  <span className="mx-2">to</span>
                  <DatePicker
                    selected={customEndDate}
                    onChange={(date) => setCustomEndDate(date)}
                    selectsEnd
                    startDate={customStartDate}
                    endDate={customEndDate}
                    placeholderText="End Date"
                    className="form-control form-control-sm"
                  />
                </div>
              )}
            </div>
            <div className="table-responsive">
              <table className="table table-centered border table-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Order Status</th>
                    <th colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.slice(0, 5).map((order) => (
                    <tr key={order._id}>
                      <td>
                        <p className="text-muted mb-0 font-size-11">{order.orderDate}</p>
                      </td>
                      <td>
                        <div className="d-flex">
                          <div className="me-3">
                            <img
                              src="assets/images/users/avatar-5.jpg"
                              className="avatar-xs h-auto rounded-circle"
                              alt="Error"
                            />
                          </div>
                          <div>
                            <h5 className="font-size-13 text-truncate mb-1">
                              <a href="#" className="text-dark">
                                {order.customerName}
                              </a>
                            </h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h6 className="mb-1 font-size-13">${order.packagePrice}</h6>
                        <p className="text-danger text-uppercase mb-0 font-size-11">
                          <i className="mdi mdi-circle-medium" />
                          {order.paymentStatus}
                        </p>
                      </td>
                      <td>
                        <h6 className="mb-1 font-size-13">{order.orderStatus}</h6>
                      </td>
                      <td>
                        <div className="btn btn-soft-primary btn-sm">
                          View more
                          <i className="mdi mdi-arrow-right ms-1" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
