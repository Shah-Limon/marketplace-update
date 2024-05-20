
import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import UnreadMessages from "./UnreadMessages";
import ReadMessages from "./ReadMessages";

const AllMessages = () => {

    return (
        <>
            <SidebarMenu />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <UnreadMessages></UnreadMessages>
                        <ReadMessages></ReadMessages>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AllMessages;

