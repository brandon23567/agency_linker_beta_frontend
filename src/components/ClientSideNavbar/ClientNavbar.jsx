import React from 'react'
import { Link } from "react-router-dom"
import HomeIcon from "../../images/icons/home-page(1).png";
import ClientFilesIcon from "../../images/icons/folder.png";
import ClientRequestsIcon from "../../images/icons/customer-service.png";
import RefreshToken from '../../components/RefreshToken/RefreshToken';
import "./ClientNavbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFolder, faUser } from '@fortawesome/free-solid-svg-icons';

const ClientNavbar = ({ currentUsersUserProfileImg, currentUsersUsername, teamUniqueLink, agencyClientContainerName }) => {
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
                            <Link to={`/client_side/agency_client_home`}>
                                <FontAwesomeIcon icon={faHome} className="nav-icon" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to={`/client_side/agency_client_home/${teamUniqueLink}/${agencyClientContainerName}/clients_folders`} >
                                <FontAwesomeIcon icon={faFolder} className="nav-icon" />
                                Client Folders
                            </Link>
                        </li>
                        <li>
                            <Link to={`/client_side/agency_client_home/${teamUniqueLink}/${agencyClientContainerName}`}>
                                <FontAwesomeIcon icon={faUser} className="nav-icon" />
                                Client Requests
                            </Link>
                        </li>
                        <li>
                            <Link to={`/client_side/agency_client_home/${teamUniqueLink}/${agencyClientContainerName}/client_tasks_page`}>
                                <FontAwesomeIcon icon={faUser} className="nav-icon" />
                                Client Tasks
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
    )
}

export default ClientNavbar