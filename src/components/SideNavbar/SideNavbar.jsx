import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFolder, faUser, faCog, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import "./SideNavbar.css";
import RefreshToken from '../../components/RefreshToken/RefreshToken';

const SideNavbar = ({ currentUsersUserProfileImg, currentUsersUsername, teamUniqueLink, clientName }) => {
    return (
        <div className='main_outer_sidenavbar_container'>
            <RefreshToken />
            <div className='container'>
                <div className="sidebar">
                    <div className="logo">
                        <Link to={`/`} className='home_link'>AgencyLinker</Link>
                    </div>
                    <ul className="nav">
                        <li>
                            <Link to={`/agency_teams`}>
                                <FontAwesomeIcon icon={faHome} className="nav-icon" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to={`/agency_teams/agency_home/${teamUniqueLink}/agency_home/${clientName}/client_folders`} >
                                <FontAwesomeIcon icon={faFolder} className="nav-icon" />
                                Client Folders
                            </Link>
                        </li>
                        <li>
                            <Link to={`/agency_teams/agency_home/${teamUniqueLink}/agency_home/${clientName}/client_requests`}>
                                <FontAwesomeIcon icon={faUser} className="nav-icon" />
                                Client Requests
                            </Link>
                        </li>
                        <li>
                            <Link to={`/agency_teams/${teamUniqueLink}/agency_home/team_members`} >
                                <FontAwesomeIcon icon={faUser} className="nav-icon" />
                                Team Members
                            </Link>
                        </li>
                        {/* <li>
                            <Link to={`/`}>
                                <FontAwesomeIcon icon={faQuestionCircle} className="nav-icon" />
                                Help
                            </Link>
                        </li> */}
                        <li>
                            <Link to={`/`}>
                                <FontAwesomeIcon icon={faCog} className="nav-icon" />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidenavbar_top_navbar_container">
                    <div className="top_navbar_search_container">
                        <input type="text" placeholder="Search for something here....." />
                    </div>
                    <div className="top_navbar_current_user_container">
                        <div className="current_user_leftside">
                            <img src={currentUsersUserProfileImg} className="current_user_img" alt="current_user_img" />
                        </div>
                        <div className="current_user_rightside">
                            <h4>
                                <Link to={`/`} className='username_link'>
                                    @{currentUsersUsername}
                                </Link>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavbar;
