import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import auth from "../firebase.init";
import Loading from "../components/Shared/Loading";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);


  let signInError;

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [userMail] = useAuthState(auth);
  useEffect(() => {
    if (userMail) {
      navigate(from, { replace: true });
    }
  }, [userMail, from, navigate]);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  if (loading || gLoading) {
    return <Loading />;
  }

  if (error || gError) {
    signInError = (
      <p className="text-danger text-center">
        <small>{error?.message || gError?.message}</small>
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
                      Welcome Back !
                    </h4>
                    <p className="text-muted text-center mb-4">
                      Sign in to continue to upbond.
                    </p>
                    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="username">
                          E-mail Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="username"
                          placeholder="Enter Email"
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
                      </div>
                      <label className="label">
                        {errors.email?.type === "required" && (
                          <span className="label-text-alt text-danger">
                            {errors.email.message}
                          </span>
                        )}
                        {errors.email?.type === "pattern" && (
                          <span className="label-text-alt text-danger">
                            {errors.email.message}
                          </span>
                        )}
                      </label>
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
                        <label className="label">
                          {errors.password?.type === "required" && (
                            <span className="label-text-alt text-danger">
                              {errors.password.message}
                            </span>
                          )}
                          {errors.password?.type === "minLength" && (
                            <span className="label-text-alt text-danger">
                              {errors.password.message}
                            </span>
                          )}
                        </label>


                        {signInError}
                      </div>

                      {/* end row */}
                      <div className="row mb-4">
                        <div className="col-12 text-center">
                          <button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                      {/* end row */}
                      <div className="row">
                        <div className="col-12">
                          <div className="text-center plan-line">or Login with</div>
                        </div>
                      </div>
                      {/* end row */}
                      <div className="row mt-3">
                        <div className="button-list btn-social-icon text-center">

                          <button onClick={() => signInWithGoogle()} type="button" className="btn btn-google ms-1">
                            <i className="fab fa-google" />
                          </button>
                        </div>
                      </div>
                      {/* end row */}
                    </form>
                    {/* end form */}
                  </div>
                </div>
                {/* end cardbody */}
              </div>
              {/* end card */}
              <div className="mt-5 text-center">
                <p>
                  Don't have an account ?
                  <a href="auth-register.html" className="fw-bold text-primary">
                    {" "}
                    Signup Now{" "}
                  </a>
                </p>
                <p>
                  © Upbond. Crafted with <i className="mdi mdi-heart text-danger" />{" "}
                  by Themesdesign
                </p>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
      </div>

    </>



  );
};

export default Login;