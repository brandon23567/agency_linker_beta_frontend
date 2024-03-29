import React from 'react'
import { Link } from "react-router-dom"
import HomeIcon from "../../images/icons/home-page(1).png";
import ClientFilesIcon from "../../images/icons/folder.png";
import ClientRequestsIcon from "../../images/icons/customer-service.png";
import "./ClientNavbar.css"

const ClientNavbar = ({ currentUsersUserProfileImg, currentUsersUsername }) => {
    return (
        <div className='main_outer_sidenavbar_container'>
            <div className='container'>
                <div className='logo_container'>
                    <h2>AgencyLinker</h2>
                </div>

                <ul className='actual_navbar'>
                    <li>
                        <img src={HomeIcon} alt='link_icon' className='link_small_icon' />
                        <Link to="/client_side/agency_client_home" className='actual_link'>Home</Link>
                    </li>
                    <li>
                        <img src={ClientRequestsIcon} alt='link_icon' className='link_small_icon' />
                        <Link to="/client_side/agency_client_home" className='actual_link'>Make Request</Link>
                    </li>
                    <li>
                        <img src={ClientFilesIcon} alt='link_icon' className='link_small_icon' />
                        <Link to="/client_side/agency_client_home" className='actual_link'>Tasks</Link>
                    </li>
                </ul>

                <div className='current_user_container'>
                    <div className='current_user_profile_container'>
                        <div className='profile_left_side'>
                            <img src={currentUsersUserProfileImg} alt='user_profile_img' className='suer_profile_img' />
                        </div>
                        <div className='profile_rightside'>
                            <Link to="" className='profile_username'>@{currentUsersUsername}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientNavbar