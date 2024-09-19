import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/footer";
import { getToken, removeToken } from "../../pages/Auth";
// import './home.css'
import Sidebar from "../sidebar/sidebar";

const Home = (props) => {
    console.log("10", props?.loggedUser?.userData);
    const navigate = useNavigate()
    const handleLogout = () => {
        removeToken()
        navigate('/login')
    };
    const isHide = props?.loggedUser?.userData ? 'none' : 'block'
    return (
        // <div className="home-container">
        //     <Sidebar />
        //     <button className="logout-button" onClick={handleLogout}>Logout</button>
        //     <Header />
        //     <Outlet />
        // </div>
        <>
            <div className="loader" style={{ display: isHide }}></div>
            <div id="app">
                <div className="main-wrapper main-wrapper-1"></div>
                <Header />
                <Sidebar />
                <div className="main-content">
                    <section className="section">
                        <ul className="breadcrumb breadcrumb-style ">
                            <li className="breadcrumb-item">
                                <h4 className="page-title m-b-0">Dashboard</h4>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="index.html">
                                    <i className="fas fa-home"></i></a>
                            </li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ul>
                    </section>
                    <div className="section-body">
                        <Outlet />
                    </div>
                    {/* <div className="settingSidebar">
                    <a href="javascript:void(0)" className="settingPanelToggle"> <i className="fa fa-spin fa-cog"></i>
                    </a>
                    <div className="settingSidebar-body ps-container ps-theme-default">
                        <div className=" fade show active">
                            <div className="setting-panel-header">Setting Panel
                            </div>
                            <div className="p-15 border-bottom">
                                <h6 className="font-medium m-b-10">Select Layout</h6>
                                <div className="selectgroup layout-color w-50">
                                    <label className="selectgroup-item">
                                        <input type="radio" name="value" value="1" className="selectgroup-input-radio select-layout" checked/>
                                            <span className="selectgroup-button">Light</span>
                                    </label>
                                    <label className="selectgroup-item">
                                        <input type="radio" name="value" value="2" className="selectgroup-input-radio select-layout"/>
                                            <span className="selectgroup-button">Dark</span>
                                    </label>
                                </div>
                            </div>
                            <div className="p-15 border-bottom">
                                <h6 className="font-medium m-b-10">Sidebar Color</h6>
                                <div className="selectgroup selectgroup-pills sidebar-color">
                                    <label className="selectgroup-item">
                                        <input type="radio" name="icon-input" value="1" className="selectgroup-input select-sidebar"/>
                                            <span className="selectgroup-button selectgroup-button-icon" data-toggle="tooltip"
                                                data-original-title="Light Sidebar"><i className="fas fa-sun"></i></span>
                                    </label>
                                    <label className="selectgroup-item">
                                        <input type="radio" name="icon-input" value="2" className="selectgroup-input select-sidebar" checked/>
                                            <span className="selectgroup-button selectgroup-button-icon" data-toggle="tooltip"
                                                data-original-title="Dark Sidebar"><i className="fas fa-moon"></i></span>
                                    </label>
                                </div>
                            </div>
                            <div className="p-15 border-bottom">
                                <h6 className="font-medium m-b-10">Color Theme</h6>
                                <div className="theme-setting-options">
                                    <ul class="choose-theme list-unstyled mb-0">
                                        <li title="white" class="active">
                                            <div class="white"></div>
                                        </li>
                                        <li title="cyan">
                                            <div class="cyan"></div>
                                        </li>
                                        <li title="black">
                                            <div class="black"></div>
                                        </li>
                                        <li title="purple">
                                            <div class="purple"></div>
                                        </li>
                                        <li title="orange">
                                            <div class="orange"></div>
                                        </li>
                                        <li title="green">
                                            <div class="green"></div>
                                        </li>
                                        <li title="red">
                                            <div class="red"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="p-15 border-bottom">
                                <div class="theme-setting-options">
                                    <label class="m-b-0">
                                        <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input"
                                            id="mini_sidebar_setting"/>
                                            <span class="custom-switch-indicator"></span>
                                            <span class="control-label p-l-10">Mini Sidebar</span>
                                    </label>
                                </div>
                            </div>
                            <div class="p-15 border-bottom">
                                <div class="theme-setting-options">
                                    <label class="m-b-0">
                                        <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input"
                                            id="sticky_header_setting"/>
                                            <span class="custom-switch-indicator"></span>
                                            <span class="control-label p-l-10">Sticky Header</span>
                                    </label>
                                </div>
                            </div>
                            <div class="mt-4 mb-4 p-3 align-center rt-sidebar-last-ele">
                                <a href="#" class="btn btn-icon icon-left btn-primary btn-restore-theme">
                                    <i class="fas fa-undo"></i> Restore Default
                                </a>
                            </div>
                        </div>
                    </div>
                </div> */}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Home