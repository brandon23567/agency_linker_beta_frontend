import React from 'react'
import { Link } from "react-router-dom"
import "./SideNavbar.css"
import HomeIcon from "../../images/icons/home-page(1).png";
import ClientFilesIcon from "../../images/icons/folder.png";
import ClientRequestsIcon from "../../images/icons/customer-service.png";
import MembersIcon from "../../images/icons/member-card.png";
import RefreshToken from '../../components/RefreshToken/RefreshToken';
import { useParams } from 'react-router-dom';

const SideNavbar = ({ currentUsersUserProfileImg, currentUsersUsername, teamUniqueLink, clientName  }) => {
    // const { teamUniqueLink, clientName } = useParams();
    return (
        <div className='main_outer_sidenavbar_container'>
            <RefreshToken />
            <div className='container'>
                <div className='logo_container'>
                    <h2>AgencyLinker</h2>
                </div>

                <ul className='actual_navbar'>
                    <li>
                        <img src={HomeIcon} alt='link_icon' className='link_small_icon' />
                        <Link to="/agency_teams" className='actual_link'>Home</Link>
                    </li>
                    <li>
                        <img src={ClientFilesIcon} alt='link_icon' className='link_small_icon' />
                        <Link to={`/agency_teams/agency_home/${teamUniqueLink}/agency_home/${clientName}/client_folders`} className='actual_link'>Client Folders</Link>
                    </li>
                    <li>
                        <img src={ClientRequestsIcon} alt='link_icon' className='link_small_icon' />
                        <Link to={`/agency_teams/agency_home/${teamUniqueLink}/agency_home/${clientName}/client_requests`} className='actual_link'>Client Requests</Link>
                    </li>
                    <li>
                        <img src={MembersIcon} alt='link_icon' className='link_small_icon' />
                        <Link to={`/agency_teams/${teamUniqueLink}/agency_home/team_members`} className='actual_link'>Members</Link>
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

export default SideNavbar


// note, instead directly from navbar component, make the dynamic parts parameters that i can add
// from that current page as needed instead of here directly


