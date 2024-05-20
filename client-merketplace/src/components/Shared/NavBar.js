import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import BreadcumArea from './BreadcumArea';

const NavBar = () => {
  const [logo, setLogo] = useState({});
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState([]);


  const handleSignout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info[0]));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/users?UserEmail=${user?.email}`)
      .then(res => res.json())
      .then(data => setUserInfo(data))
  }, [user?.email])

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((info) => setProducts(info.reverse()));
  }, []);


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/category`)
      .then((res) => res.json())
      .then((info) => setCategories(info));
  }, []);

  const getProductCount = (categoryName) => {
    return products.filter((product) => product.category === categoryName).length;
  };

  const uniqueCategories = [...new Set(categories.map(category => JSON.stringify(category)))].map(item => JSON.parse(item));



  const [hideUserDashLink, setHideUserDashLink] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setHideUserDashLink(window.innerWidth >= 992);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const defaultProfileImage = "https://cdn-icons-png.flaticon.com/512/2202/2202112.png";


  return (
    <>
      <>
        <div className="body-overlay" id="body-overlay" />
        <div className="dkt-sitebar-menu">
          <div className="dkt-sitebar-menu">
            <a className="dkt-sitebar-close" href="#">
              <i className="fa fa-times" />
            </a>
            <div className="dkt-details-inner">
              <div className="logo">
                <Link to="/">
                  <img src={logo.logo} alt="img" />
                </Link>
              </div>
              <p className="details">
                Donsectetur elit, sed do eiusmod tempor ut labore et dolore magna
                aliqua.
              </p>
              <div className="address-inner">
                <h5>Address</h5>
                <p>3538 Cambridge Place Laurel, MD 20707</p>
              </div>
              <div className="address-inner">
                <h5>Phone</h5>
                <p>410-565-2575</p>
              </div>
              <div className="address-inner mb-0">
                <h5>Email</h5>
                <p>JohnPMills@dmarket.com</p>
              </div>
            </div>
            <div className="dkt-market-earn">
              <div className="address-inner">
                <h5>Market Earning</h5>
                <p>online store with lots of digital product and exclusive Item</p>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="earn-inner">
                    <p>Item Sold</p>
                    <h5>12501</h5>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="earn-inner">
                    <p>Total Earning</p>
                    <h5>25804</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-area">
          <nav className="navbar navbar-expand-lg">
            <div className="container nav-container">
              <div className="responsive-mobile-menu">
                <button
                  className="menu toggle-btn d-block d-lg-none"
                  data-target="#dkt_main_menu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="icon-left" />
                  <span className="icon-right" />
                </button>
              </div>
              <div className="logo">
                <Link className="main-logo-h1" to="/">
                  <img src={logo.logo} alt="img" />
                </Link>
              </div>

              <div className="collapse navbar-collapse" id="dkt_main_menu">
                <ul className="navbar-nav menu-open">
                  <li className="menu-item-has-children current-menu-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="menu-item-has-children current-menu-item">
                    <Link to="/shop">Shop</Link>
                    <ul className="sub-menu">
                      {uniqueCategories.map(category => (
                        <li key={category.categorySlug}>
                          <Link to={`/category/${category.categorySlug}`}>{category.category} ({getProductCount(category.category)})</Link>
                        </li>
                      ))}
                    </ul>

                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  {!hideUserDashLink && (
                    <li className='userDashLink'>
                      {user && user.email && userInfo.length > 0 && (
                        <>
                          {userInfo.map((profile) => {
                            if (profile.UserEmail === user.email) {
                              return (
                                <>
                                  {profile.userRole === "Seller" && (
                                    <Link to='/seller/dashboard' className='dashboard-link'>
                                      <span>Seller Dashboard</span>
                                    </Link>
                                  )}
                                  {profile.userRole === "Buyer" && (
                                    <Link to='/buyer/dashboard' className='dashboard-link'>
                                      <span>Buyer Dashboard</span>
                                    </Link>
                                  )}
                                  {profile.userRole === "Admin" && (
                                    <a href='http://localhost:3001/admin/dashboard' className='dashboard-link'>
                                      <span>Admin Dashboard</span>
                                    </a>
                                  )}
                                </>
                              );
                            }
                            return null;
                          })}
                        </>
                      )}
                    </li>
                  )}
                </ul>
              </div>
              <div className="nav-right-part nav-right-part-desktop">
                <ul>
                  <li>
                    {user ? (
                      <>
                        <div class="dropdown">
                          <button
                            className="dropdown-toggle custom-dropdown-btn"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {
                              userInfo
                                .filter(profile => profile.UserEmail === user.email)
                                .map(profile => (
                                  <img
                                    src={profile.profileURL ? profile.profileURL : defaultProfileImage}
                                    width={40}
                                    height={40}
                                    alt="img"
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      objectFit: 'cover',
                                      borderRadius: '50%'
                                    }}
                                  />
                                ))
                            }

                          </button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {user && user.email && userInfo.length > 0 && (
                              <>
                                {userInfo.map((profile) => {
                                  if (profile.UserEmail === user.email) {
                                    return (
                                      <>
                                        {profile.userRole === "Seller" && (
                                          <Link className='dropdown-item text-black' to='/seller/dashboard' style={{ color: "black" }}>
                                            Seller Dashboard
                                          </Link>

                                        )}
                                        {profile.userRole === "Buyer" && (
                                          <Link className='dropdown-item text-black' to='/buyer/dashboard' style={{ color: "black" }}>
                                            <span>Buyer Dashboard</span>
                                          </Link>
                                        )}
                                        {profile.userRole === "Admin" && (
                                          <a className='dropdown-item text-black' target='_blank' rel="noreferrer" href='http://localhost:3001/admin/dashboard' style={{ color: "black" }}>
                                            <span>Admin Dashboard</span>
                                          </a>
                                        )}
                                      </>
                                    );
                                  }
                                  return null;
                                })}
                              </>
                            )}
                            <div className='dropdown-item' onClick={handleSignout} style={{ color: 'black', cursor: 'pointer' }}>
                              Logout
                            </div>
                          </div>
                        </div>
                      </>

                    ) : (
                      <div className="btn btn-base">
                        <Link to="/login">
                          <span>Login Now | </span>
                        </Link>
                        <Link to="/register">
                          <span>Sign Up</span>
                        </Link>
                      </div>



                    )}
                  </li>
                  <li className="menu-bar dropdown-menu-btn">
                    <a href="#">
                      <i className="fa fa-bars" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
      <BreadcumArea></BreadcumArea>
    </>
  );
};

export default NavBar;