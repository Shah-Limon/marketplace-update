import React, { useEffect, useState } from "react";



const DashboardOrdersCard = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`https://ecommerceseonew-99d8d5c72bb6.herokuapp.com/orders`)
            .then((res) => res.json())
            .then((info) => setOrders(info.reverse())); // Reverse the array initially
    }, []);
    const paidOrders = orders.filter(order => order.paymentStatus === 'Paid');
    const totalSalesAmount = paidOrders.reduce((total, order) => total + parseFloat(order.packagePrice), 0).toFixed(2);

    return (
        <div className="row">
            <div className="col-xl-3 col-md-6">
                <div className="card">
                    <div className="card-body p-0">
                        <div className="p-4">
                            <div className="d-flex">
                                <div className="flex-1">
                                    <h3 className="mb-3">
                                        <span
                                            className="counter_value"
                                            data-target={519545}
                                        >
                                            {orders.length}
                                        </span>
                                    </h3>
                                </div>
                                <div className="">
                                    <p className="badge bg-soft-primary text-primary fw-bold font-size-12 mb-0">
                                        Total
                                    </p>
                                </div>
                            </div>
                            <h5 className="text-muted font-size-14 mb-0">
                                Orders
                            </h5>
                        </div>
                        <div>
                            <div
                                id="visitors_charts"
                                className="apex-charts"
                                dir="ltr"
                            />
                        </div>
                    </div>
                    {/* end cardbody */}
                </div>
                {/* end card */}
            </div>
            {/* end col */}
            <div className="col-xl-3 col-md-6">
                <div className="card">
                    <div className="card-body p-0">
                        <div className="p-4">
                            <div className="d-flex">
                                <div className="flex-1">
                                    <h3 className="mb-3">
                                        $
                                        <span className="counter_value" data-target={97450}>
                                            {totalSalesAmount}
                                        </span>
                                    </h3>
                                </div>
                                <div className="">
                                    <p className="badge bg-primary font-size-12 mb-0">
                                        Total
                                    </p>
                                </div>
                            </div>
                            <h5 className="text-muted font-size-14">Revenue</h5>


                        </div>
                    </div>
                    {/* end cardbody */}
                </div>
                {/* end card */}
            </div>
            {/* end col */}
            <div className="col-xl-3 col-md-6">
                <div className="card">
                    <div className="card-body p-0">
                        <div className="p-4">
                            <div className="d-flex">
                                <div className="flex-1">
                                    <h3 className="mb-3">
                                        +
                                        <span
                                            className="counter_value"
                                            data-target={213545}
                                        >
                                            {orders.filter(order => order.orderStatus === 'Pending').length}
                                        </span>
                                    </h3>
                                </div>
                                <div className="">
                                    <p className="badge bg-soft-primary text-primary fw-bold font-size-12">
                                        Total
                                    </p>
                                </div>
                            </div>
                            <h5 className="text-muted font-size-14 mb-0">
                                Pending Orders
                            </h5>
                        </div>
                        <div>
                            <div
                                id="order_charts"
                                className="chart-spark"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {/* end cardbody */}
                </div>

                {/* end card */}
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card">
                    <div className="card-body p-0">
                        <div className="p-4">
                            <div className="d-flex">
                                <div className="flex-1">
                                    <h3 className="mb-3">
                                        +
                                        <span
                                            className="counter_value"
                                            data-target={213545}
                                        >
                                            {orders.filter(order => order.orderStatus === 'Pending').length}
                                        </span>
                                    </h3>
                                </div>
                                <div className="">
                                    <p className="badge bg-soft-primary text-primary fw-bold font-size-12">
                                        Total
                                    </p>
                                </div>
                            </div>
                            <h5 className="text-muted font-size-14 mb-0">
                                Pending Orders
                            </h5>
                        </div>
                        <div>
                            <div
                                id="order_charts"
                                className="chart-spark"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {/* end cardbody */}
                </div>

                {/* end card */}
            </div>

            {/* end col */}
        </div>
    );
};

export default DashboardOrdersCard;
