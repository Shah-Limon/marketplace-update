import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";

const NavBar = () => {
  const [logo, setLogo] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info[0]));
  }, []);

  const [user] = useAuthState(auth);
  const handleSignout = () => {
    signOut(auth);
  };


  const [userInfo, setUserInfo] = useState({}); // Initialize seller as an empty object
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
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            {/* LOGO */}
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img
                    src={logo.logo}
                    alt="logo-sm-dark"
                    height={22}
                  />
                </span>
                <span className="logo-lg">
                  <img
                    src={logo.logo}
                    alt="logo-dark"
                    height={22}
                  />
                </span>
              </Link>
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img
                    src={logo.logo}
                    alt="logo-sm-light"
                    height={22}
                  />
                </span>
                <span className="logo-lg">
                  <img
                    src={logo.logo}
                    alt="logo-light"
                    height={22}
                  />
                </span>
              </Link>
            </div>
            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="ri-menu-2-line align-middle" />
            </button>

          </div>
          <div className="d-flex">
            {user ? (
              <div className="dropdown d-inline-block user-dropdown">
                <button
                  type="button"
                  className="btn header-item waves-effect"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class=" fas fa-user"></i>
                  <span className="d-none d-xl-inline-block ms-1">{user?.displayName}</span>
                  <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                </button>
                <div className="dropdown-menu dropdown-menu-end">

                  {userInfo.userRole === "Seller" && userInfo.UserEmail === user?.email && (
                    <a
                      href={`http://localhost:3000/seller/${userInfo._id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-soft-primary w-100 mt-3"
                    >
                      View Profile
                    </a>
                  )}
                  {userInfo.userRole === "Buyer" && userInfo.UserEmail === user?.email && (
                    <a
                      href={`http://localhost:3000/`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-soft-primary w-100 mt-3"
                    >
                      View Website
                    </a>
                  )}



                  <div className="dropdown-divider" />
                  <Link className="dropdown-item text-danger" onClick={handleSignout}>
                    <i className="ri-shut-down-line align-middle me-1 text-danger" />
                    Logout
                  </Link>
                </div>
              </div>
            )
              :
              (
                <Link to="/login" className="text-white btn btn-soft-primary w-100 mt-3">
                  Login
                </Link>
              )

            }

          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
