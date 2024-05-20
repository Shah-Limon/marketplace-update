// import React from "react";
// import {
//     useCreateUserWithEmailAndPassword,
//     useSignInWithGoogle,
//     useUpdateProfile,
// } from "react-firebase-hooks/auth";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import auth from "../firebase.init";
// import Loading from "../components/Shared/Loading";


// const Register = () => {
//     const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
//     const {
//         register,
//         formState: { errors },
//         handleSubmit,
//     } = useForm();

//     const [createUserWithEmailAndPassword, user, loading, error] =
//         useCreateUserWithEmailAndPassword(auth);

//     const [updateProfile, updating, updateError] = useUpdateProfile(auth);
//     const navigate = useNavigate();

//     let signInError;

//     const onSubmit = async (data) => {
//         try {
//             // Create user with email and password
//             await createUserWithEmailAndPassword(data.email, data.password);

//             // Update user profile with display name
//             await updateProfile(auth.currentUser, { displayName: data.name });

//             // Send user data to backend
//             const response = await fetch('http://localhost:5000/add-user', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     userName: data.name,
//                     UserEmail: data.email
//                 }),
//             });

//             if (response.ok) {
//                 console.log('User data saved successfully');
//                 navigate('/update');
//             } else {
//                 console.error('Failed to save user data to the database');
//             }
//         } catch (error) {
//             console.error('Error during registration:', error.message);
//         }
//     };


//     if (loading || gLoading || updating) {
//         return <Loading />;
//     }
//     if (error || gError || updateError) {
//         signInError = (
//             <p className="text-red-500 text-center">
//                 <small>
//                     {error?.message || gError?.message || updateError?.message}
//                 </small>
//             </p>
//         );
//     }
//     return (
//         <>

//             <section className="pd-top-100 pd-bottom-100 bg-sky-blue">
//                 <div className="container">
//                     <div className="row justify-content-center">
//                         <div className="col-xl-7 col-lg-10 text-center">
//                             <div className="sign-in-area">
//                                 <h2>Sign up to your account</h2>
//                                 <form className="contact-form-wrap" onSubmit={handleSubmit(onSubmit)} >
//                                     <div className="single-input-wrap input-group">
//                                         <label htmlFor="inp-0">User Name</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="username"
//                                             placeholder="Enter username"
//                                             {...register("name", {
//                                                 required: {
//                                                     value: true,
//                                                     message: "Name is Required",
//                                                 },
//                                             })}
//                                         />
//                                         {errors.name && (
//                                             <div className="text-danger">{errors.name.message}</div>
//                                         )}
//                                     </div>
//                                     <div className="single-input-wrap input-group">
//                                         <label htmlFor="inp-1">Email address</label>
//                                         <input
//                                             type="email"
//                                             className="form-control"
//                                             id="useremail"
//                                             placeholder="Enter email"
//                                             {...register("email", {
//                                                 required: {
//                                                     value: true,
//                                                     message: "Email is Required",
//                                                 },
//                                                 pattern: {
//                                                     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
//                                                     message: "Provide a valid Email",
//                                                 },
//                                             })}
//                                         />
//                                         {errors.email && (
//                                             <div className="text-danger">{errors.email.message}</div>
//                                         )}
//                                     </div>
//                                     <div className="single-input-wrap input-group">
//                                         <label htmlFor="inp-2">Password</label>
//                                         <input
//                                             type="password"
//                                             className="form-control"
//                                             id="userpassword"
//                                             placeholder="Enter password"
//                                             {...register("password", {
//                                                 required: {
//                                                     value: true,
//                                                     message: "Password is Required",
//                                                 },
//                                                 minLength: {
//                                                     value: 6,
//                                                     message: "Must be 6 characters or longer",
//                                                 },
//                                             })}
//                                         />

//                                     </div>
//                                     {errors.password && (
//                                         <div className="text-danger">{errors.password.message}</div>
//                                     )}
//                                     {signInError && <div className="text-danger">{signInError}</div>}

//                                     <button className="btn btn-base w-100">Sign Up</button>
//                                     <p>Or continue with</p>
//                                     <button onClick={() => signInWithGoogle()} className="btn btn-g w-100">
//                                         <i className="fab fa-google" aria-hidden="true" />
//                                         Continue with Google
//                                     </button>

//                                     <p>
//                                         Already Have an account? <Link to="/login">Sign In</Link>
//                                     </p>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//         </>
//     );
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


const Register = () => {
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
        try {
            // Create user with email and password
            await createUserWithEmailAndPassword(data.email, data.password);

            // Update user profile with display name
            await updateProfile(auth.currentUser, { displayName: data.name });

            // Send user data to backend
            const response = await fetch('http://localhost:5000/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: data.name,
                    UserEmail: data.email,
                    userRole: data.userRole, // Include user role in the request
                    currentBalance: 0
                }),
            });

            if (response.ok) {
                console.log('User data saved successfully');
                navigate('/update-profile');
            } else {
                console.error('Failed to save user data to the database');
            }
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
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
            <section className="pd-top-100 pd-bottom-100 bg-sky-blue">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-7 col-lg-10 text-center">
                            <div className="sign-in-area">
                                <h2>Sign up to your account</h2>
                                <form className="contact-form-wrap" onSubmit={handleSubmit(onSubmit)} >
                                    <div className="single-input-wrap input-group">
                                        <label htmlFor="inp-0">User Name</label>
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
                                        
                                    </div>
                                    {errors.name && (
                                            <div className="text-danger">{errors.name.message}</div>
                                        )}
                                    <div className="single-input-wrap input-group">
                                        <label htmlFor="inp-1">Email address</label>
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
                                       
                                    </div>
                                    {errors.email && (
                                            <div className="text-danger">{errors.email.message}</div>
                                        )}
                                    <div className="single-input-wrap input-group">
                                        <label htmlFor="inp-2">Password</label>
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
                                    </div>
                                    <div className="single-input-wrap input-group">
                                        <label htmlFor="inp-3">User Role</label>
                                        <select
                                            className="form-control"
                                            id="userrole"
                                            {...register("userRole", {
                                                required: {
                                                    value: true,
                                                    message: "User Role is Required",
                                                },
                                            })}
                                        >
                                            <option value="">Select User Role</option>
                                            <option value="Seller">Seller</option>
                                            <option value="Buyer">Buyer</option>
                                        </select>
                                      
                                    </div>
                                    {errors.userRole && (
                                            <div className="text-danger">{errors.userRole.message}</div>
                                        )}
                                    {errors.password && (
                                        <div className="text-danger">{errors.password.message}</div>
                                    )}
                                    {signInError && <div className="text-danger">{signInError}</div>}

                                    <button className="btn btn-base w-100">Sign Up</button>
                                    <p>Or continue with</p>
                                    <button onClick={() => signInWithGoogle()} className="btn btn-g w-100">
                                        <i className="fab fa-google" aria-hidden="true" />
                                        Continue with Google
                                    </button>

                                    <p>
                                        Already Have an account? <Link to="/login">Sign In</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
