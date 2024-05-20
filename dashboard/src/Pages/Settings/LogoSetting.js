import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const LogoSetting = () => {
    const [logo, setLogo] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imgbbApiKey] = useState("478ab797668f3bc1b01cba3c7090d988");

    useEffect(() => {
        fetch(`http://localhost:5000/logo`)
            .then((res) => res.json())
            .then((info) => setLogo(info[0]));
    }, []);

    const handleEditPayment = async (event, id) => {
        event.preventDefault();

        let currentLogo = logo;

        if (currentLogo && currentLogo.logo) {
            currentLogo = currentLogo.logo;
        }
        currentLogo = imageFile ? imagePreview : currentLogo;

        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append("image", imageFile);
                formData.append("key", imgbbApiKey);

                const imgbbResponse = await axios.post(
                    "https://api.imgbb.com/1/upload",
                    formData
                );
                currentLogo = imgbbResponse.data.data.url;
            } catch (error) {
                console.error("Image upload to imgbb failed:", error);
                return;
            }
        }

        const edit = {
            logo: currentLogo,
        };
        const url = `http://localhost:5000/logo/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(edit),
        })
            .then((res) => res.json())
            .then((result) => {
                toast.success('Logo Updated successfully');
                event.target.reset();
                const modal = document.querySelector(`.logoModal${id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                fetch(`http://localhost:5000/logo`)
                    .then((res) => res.json())
                    .then((info) => setLogo(info[0]));
            })
            .catch((error) => {
                console.error('Error updating logo:', error);
            });
    };

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setImageFile(selectedFile);

        const previewURL = URL.createObjectURL(selectedFile);
        setImagePreview(previewURL);
    };

    return (
        <div className="col-lg-3 col-md-3 col-6 mb-4">
            <div className="card">
                <div className="card-body p-0">
                    <div className="p-4">
                        <div className="d-flex">
                            <div className="flex-1">
                                <h3 className="mb-3">
                                    <span className="counter_value" data-target={519545}>
                                        Logo Setting
                                    </span>
                                </h3>
                            </div>
                        </div>

                        <button className="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#logoModal${logo._id}`}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>

                        <div className={`modal fade logoModal${logo._id}`} id={`logoModal${logo._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${logo._id}`} aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id={`exampleModalLabelStatus${logo._id}`}>Edit</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="comment-form" onSubmit={(event) => handleEditPayment(event, logo._id)}>
                                            <div className="fadeInUp style-2 text-center">
                                                <div className="main-title"><h3>Update Social Account Information</h3></div>
                                            </div>
                                            <div className="justify-content-center align-items-baseline">
                                                <div className="col-sm">
                                                    <label className="mt-1">Upload Image</label>
                                                    <div className="form-group mb-3">
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                    </div>
                                                    {imagePreview && (
                                                        <img
                                                            src={imagePreview}
                                                            alt="Images"
                                                            style={{ maxWidth: "100px" }}
                                                        />
                                                    )}
                                                    {!imageFile && !imagePreview && logo.logo && (
                                                        <img
                                                            src={logo.logo}
                                                            alt="Stored Images"
                                                            style={{ maxWidth: "100px" }}
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <button className="btn btn-success waves-effect waves-light mt-5" type="submit">
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="visitors_charts" className="apex-charts" dir="ltr" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoSetting;
