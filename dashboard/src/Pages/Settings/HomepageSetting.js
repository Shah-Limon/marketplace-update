import React, { useEffect, useState } from "react";
import SidebarMenu from "../../components/Shared/SidebarMenu";
import { Link, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const HomepageSetting = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);

    const [about, setAbout] = useState({});
    const [banner, setBanner] = useState({});
    const [speciality, SetSpeciality] = useState({});
    const [choose, SetChoose] = useState([]);
    const [road, SetRoad] = useState({});
    const [title, setTitle] = useState([]);
    const [counters, setCounters] = useState([]);
    const [video, setVideo] = useState([]);
    const [cta, setCta] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/about`)
            .then((res) => res.json())
            .then((info) => setAbout(info[0]));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/banner/`)
            .then((res) => res.json())
            .then((info) => setBanner(info[0]));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/speciality/`)
            .then((res) => res.json())
            .then((info) => SetSpeciality(info[0]));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/why-choose/`)
            .then((res) => res.json())
            .then((info) => SetChoose(info));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/road/`)
            .then((res) => res.json())
            .then((info) => SetRoad(info[0]));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/team-title`)
            .then((res) => res.json())
            .then((info) => setTitle(info));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/counters-section`)
            .then((res) => res.json())
            .then((info) => setCounters(info));
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/video-section`)
            .then((res) => res.json())
            .then((info) => setVideo(info));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/faqs-title`)
            .then((res) => res.json())
            .then((info) => setCta(info[0]));
    }, []);


    const handleEditBanner = (event, id) => {
        event.preventDefault();

        const bannerTitle = event.target.bannerTitle.value;
        const bannerPara = event.target.bannerPara.value;
        const bannerText = event.target.bannerText.value;
        const bannerUrl = event.target.bannerUrl.value;
        const bannerBottomLink = event.target.bannerBottomLink.value;
        const bannerBottomLinkText = event.target.bannerBottomLinkText.value;
        const TitleBoxOne = event.target.TitleBoxOne.value;
        const ParaBoxOne = event.target.ParaBoxOne.value;
        const ImageBoxOne = event.target.ImageBoxOne.value;
        const TitleBoxTwo = event.target.TitleBoxTwo.value;
        const ParaBoxTwo = event.target.ParaBoxTwo.value;
        const ImageBoxTwo = event.target.ImageBoxTwo.value;
        const TitleBoxThree = event.target.TitleBoxThree.value;
        const ParaBoxThree = event.target.ParaBoxThree.value;
        const ImageBoxThree = event.target.ImageBoxThree.value;

        const edit = {
            bannerTitle,
            bannerPara,
            bannerText,
            bannerUrl,
            bannerBottomLink,
            bannerBottomLinkText,
            TitleBoxOne,
            ParaBoxOne,
            ImageBoxOne,
            TitleBoxTwo,
            ParaBoxTwo,
            ImageBoxTwo,
            TitleBoxThree,
            ParaBoxThree,
            ImageBoxThree,
        };

        const url = `http://localhost:5000/edit-banner/${id}`;
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
                fetch(`http://localhost:5000/banner`)
                    .then((res) => res.json())
                    .then((info) => setAbout(info));
                const modal = document.querySelector(`.EditBanner${banner._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
            })
            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    const handleEditAbout = (event, id) => {
        event.preventDefault();

        const imgOne = event.target.imgOne.value;
        const imgTwo = event.target.imgTwo.value;
        const titleTop = event.target.titleTop.value;
        const title = event.target.title.value;
        const subText = event.target.subText.value;
        const btnText = event.target.btnText.value;
        const btnUrl = event.target.btnUrl.value;
        const pointOne = event.target.pointOne.value;
        const pointTwo = event.target.pointTwo.value;
        const pointThree = event.target.pointThree.value;

        const edit = {
            imgOne,
            imgTwo,
            titleTop,
            title,
            subText,
            btnText,
            btnUrl,
            pointOne,
            pointTwo,
            pointThree,
        };

        const url = `http://localhost:5000/edit-about/${id}`;
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
                fetch(`http://localhost:5000/about`)
                    .then((res) => res.json())
                    .then((info) => setAbout(info));
                const modal = document.querySelector(`.EditAbout${about._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
            })

            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };
    const handleEditSpeciality = (event, id) => {
        event.preventDefault();

        const titleTop = event.target.titleTop.value;
        const title = event.target.title.value;
        const description = event.target.description.value;
        const imageOne = event.target.imageOne.value;
        const imageTwo = event.target.imageTwo.value;
        const itemOne = event.target.itemOne.value;
        const itemTwo = event.target.itemTwo.value;
        const itemThree = event.target.itemThree.value;
        const itemFour = event.target.itemFour.value;

        const edit = {
            titleTop,
            title,
            description,
            imageOne,
            imageTwo,
            itemOne,
            itemTwo,
            itemThree,
            itemFour,
        };

        const url = `http://localhost:5000/edit-speciality/${id}`;
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
                fetch(`http://localhost:5000/speciality`)
                    .then((res) => res.json())
                    .then((info) => setAbout(info));
                const modal = document.querySelector(`.EditSpeciality${speciality._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
            })

            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };

    const handleEditCTA = (event, id) => {
        event.preventDefault();
        const titleTopText = event.target.titleTopText.value;
        const titleOne = event.target.titleOne.value;
        const titleTwo = event.target.titleTwo.value;

        const edit = {
            titleTopText,
            titleOne,
            titleTwo,
        };

        const url = `http://localhost:5000/faq-title/${id}`;
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

                const modal = document.querySelector(`.EditCTA${cta._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                fetch(`http://localhost:5000/faqs-title`)
                    .then((res) => res.json())
                    .then((info) => setCta(info));
            })

            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };
    const handleEditWorking = (event, id) => {
        event.preventDefault();
        const titleTop = event.target.titleTop.value;
        const title = event.target.title.value;
        const cardTitleOne = event.target.cardTitleOne.value;
        const descriptionOne = event.target.descriptionOne.value;
        const cardTitleTwo = event.target.cardTitleTwo.value;
        const descriptionTwo = event.target.descriptionOne.value;
        const cardTitleThree = event.target.cardTitleThree.value;
        const descriptionThree = event.target.descriptionThree.value;
        const cardTitleFour = event.target.cardTitleFour.value;
        const descriptionFour = event.target.descriptionFour.value;

        const edit = {
            titleTop,
            title,
            cardTitleOne,
            descriptionOne,
            cardTitleTwo,
            descriptionTwo,
            cardTitleThree,
            descriptionThree,
            cardTitleFour,
            descriptionFour,
        };

        const url = `http://localhost:5000/edit-road/${id}`;
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

                const modal = document.querySelector(`.EditWorking${cta._id}`);
                if (modal) {
                    modal.classList.remove('show');
                }

                const modalBackdrop = document.querySelector('.modal-backdrop');
                if (modalBackdrop) {
                    modalBackdrop.parentNode.removeChild(modalBackdrop);
                }
                fetch(`http://localhost:5000/road`)
                    .then((res) => res.json())
                    .then((info) => SetRoad(info));
            })

            .catch((error) => {
                console.error('Error creating service:', error);
            });
    };




    return (
        <>
            <SidebarMenu></SidebarMenu>
            <div className="main-content">
                <div className="page-content">
                    <div className="helpful pt-130 box-messages">
                        <div className="themesflat-container">
                            <div className="row">
                            
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
                                                                    <span>Banner Options</span>
                                                                </>
                                                            </span>
                                                        </h3>
                                                    </div>

                                                </div>
                                                <h5 className="text-muted font-size-14 mb-0">
                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#EditBanner${banner._id}`}>
                                                        <i class="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <div className={`modal fade EditBanner${banner._id}`} id={`EditBanner${banner._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${banner._id}`} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${banner._id}`}>Edit</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form className="comment-form" onSubmit={(event) => handleEditBanner(event, banner._id)}>
                                                                        <div className="fadeInUp style-2 text-center">
                                                                            <div className="main-title"><h3>Edit Banner</h3></div>
                                                                        </div>
                                                                        <div class="justify-content-center align-items-baseline">
                                                                            <div class="col-sm">
                                                                                <label className="mt-1">Banner Heading Title</label>
                                                                                <div class="form-group mb-3">
                                                                                    <textarea
                                                                                        type="text"
                                                                                        class="form-control"
                                                                                        placeholder="Banner Heading Title"
                                                                                        name="bannerTitle"
                                                                                        defaultValue={banner.bannerTitle}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-sm">
                                                                                <label className="mt-1">Enter Banner Paragraph</label>
                                                                                <div class="form-group mb-3">
                                                                                    <fieldset>
                                                                                        <textarea
                                                                                            type="text"
                                                                                            class="form-control"
                                                                                            placeholder="Enter Banner Paragraph"
                                                                                            name="bannerPara"
                                                                                            defaultValue={banner.bannerPara}
                                                                                        />
                                                                                    </fieldset>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-sm">
                                                                                <label className="mt-1">Enter Banner Button Text</label>{" "}

                                                                                <div class="form-group mb-3">
                                                                                    <textarea
                                                                                        type="text"
                                                                                        class="form-control"
                                                                                        placeholder="Enter Banner Button Text"
                                                                                        name="bannerText"
                                                                                        defaultValue={banner.bannerText}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-sm">
                                                                                <label className="mt-1">Enter Banner Button URL</label>{" "}

                                                                                <div class="form-group mb-3">
                                                                                    <textarea
                                                                                        type="text"
                                                                                        class="form-control"
                                                                                        placeholder="Enter Banner Button URL"
                                                                                        name="bannerUrl"
                                                                                        defaultValue={banner.bannerUrl}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-deck mt-5">
                                                                                <div className="card">
                                                                                    <div className="card-body m-5">

                                                                                        <div className="row">
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Banner Bottom LinK</label>{" "}

                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="bannerBottomLink"
                                                                                                    defaultValue={banner.bannerBottomLink}
                                                                                                    className="form-control"
                                                                                                    placeholder="Banner Bottom LinK"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Banner Bottom LinK Text</label>{" "}

                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="bannerBottomLinkText"
                                                                                                    defaultValue={banner.bannerBottomLinkText}
                                                                                                    className="form-control"
                                                                                                    placeholder="Banner Bottom LinK Text"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-deck mt-5">
                                                                                <div className="card">
                                                                                    <div className="card-body">
                                                                                        <h5 className="card-title">Card One</h5>
                                                                                        <div className="row">
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Enter Box Banner Title</label>{" "}
                                                                                                <textarea
                                                                                                    type="text"
                                                                                                    name="TitleBoxOne"
                                                                                                    defaultValue={banner.TitleBoxOne}
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Banner Title"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">
                                                                                                    Enter Box Banner Paragraph
                                                                                                </label>{" "}
                                                                                                <textarea
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Box Banner Paragraph"
                                                                                                    name="ParaBoxOne"
                                                                                                    defaultValue={banner.ParaBoxOne}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Enter Box Banner Image</label>{" "}

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Box Banner Image"
                                                                                                    name="ImageBoxOne"
                                                                                                    defaultValue={banner.ImageBoxOne}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-deck mt-5">
                                                                                <div className="card">
                                                                                    <div className="card-body m-5">
                                                                                        <h5 className="card-title">Card Two</h5>
                                                                                        <div className="row">
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Enter Box Banner Title</label>{" "}
                                                                                                <textarea
                                                                                                    type="text"
                                                                                                    name="TitleBoxTwo"
                                                                                                    defaultValue={banner.TitleBoxTwo}
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Banner Title"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">
                                                                                                    Enter Box Banner Paragraph
                                                                                                </label>{" "}
                                                                                                <textarea
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Box Banner Paragraph"
                                                                                                    name="ParaBoxTwo"
                                                                                                    defaultValue={banner.ParaBoxTwo}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Enter Box Banner Image</label>{" "}

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Box Banner Image"
                                                                                                    name="ImageBoxTwo"
                                                                                                    defaultValue={banner.ImageBoxTwo}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-deck mt-5">
                                                                                <div className="card">
                                                                                    <div className="card-body m-5">
                                                                                        <h5 className="card-title">Card Three</h5>
                                                                                        <div className="row">
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Enter Box Banner Title</label>{" "}

                                                                                                <textarea
                                                                                                    type="text"
                                                                                                    name="TitleBoxThree"
                                                                                                    defaultValue={banner.TitleBoxThree}
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Banner Title"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">
                                                                                                    Enter Box Banner Paragraph
                                                                                                </label>{" "}

                                                                                                <textarea
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Box Banner Paragraph"
                                                                                                    name="ParaBoxThree"
                                                                                                    defaultValue={banner.ParaBoxThree}
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Enter Box Banner Image</label>{" "}

                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="form-control"
                                                                                                    placeholder="Enter Box Banner Image"
                                                                                                    name="ImageBoxThree"
                                                                                                    defaultValue={banner.ImageBoxThree}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
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
                                                </h5>
                                            </div>
                                            <div>
                                                <div
                                                    id="visitors_charts"
                                                    className="apex-charts"
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>
                                        {/* end cardbody */}
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-6 mb-4">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="p-4">
                                                <div className="d-flex">
                                                    <div className="flex-1">
                                                        <h3 className="mb-3">
                                                            <span
                                                                className="counter_value"
                                                                data-target={519545}
                                                            >
                                                                <>
                                                                    <span>About Option</span>
                                                                </>

                                                            </span>
                                                        </h3>
                                                    </div>

                                                </div>
                                                <h5 className="text-muted font-size-14 mb-0">
                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#EditAbout${about._id}`}>
                                                        <i class="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <div className={`modal fade EditAbout${about._id}`} id={`EditAbout${about._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${about._id}`} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${about._id}`}>Edit</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form className="comment-form" onSubmit={(event) => handleEditAbout(event, about._id)}>
                                                                        <div className="fadeInUp style-2 text-center">
                                                                            <div className="main-title"><h3>Edit About</h3></div>
                                                                        </div>
                                                                        <div className="columns  gap20">
                                                                            <div class="justify-content-center align-items-baseline">
                                                                                <div class="col-sm">
                                                                                    <label className="mt-1">Banner Image URL One</label>
                                                                                    <div class="form-group mb-3">
                                                                                        <input
                                                                                            type="text"
                                                                                            name="imgOne"
                                                                                            class="form-control"
                                                                                            placeholder="Enter The About Image URL"
                                                                                            defaultValue={about.imgOne}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col-sm">
                                                                                    <label className="mt-1">Banner Image URL Two</label>
                                                                                    <div class="form-group mb-3">
                                                                                        <input
                                                                                            type="text"
                                                                                            name="imgTwo"
                                                                                            class="form-control"
                                                                                            placeholder="Enter The About Image URL"
                                                                                            defaultValue={about.imgTwo}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm">
                                                                                    <label className="mt-1">Banner Title Top Text</label>
                                                                                    <div class="form-group mb-3">
                                                                                        <input
                                                                                            type="text"
                                                                                            class="form-control"
                                                                                            placeholder="Banner Title Top Text"
                                                                                            name="titleTop"
                                                                                            defaultValue={about.titleTop}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col-sm">
                                                                                    <label className="mt-1">Banner Title</label>
                                                                                    <div class="form-group mb-3">
                                                                                        <input
                                                                                            type="text"
                                                                                            class="form-control"
                                                                                            placeholder="Banner Title"
                                                                                            name="title"
                                                                                            defaultValue={about.title}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col-sm">
                                                                                    <label className="mt-1">Banner About Text</label>
                                                                                    <div class="form-group mb-3">
                                                                                        <textarea
                                                                                            type="text"
                                                                                            class="form-control"
                                                                                            placeholder="Your Sub Text"
                                                                                            name="subText"
                                                                                            defaultValue={about.subText}
                                                                                            style={{ fontSize: "16px" }}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div class="col-sm">
                                                                                    <label className="mt-1">Banner Button Text</label>
                                                                                    <div class="form-group mb-3">
                                                                                        <input
                                                                                            type="text"
                                                                                            class="form-control"
                                                                                            placeholder="Your Button Text"
                                                                                            name="btnText"
                                                                                            defaultValue={about.btnText}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm">
                                                                                    <label className="mt-1">Banner Button URL</label>
                                                                                    <div class="form-group mb-3">
                                                                                        <input
                                                                                            type="text"
                                                                                            class="form-control"
                                                                                            placeholder="Your Button URL"
                                                                                            name="btnUrl"
                                                                                            defaultValue={about.btnUrl}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="card-deck mt-5 mb-5">
                                                                                    <div className="card">
                                                                                        <div className="card-body m-5">
                                                                                            <h5 className="card-title">About Points</h5>
                                                                                            <div className="row">
                                                                                                <div className="col-12">
                                                                                                    <label className="mt-1">Point One</label>
                                                                                                    <textarea
                                                                                                        type="text"
                                                                                                        name="pointOne"
                                                                                                        defaultValue={about.pointOne}
                                                                                                        className="form-control"
                                                                                                        placeholder="Point One"
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="col-12">
                                                                                                    <label className="mt-1">Point Two</label>
                                                                                                    <textarea
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        placeholder=" Point Two"
                                                                                                        name="pointTwo"
                                                                                                        defaultValue={about.pointTwo}
                                                                                                    />
                                                                                                </div>
                                                                                                <div className="col-12">
                                                                                                    <label className="mt-1">Point Three</label>
                                                                                                    <textarea
                                                                                                        type="text"
                                                                                                        className="form-control"
                                                                                                        placeholder="Enter Box Banner Image"
                                                                                                        name="pointThree"
                                                                                                        defaultValue={about.pointThree}
                                                                                                    />
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
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
                                                </h5>
                                            </div>
                                            <div>
                                                <div
                                                    id="visitors_charts"
                                                    className="apex-charts"
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>
                                        {/* end cardbody */}
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-3 col-6 mb-4">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="p-4">
                                                <div className="d-flex">
                                                    <div className="flex-1">
                                                        <h3 className="mb-3">
                                                            <span
                                                                className="counter_value"
                                                                data-target={519545}
                                                            >
                                                                <>
                                                                    <span>Speciality Option</span>
                                                                </>

                                                            </span>
                                                        </h3>
                                                    </div>

                                                </div>
                                                <h5 className="text-muted font-size-14 mb-0">
                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#EditSpeciality${speciality._id}`}>
                                                        <i class="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <div className={`modal fade EditSpeciality${speciality._id}`} id={`EditSpeciality${speciality._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${speciality._id}`} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${speciality._id}`}>Edit</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form className="comment-form" onSubmit={(event) => handleEditSpeciality(event, speciality._id)}>
                                                                        <div className="fadeInUp style-2 text-center">
                                                                            <div className="main-title"><h3>Edit Speciality</h3></div>
                                                                        </div>
                                                                        <div className="columns  gap20">

                                                                            <div className="columns  gap20">
                                                                                <fieldset className="name ">
                                                                                    <label className="mb-2">Title Top Text</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        placeholder="Title Top Text"
                                                                                        className="mb-20 form-control"
                                                                                        name="titleTop"
                                                                                        defaultValue={speciality.titleTop}
                                                                                    />
                                                                                </fieldset>
                                                                                <fieldset className="email">
                                                                                    <label className="mb-2">Title Text</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        placeholder="Enter Title"
                                                                                        className="mb-20 form-control"
                                                                                        name="title"
                                                                                        defaultValue={speciality.title}
                                                                                    />
                                                                                </fieldset>
                                                                            </div>
                                                                            <div className="columns ">
                                                                                <fieldset className="website">
                                                                                    <label className="mb-2">Enter Description</label>
                                                                                    <textarea
                                                                                        name="description"
                                                                                        rows={4}
                                                                                        placeholder="Enter Description"
                                                                                        className="mb-20 form-control"
                                                                                        defaultValue={speciality.description}
                                                                                    />
                                                                                </fieldset>
                                                                            </div>
                                                                            <fieldset className="email">
                                                                                <label className="mb-2">Image One URL</label>
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder="Enter URL"
                                                                                    className="mb-20 form-control"
                                                                                    name="imageOne"
                                                                                    defaultValue={speciality.imageOne}
                                                                                />
                                                                            </fieldset>

                                                                            <fieldset className="email">
                                                                                <label className="mb-2">Image Two URL</label>
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder="Enter URL"
                                                                                    className="mb-20 form-control"
                                                                                    name="imageTwo"
                                                                                    defaultValue={speciality.imageTwo}
                                                                                />
                                                                            </fieldset>

                                                                            <div className="card-deck mt-5">
                                                                                <div className="card">
                                                                                    <div className="card-body m-5">
                                                                                        <h5 className="card-title">Enter List Item</h5>
                                                                                        <div className="row">
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Item One</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="itemOne"
                                                                                                    defaultValue={speciality.itemOne}
                                                                                                    className="form-control"
                                                                                                    placeholder=" Item One"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Item Two</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="itemTwo"
                                                                                                    defaultValue={speciality.itemTwo}
                                                                                                    className="form-control"
                                                                                                    placeholder="Item Two"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Item Three</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="itemThree"
                                                                                                    defaultValue={speciality.itemThree}
                                                                                                    className="form-control"
                                                                                                    placeholder=" Item Three"
                                                                                                />
                                                                                            </div>
                                                                                            <div className="col-12">
                                                                                                <label className="mt-1">Item Four</label>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    name="itemFour"
                                                                                                    defaultValue={speciality.itemFour}
                                                                                                    className="form-control"
                                                                                                    placeholder="Item Four"
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
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
                                                </h5>
                                            </div>
                                            <div>
                                                <div
                                                    id="visitors_charts"
                                                    className="apex-charts"
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>
                                        {/* end cardbody */}
                                    </div>
                                </div>

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
                                                                    <span>Why choose Option</span>
                                                                </>
                                                            </span>
                                                        </h3>
                                                    </div>
                                                </div>
                                                <Link to="/setting/why-choose-option">
                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button">
                                                        <i class="fas fa-pencil-alt"></i>
                                                    </button>
                                                </Link>
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
                                <div className="col-lg-3 col-md-3 col-6 mb-4">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="p-4">
                                                <div className="d-flex">
                                                    <div className="flex-1">
                                                        <h3 className="mb-3">
                                                            <span
                                                                className="counter_value"
                                                                data-target={519545}
                                                            >
                                                                <>
                                                                    <span>Working Process Option</span>
                                                                </>

                                                            </span>
                                                        </h3>
                                                    </div>

                                                </div>
                                                <h5 className="text-muted font-size-14 mb-0">
                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button" data-bs-toggle="modal" data-bs-target={`#EditWorking${road._id}`}>
                                                        <i class="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <div className={`modal fade EditWorking${road._id}`} id={`EditWorking${road._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabelStatus${road._id}`} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id={`exampleModalLabelStatus${road._id}`}>Edit</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form className="comment-form" onSubmit={(event) => handleEditWorking(event, road._id)}>
                                                                        <div className="columns  gap20">
                                                                            <fieldset className="name ">
                                                                                <label className="mb-2">Title Top Text</label>
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder="Title Top Text"
                                                                                    className="mb-20 form-control"
                                                                                    name="titleTop"
                                                                                    defaultValue={road.titleTop}
                                                                                />
                                                                            </fieldset>
                                                                            <fieldset className="email">
                                                                                <label className="mb-2">Title Text</label>
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder="Enter Title"
                                                                                    className="mb-20 form-control"
                                                                                    name="title"
                                                                                    defaultValue={road.title}
                                                                                />
                                                                            </fieldset>
                                                                        </div>

                                                                        <div className="card-deck mt-5">
                                                                            <div className="card">
                                                                                <div className="card-body m-5">
                                                                                    <h5 className="card-title">Card One</h5>
                                                                                    <div className="row">
                                                                                        <div className="col-12">
                                                                                            <div className="columns ">
                                                                                                <fieldset className="email">
                                                                                                    <label className="mb-2">Title Text</label>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        placeholder="Enter Title"
                                                                                                        className="mb-20 form-control"
                                                                                                        name="cardTitleOne"
                                                                                                        defaultValue={road.cardTitleOne}
                                                                                                    />
                                                                                                </fieldset>
                                                                                                <fieldset className="website">
                                                                                                    <label className="mb-2">
                                                                                                        Enter Description
                                                                                                    </label>
                                                                                                    <textarea
                                                                                                        name="descriptionOne"
                                                                                                        rows={4}
                                                                                                        placeholder="Enter Description"
                                                                                                        className="mb-20 form-control"
                                                                                                        defaultValue={road.descriptionOne}
                                                                                                    />
                                                                                                </fieldset>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="card-deck mt-5">
                                                                            <div className="card">
                                                                                <div className="card-body m-5">
                                                                                    <h5 className="card-title">Card Two</h5>
                                                                                    <div className="row">
                                                                                        <div className="col-12">
                                                                                            <div className="columns ">
                                                                                                <fieldset className="email">
                                                                                                    <label className="mb-2">Title Text</label>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        placeholder="Enter Title"
                                                                                                        className="mb-20 form-control"
                                                                                                        name="cardTitleTwo"
                                                                                                        defaultValue={road.cardTitleTwo}
                                                                                                    />
                                                                                                </fieldset>
                                                                                                <fieldset className="website">
                                                                                                    <label className="mb-2">
                                                                                                        Enter Description
                                                                                                    </label>
                                                                                                    <textarea
                                                                                                        name="descriptionTwo"
                                                                                                        rows={4}
                                                                                                        placeholder="Enter Description"
                                                                                                        className="mb-20 form-control"
                                                                                                        defaultValue={road.descriptionTwo}
                                                                                                    />
                                                                                                </fieldset>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="card-deck mt-5">
                                                                            <div className="card">
                                                                                <div className="card-body m-5">
                                                                                    <h5 className="card-title">Card Three</h5>
                                                                                    <div className="row">
                                                                                        <div className="col-12">
                                                                                            <div className="columns ">
                                                                                                <fieldset className="email">
                                                                                                    <label className="mb-2">Title Text</label>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        placeholder="Enter Title"
                                                                                                        className="mb-20 form-control"
                                                                                                        name="cardTitleThree"
                                                                                                        defaultValue={road.cardTitleThree}
                                                                                                    />
                                                                                                </fieldset>
                                                                                                <fieldset className="website">
                                                                                                    <label className="mb-2">
                                                                                                        Enter Description
                                                                                                    </label>
                                                                                                    <textarea
                                                                                                        name="descriptionThree"
                                                                                                        rows={4}
                                                                                                        placeholder="Enter Description"
                                                                                                        className="mb-20 form-control"
                                                                                                        defaultValue={road.descriptionThree}
                                                                                                    />
                                                                                                </fieldset>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="card-deck mt-5">
                                                                            <div className="card">
                                                                                <div className="card-body m-5">
                                                                                    <h5 className="card-title">Card Four</h5>
                                                                                    <div className="row">
                                                                                        <div className="col-12">
                                                                                            <div className="columns ">
                                                                                                <fieldset className="email">
                                                                                                    <label className="mb-2">Title Text</label>
                                                                                                    <input
                                                                                                        type="text"
                                                                                                        placeholder="Enter Title"
                                                                                                        className="mb-20 form-control"
                                                                                                        name="cardTitleFour"
                                                                                                        defaultValue={road.cardTitleFour}
                                                                                                    />
                                                                                                </fieldset>
                                                                                                <fieldset className="website">
                                                                                                    <label className="mb-2">
                                                                                                        Enter Description
                                                                                                    </label>
                                                                                                    <textarea
                                                                                                        name="descriptionFour"
                                                                                                        rows={4}
                                                                                                        placeholder="Enter Description"
                                                                                                        className="mb-20 form-control"
                                                                                                        defaultValue={road.descriptionFour}
                                                                                                    />
                                                                                                </fieldset>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
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
                                                </h5>
                                            </div>
                                            <div>
                                                <div
                                                    id="visitors_charts"
                                                    className="apex-charts"
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>
                                        {/* end cardbody */}
                                    </div>
                                </div>
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
                                                                    <span>Testimonials Option</span>
                                                                </>
                                                            </span>
                                                        </h3>
                                                    </div>
                                                </div>
                                                <Link to="/setting/testimonials-option">
                                                    <button class="btn btn-outline-secondary btn-sm edit" title="Edit" type="button">
                                                        <i class="fas fa-pencil-alt"></i>
                                                    </button>
                                                </Link>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    );
};

export default HomepageSetting;
