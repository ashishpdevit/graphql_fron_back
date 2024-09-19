// Sidebar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserName, removeToken } from '../../pages/Auth';
// import './sidebar.css';
import logo from '../../logo.svg';

import { Context } from '../../pages/ProtectedRoute';
import { useQuery } from '@apollo/client';

const Sidebar = () => {
    const loggedUsername = getUserName();
    console.log(loggedUsername);
    // const currentUser = useQuery(GET_USER, {
    //     variables: { id },
    // });
    // State to keep track of open submenu items
    const [openSubmenu, setOpenSubmenu] = useState('');
   
    // Function to toggle the submenu visibility
    const toggleSubmenu = (parent) => {
        setOpenSubmenu(openSubmenu === parent ? '' : parent);
    };
    // const navigate = useNavigate()

    // const handleLogout = () => {
    //     removeToken();
    //     navigate('/login');
    // };

    return (
        // <div className="sidebar">
        //     {/* Sidebar content goes here */}
        //     <div className="logo">
        //         <img src={logo} alt="Logo" />
        //         <h1>GraphQL CRUD Demo</h1>
        //     </div>
        //     {/* <nav>
        //         <ul className="nav-menu">
        //             <li>
        //                 <Link to="/users">Users</Link>
        //             </li>
        //             <li>
        //                 <Link to="/add-user">Add User</Link>
        //             </li>
        //         </ul>
        //     </nav> */}
        //     <ul className="menu">
        //         {/* <li><a href="#">Parent 1</a></li> */}
        //         <li className={openSubmenu === 'parent2' ? 'active' : ''}>
        //             <a href="#" onClick={() => toggleSubmenu('parent2')}>Users</a>
        //             <ul className={`submenu ${openSubmenu === 'parent2' ? 'open' : ''}`}>
        //                 <li><Link to="/users">User</Link></li>
        //                 <li><Link to="/add-user">Add User</Link></li>
        //             </ul>
        //         </li>
        //         <li><Link to="/roles">Role</Link></li>
        //         <li><Link to="/modules">Module</Link></li>
        //         <li><Link to="/rights">Right</Link></li>

        //     </ul>
        //     {/* <button className="logout-button" onClick={handleLogout}>Logout</button> */}
        // </div>
        <div className="main-sidebar sidebar-style-2">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <a href="#!"> <img alt="image" src="assets/img/logo.png" className="header-logo" /> <span
                        className="logo-name">GraphQL/React</span>
                    </a>
                </div>
                <div className="sidebar-user">
                    <div className="sidebar-user-picture">
                        <img alt="image" src="assets/img/user-8.png" />
                    </div>
                    <div className="sidebar-user-details">
                        <div className="user-name">{loggedUsername}</div>
                        {/* <div className="user-role">Administrator</div> */}
                    </div>
                </div>
                <ul className="sidebar-menu">

                    {/* <li className="active">
                        <a href="index.html" className="nav-link"><i
                            data-feather="monitor"></i><span>Dashboard</span></a>
                    </li> */}
                    {/* <li className="dropdown">
                        <Link to="/users" className="menu-toggle nav-link has-dropdown"><i data-feather="file"></i><span>User</span></Link>
                        <ul className="dropdown-menu">
                            <li><Link className="nav-link active" to="/users">User</Link></li>
                            <li><Link className="nav-link" to="/add-user">Add User</Link></li>
                        </ul>
                    </li> */}
                    {/* <li>
                        <a href="#!" className="nav-link"><i data-feather="file"></i><span>E-Filing</span></a>
                    </li> */}
                    <li className=""><Link className="nav-link" to="/users"><i data-feather="file"></i><span>Users</span></Link></li>
                    <li className=""><Link className="nav-link" to="/add-user"><i data-feather="file"></i><span>Add User</span></Link></li>
                    <li className=""><Link className="nav-link" to="/modules"><i data-feather="file"></i><span>Module</span></Link></li>
                    <li className=""><Link className="nav-link" to="/rights"><i data-feather="file"></i><span>Right</span></Link></li>
                    <li className=""><Link className="nav-link" to="/roles"><i data-feather="file"></i><span>Role</span></Link></li>

                    {/* <li>
                        <a href="#!" className="nav-link"><i data-feather="file"></i><span>NCLT & ROC</span></a>
                    </li>
                    <li>
                        <a href="#!" className="nav-link"><i data-feather="file"></i><span>Refund</span></a>
                    </li>
                    <li className="dropdown">
                        <a href="#!" className="menu-toggle nav-link has-dropdown"><i data-feather="file"></i><span>Audit Module/ (SRO&DC)</span></a>
                        <ul className="dropdown-menu">
                            <li><a className="nav-link" href="#!">Audit Para</a></li>
                            <li><a className="nav-link" href="#!">Open Plot Sale Transactions</a></li>
                            <li><a className="nav-link" href="#!">Aigr/IR Diary</a></li>
                            <li><a className="nav-link" href="#!">Aigr/IR Inspection of SRO</a></li>
                            <li><a className="nav-link" href="#!">SRO/DC offices audit by HO</a></li>
                            <li><a className="nav-link" href="#!">SRO/DC office audit by AG</a></li>
                            <li><a className="nav-link" href="#!">Aigr/IR review meeting</a></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a href="#!" className="menu-toggle nav-link has-dropdown"><i data-feather="file"></i><span>Franking/E-stamp</span></a>
                        <ul className="dropdown-menu">
                            <li><a className="nav-link" href="#!">Franking stamp /E-stamp</a></li>
                            <li><a className="nav-link" href="#!">Get E-Stamp Details</a></li>

                        </ul>
                    </li>
                    <li><a className="nav-link" href="#!"><i data-feather="file"></i><span>A.G.AUDIT</span></a></li>
                    <li><a className="nav-link" href="#!"><i data-feather="briefcase"></i><span>Office Establishment</span></a></li> */}
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
