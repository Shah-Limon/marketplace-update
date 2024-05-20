import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RevenueChart = () => {
  const [orders, setOrders] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("weekly"); // Default filter is set to weekly
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetch(`https://ecommerceseonew-99d8d5c72bb6.herokuapp.com/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info.reverse())); // Reverse the array initially

    // Set default date range to last 30 days
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    setStartDate(last30Days);
    setEndDate(new Date());
  }, []);

  // Function to filter orders based on the selected filter and custom date range
  const filterOrders = () => {
    const currentDate = new Date();
    let filteredOrders = [];

    if (startDate && endDate) {
      // If custom date range is selected
      filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= startDate && orderDate <= endDate;
      });
    } else {
      // Use the selected filter
      switch (selectedFilter) {
        case "monthly":
          filteredOrders = orders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getMonth() === currentDate.getMonth();
          });
          break;
        case "yearly":
          filteredOrders = orders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            return orderDate.getFullYear() === currentDate.getFullYear();
          });
          break;
        default:
          // Default to weekly filter
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(currentDate.getDate() - 7);
          filteredOrders = orders.filter((order) => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= oneWeekAgo;
          });
          break;
      }
    }

    return filteredOrders;
  };

  // Function to format chart data based on the filtered orders
  const formatChartData = () => {
    const filteredOrders = filterOrders();
    // Define your chart data based on the structure expected by ApexCharts
    // For example, assuming you want to display the total revenue for each day
    const chartData = {
      series: [
        {
          name: "Revenue",
          data: filteredOrders.map((order) => parseFloat(order.packagePrice)),
        },
      ],
      options: {
        xaxis: {
          categories: filteredOrders.map((order) => order.orderDate),
        },
        // Add other chart options as needed
      },
    };
    return chartData;
  };

  const chartData = formatChartData();

  // Function to reset the date range to last 30 days
  const resetDateRange = () => {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    setStartDate(last30Days);
    setEndDate(new Date());
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card col-xl-9">
        <div className="card-body">
          
          {/* Custom date range picker */}
          <div className="mb-3">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
            />
            <span className="mx-2">to</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              placeholderText="End Date"
            />
          </div>
          <button className="btn btn-primary mb-3" onClick={resetDateRange}>
            Reset to Last 30 Days
          </button>
          <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
        </div>
      </div>
      {/* Add your other card and chart components here */}
    </div>
  );
};

export default RevenueChart;
