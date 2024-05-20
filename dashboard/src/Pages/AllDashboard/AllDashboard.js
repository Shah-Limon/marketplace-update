import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import SellerDashboard from '../../components/Seller/SellerDashboard';
import BuyerDashboard from '../../components/Buyer/BuyerDashboard';
import Dashboard from '../Dashboard';



const AllDashboard = () => {

    const [userInfo, setUserInfo] = useState({}); // Initialize seller as an empty object
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users?UserEmail=${user?.email}`)
                .then((res) => res.json())
                .then((info) => {
                    setUserInfo(info[0]);
                });
        }
    }, [user]);
    
    return (
        <>
            {userInfo.userRole === "Seller" && userInfo.UserEmail === user?.email && (
                <SellerDashboard></SellerDashboard>
            )}
            {userInfo.userRole === "Buyer" && userInfo.UserEmail === user?.email && (
                <BuyerDashboard></BuyerDashboard>
            )}
            {userInfo.userRole === "Admin" && userInfo.UserEmail === user?.email && (
                <Dashboard></Dashboard>
            )}
        </>
    );
};

export default AllDashboard;