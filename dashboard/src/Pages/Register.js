// import React from "react";
// import {
//   useCreateUserWithEmailAndPassword,
//   useSignInWithGoogle,
// } from "react-firebase-hooks/auth";
// import auth from "../firebase.init";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";


// const Register = () => {
//   const [gUser, gLoading] = useSignInWithGoogle(auth);
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();
//   const navigate = useNavigate();
//   const [logo, setLogo] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/logo`)
//       .then((res) => res.json())
//       .then((info) => setLogo(info));
//   }, []);
//   const [createUserWithEmailAndPassword, user, loading] =
//     useCreateUserWithEmailAndPassword(auth);

//   if (loading || gLoading) {
//     return <loading></loading>;
//   }

//   if (user || gUser) {
//     console.log(user || gUser);
//   }

//   const onSubmit = (data) => {
//     console.log(data);
//     createUserWithEmailAndPassword(data.email, data.password);
//     navigate("/");
//   };


//   return (
//     <>
//       <div className="main-content payment-setting" data-aos="fade-up" data-aos-duration={2000}>
//         <div className="page-content">
//           <section className="bg-auth">
//             <div className="container">
//               <div className="row justify-content-center">
//                 <div className="col-xl-10 col-lg-12">
//                   <div
//                     className="card auth-box mb-15"
//                     style={{ background: "#0c0f2d" }}
//                   >
//                     <div className="row g-0">
//                       <div className="col-lg-6 text-center">
//                         <div className="card-body p-4">
//                         {
//                             logo.map(e =>
//                               <Link to="/">
//                             <img
//                               src={e.logo}
//                               alt="logo"
//                             />
//                           </Link>)
//                           }
//                           <div className="mt-5">
//                             <img
//                               src="https://themesdesign.in/jobcy/layout/assets/images/auth/sign-up.png"
//                               alt=""
//                               className="img-fluid"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       {/*end col*/}
//                       <div className="col-lg-6">
//                         <div className="auth-content card-body p-5 h-100 text-white">
//                           <div className="w-100">
//                             <div className="text-center mb-4">
//                               <h4 className="text-white">Welcome!</h4>
//                               <p className="text-white">
//                                 Register to continue
//                               </p>
//                             </div>
//                             <form
//                               onSubmit={handleSubmit(onSubmit)}
//                               className="auth-form"
//                             >
//                               <div className="mb-3">
//                                 <label
//                                   htmlFor="usernameInput"
//                                   className="form-label"
//                                 >
//                                   Email
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   id="usernameInput"
//                                   placeholder="Enter your Email"
//                                   {...register("email", {
//                                     required: {
//                                       value: true,
//                                       message: "Email is Required",
//                                     },
//                                     pattern: {
//                                       value: /[A-Za-z]{3}/,
//                                       message: "Provide a Valid Email",
//                                     },
//                                   })}
//                                 />
//                                 <label class="label">
//                                   {errors.email?.type === "required" &&
//                                     "Email is Required"}
//                                 </label>
//                               </div>
//                               <div className="mb-3">
//                                 <label
//                                   htmlFor="passwordInput"
//                                   className="form-label"
//                                 >
//                                   Password
//                                 </label>
//                                 <input
//                                   type="password"
//                                   className="form-control"
//                                   id="passwordInput"
//                                   placeholder="Enter your password"
//                                   {...register("password", {
//                                     required: {
//                                       value: true,
//                                       message: "Password is Required",
//                                     },
//                                     minLength: {
//                                       value: 6,
//                                       message: "Minimum 6 Characters",
//                                     },
//                                   })}
//                                 />
//                                 <label class="label">
//                                   {errors.password?.type === "required" &&
//                                     "Password is Required"}
//                                 </label>
//                               </div>

//                               <div className="text-center">
//                                 <button
//                                   type="submit"
//                                   className="main-btn w-full text-center"
//                                 >
//                                   <span> Register</span>
//                                 </button>
//                               </div>
//                             </form>
//                             <div className="mt-4 text-center">
//                               <p className="mb-0">
//                                 Have an account ?{" "}
//                                 <Link
//                                   to="/login"
//                                   className="fw-medium text-white text-decoration-underline"
//                                 >
//                                   {" "}
//                                   Login Now{" "}
//                                 </Link>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       {/*end col*/}
//                     </div>
//                     {/*end row*/}
//                   </div>
//                   {/*end auth-box*/}
//                 </div>
//                 {/*end col*/}
//               </div>
//               {/*end row*/}
//             </div>
//             {/*end container*/}
//           </section>
//           {/* END SIGN-IN */}
//         </div>
//         {/* End Page-content */}
//       </div>
//     </>
//   );
// };

// export default Register;


import React from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "../components/Shared/Loading";

const SignUp = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);


  const navigate = useNavigate();

  let signInError;

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    console.log("Update done");
    navigate("/");
  };

  if (loading || gLoading || updating) {
    return <Loading />;
  }


  if (error || gError || updateError) {
    signInError = (
      <p className="text-red-500 text-center">
        <small>
          {error?.message || gError?.message || updateError?.message}
        </small>
      </p>
    );
  }
  return (

    <>


      <div className="account-pages my-5 pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card">
                <div className="card-body">
                  <div className="text-center mt-4">
                    <div className="mb-3">
                      <a href="index.html" className="">
                        <img
                          src="assets/images/logo-dark.png"
                          alt=""
                          height={22}
                          className="auth-logo logo-dark mx-auto"
                        />
                        <img
                          src="assets/images/logo-light.png"
                          alt=""
                          height={22}
                          className="auth-logo logo-light mx-auto"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-size-18 text-muted mt-2 text-center">
                      Free Register
                    </h4>
                    <p className="text-muted text-center mb-4">
                      Get your free upbond account now.
                    </p>
                    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="useremail">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="useremail"
                          placeholder="Enter email"
                          {...register("email", {
                            required: {
                              value: true,
                              message: "Email is Required",
                            },
                            pattern: {
                              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                              message: "Provide a valid Email",
                            },
                          })}
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email.message}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="username">
                          User Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "Name is Required",
                            },
                          })}
                        />
                        {errors.name && (
                          <div className="text-danger">{errors.name.message}</div>
                        )}


                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="userpassword">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Password is Required",
                            },
                            minLength: {
                              value: 6,
                              message: "Must be 6 characters or longer",
                            },
                          })}
                        />
                        {errors.password && (
                          <div className="text-danger">{errors.password.message}</div>
                        )}
                        {signInError && <div className="text-danger">{signInError}</div>}
                      </div>
                      <div className="mb-3 row mt-4">
                        <div className="col-12 text-end">
                          <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="text-center plan-line">or sign up with</div>
                        </div>
                      </div>
                      {/* end row */}
                      <div className="row mt-3">
                        <div className="button-list btn-social-icon text-center">

                          <button onClick={() => signInWithGoogle()} type="button" className="btn btn-twitter ms-1">
                            <i className="fab fa-google" />
                          </button>

                        </div>
                      </div>
                      {/* end row */}
                      <div className="mt-4 row">
                        <div className="col-12">
                          <div className="text-center">
                            <p className="text-muted mb-0">
                              By registering you agree to the Upbond{" "}
                              <a href="#">Terms of Use</a>
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* end row */}
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <a href="auth-login.html" className="fw-bold text-primary">
                    {" "}
                    Login{" "}
                  </a>
                </p>
                <p>
                  © Upbond. Crafted with <i className="mdi mdi-heart text-danger" />{" "}
                  by Themesbrand
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default SignUp;
