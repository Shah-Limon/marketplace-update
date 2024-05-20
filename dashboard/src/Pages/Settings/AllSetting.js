import React from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from '../../components/Shared/SidebarMenu';
import ContactPageSetting from './ContactPageSetting';
import SocialSetting from './SocialSetting';
import FooterSetting from './FooterSetting';
import MetaSetting from './MetaSetting';
import LogoSetting from './LogoSetting';
import EmailSetting from './EmailSetting';

const AllSetting = () => {
    return (
        <div>
            <SidebarMenu></SidebarMenu>
            <div className="main-content">
                <div className="page-content">
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
                                                            <span>Payment Setting</span>
                                                        </>
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>
                                        <Link to="/admin/setting/paypal">
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
                                                        className="counter_value">
                                                        <>
                                                            <span>Commission Setting</span>
                                                        </>
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>
                                        <Link to="/admin/setting/commission">
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
                                                        data-target={519545}>
                                                        <>
                                                            <span>Homepage Setting</span>
                                                        </>
                                                    </span>
                                                </h3>
                                            </div>
                                        </div>
                                        <Link to="/admin/homepage-setting">
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
                        <LogoSetting></LogoSetting>
                        {/* 
                        <ContactPageSetting></ContactPageSetting>
                        <SocialSetting></SocialSetting>
                        <FooterSetting></FooterSetting>
                        <MetaSetting></MetaSetting> */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllSetting;