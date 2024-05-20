import React from "react";
import SidebarMenu from "../components/Shared/SidebarMenu";
import AllOrders from "../components/Shared/AllOrders";



const Orders = () => {

    return (
        <>
            <>
                <SidebarMenu></SidebarMenu>
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <AllOrders></AllOrders>
                        </div>
                    </div>
                </div>
            </>

        </>
    );
};

export default Orders;
