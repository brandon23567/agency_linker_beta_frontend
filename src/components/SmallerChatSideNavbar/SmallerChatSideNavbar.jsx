import React from 'react'
import "./SmallerChatSideNavbar.css"

import UserImage1 from "../../images/test_imgs/1 (1).jpg"
import HomeIcon from "../../images/icons/home-page(1).png";
import ClientFilesIcon from "../../images/icons/folder.png";
import ClientRequestsIcon from "../../images/icons/customer-service.png";
import TeamChatIcon from "../../images/icons/chat.png";
import MembersIcon from "../../images/icons/member-card.png";

const SmallerChatSideNavbar = () => {
    return (
        <div className='main_outer_sidenavbar_container'>
            <div className='container'>
                <div className='logo_container'>
                    <h3>Logo</h3>
                </div>

                
                <ul className='actual_navbar'>
                    <li>
                        <img src={HomeIcon} alt='link_icon' className='link_small_icon' />
                    </li>
                    <li>
                        <img src={ClientFilesIcon} alt='link_icon' className='link_small_icon' />
                    </li>
                    <li>
                        <img src={ClientRequestsIcon} alt='link_icon' className='link_small_icon' />
                    </li>
                    <li>
                        <img src={TeamChatIcon} alt='link_icon' className='link_small_icon' />
                    </li>
                    <li>
                        <img src={MembersIcon} alt='link_icon' className='link_small_icon' />
                    </li>
                </ul>


                <div className='current_user_container'>
                    <div className='current_user_profile_container'>
                        <div className='profile_left_side'>
                            <img src={UserImage1} alt='user_profile_img' className='suer_profile_img' />
                        </div>
                        {/* <div className='profile_rightside'>
                            <Link to="" className='profile_username'>@Username</Link>
                        </div> */}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SmallerChatSideNavbar