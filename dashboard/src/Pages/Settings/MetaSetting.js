import axios from "axios";
import React, { useEffect, useState } from "react";

const MetaSetting = () => {
    const [meta, setMeta] = useState({});

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imgbbApiKey] = useState("10264a0f98f874dc2ba381be1fe2e76d");

    useEffect(() => {
        fetch(`http://localhost:5000/meta-infomations`)
            .then((res) => res.json())
            .then((info) => setMeta(info[0]));
    }, []);



    const handleEditPayment = async (event, id) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;

        let img = null;

        if (meta.length > 0 && meta[0].img) {
            img = meta[0].img;
        }

        // Determine if an image is being uploaded or if a stored image link should be used
        img = imageFile ? imagePreview : img;

        // If an image is being uploaded, send it to imgbb
        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append("image", imageFile);
                formData.append("key", imgbbApiKey);

                const imgbbResponse = await axios.post(
                    "https://api.imgbb.com/1/upload",
                    formData
                );

                img = imgbbResponse.data.data.url;
            } catch (error) {
                console.error("Image upload to imgbb failed:", error);
                return; // Don't proceed if image upload fails
            }
        }


        const edit = {
            title,
            description,
            img,
        };
        const url = `http://localhost:5000/meta-infomation/${meta._id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(edit),
        })
            .then((res) => res.json())
            .then((result) => {
                event.target.reset();
                const modal = document.querySelector(`.metaModal${meta._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                // Fetch the updated list of services
                fetch(`http://localhost:5000/footer-meta`)
                    .then((res) => res.json())
                    .then((info) => setMeta(info[0]));
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setImageFile(selectedFile);

        const previewURL = URL.createObjectURL(selectedFile);
        setImagePreview(previewURL);
    };

    return (
        <>
            <>
                <div className="col-lg-3 col-md-3 col-6 mb-4">
                    <div className="card">
                        <div className="card-body p-0">
                            <div className="p-4">
                                <div className="d-flex">
                                    <div className="flex-1">
                                        <h3 className="mb-3">
                                            <span
                                                className="counter_value"
                                                data-target={519545}>
                                                <>
                                                    <span>Meta Setting</span>
                                                </>
                                            </span>
                                        </h3>
                                    </div>
                                </div>


                                <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#metaModal${meta._id}`}>
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <div className={`modal fade metaModal${meta._id}`} id={`metaModal${meta._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${meta._id}`} aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`exampleModalLabelStatus${meta._id}`}>Edit</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form className="comment-form" onSubmit={(event) => handleEditPayment(event, meta._id)}>
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
                                                            {!imageFile && !imagePreview && meta.img && (
                                                                <img
                                                                    src={meta.img}
                                                                    alt="Stored Images"
                                                                    style={{ maxWidth: "100px" }}
                                                                />
                                                            )}
                                                        </div>

                                                        <div class="col-sm">
                                                            <label className="mt-1">Edit Meta Title</label>
                                                            <div class="form-group mb-3">
                                                                <textarea
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Edit Meta Title"
                                                                    name="title"
                                                                    defaultValue={meta.title}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm">
                                                            <label className="mt-1">Edit Meta description</label>
                                                            <div class="form-group mb-3">
                                                                <textarea
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Edit Meta description"
                                                                    name="description"
                                                                    defaultValue={meta.description}
                                                                />
                                                            </div>
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
                                <div
                                    id="visitors_charts"
                                    className="apex-charts"
                                    dir="ltr"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default MetaSetting;
