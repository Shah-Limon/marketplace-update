import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading";
import SidebarMenu from "../SidebarMenu";


const AdminRoute = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.reverse());
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false); // Set loading to false on error
      });
  }, []);


  const isAdminOrManager = users.some((u) => {
    return (
      user?.email === u.userEmail &&
      (u.userRole === "Admin")
    );
  });

  if (loading) {
    return <Loading />;
  }

  return isAdminOrManager ? (
    children
  ) : (


    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="text-center payment-setting" data-aos="fade-up" data-aos-duration={2000}>
              <h4>You are not authorized to access this page. <br></br>(You're not an admin)</h4>
            </div>
          </div>
        </div>
      </div>
    </>




  );
};

export default AdminRoute;
