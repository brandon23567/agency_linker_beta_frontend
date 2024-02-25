import React from 'react'
import "./AgencyTeamChatPage.css"
import SmallerChatSideNavbar from '../../components/SmallerChatSideNavbar/SmallerChatSideNavbar';
import ProfileImage1 from "../../images/test_imgs/1 (1).jpg"
import { Link } from 'react-router-dom';

const AgencyTeamChatPage = () => {
    return (
        <div className='main_team_chat_page_outer_container'>
            <div className='container'>
                <div className='smaller_side_navbar_container'>
                    <SmallerChatSideNavbar />
                </div>
                <div className='current_team_members_container'>
                    <div className='search_input_container'>
                        <input type='text' placeholder='Search for team member' />
                    </div>

                    <div className='team_members_container'>
                        <div className='single_team_member'>
                            <div className='single_team_member_leftside'>
                                <img src={ProfileImage1} alt='user_profile_img' className='user_profile_img' />
                            </div>
                            <div className='single_team_member_rightside'>
                                <Link to="" className='user_username'>Username Here</Link>
                            </div>
                        </div>

                        <div className='single_team_member'>
                            <div className='single_team_member_leftside'>
                                <img src={ProfileImage1} alt='user_profile_img' className='user_profile_img' />
                            </div>
                            <div className='single_team_member_rightside'>
                                <Link to="" className='user_username'>Username Here</Link>
                            </div>
                        </div>

                        <div className='single_team_member'>
                            <div className='single_team_member_leftside'>
                                <img src={ProfileImage1} alt='user_profile_img' className='user_profile_img' />
                            </div>
                            <div className='single_team_member_rightside'>
                                <Link to="" className='user_username'>Username Here</Link>
                            </div>
                        </div>

                        <div className='single_team_member'>
                            <div className='single_team_member_leftside'>
                                <img src={ProfileImage1} alt='user_profile_img' className='user_profile_img' />
                            </div>
                            <div className='single_team_member_rightside'>
                                <Link to="" className='user_username'>Username Here</Link>
                            </div>
                        </div>

                        <div className='single_team_member'>
                            <div className='single_team_member_leftside'>
                                <img src={ProfileImage1} alt='user_profile_img' className='user_profile_img' />
                            </div>
                            <div className='single_team_member_rightside'>
                                <Link to="" className='user_username'>Username Here</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='chat_messages_container'>
                    <div className='actual_messages_container'>
                        <div className='single_message'>
                            <div className='single_message_leftside'>
                                <img src={ProfileImage1} alt='user_message_profile_img' className='user_message_profile_img' />
                            </div>
                            <div className='single_message_rightside'>
                                <p>
                                    This is the message uploaded by the person i just wanted to also see how it would handle 
                                    the message being super long and all that just to see how my frontend will look like and if 
                                    it breaks or anything like that
                                </p>
                            </div>
                        </div>
                        <div className='single_message'>
                            <div className='single_message_leftside'>
                                <img src={ProfileImage1} alt='user_message_profile_img' className='user_message_profile_img' />
                            </div>
                            <div className='single_message_rightside'>
                                <p>
                                    This is the message uploaded by the person i just wanted to also see how it would handle 
                                    the message being super long and all that just to see how my frontend will look like and if 
                                    it breaks or anything like that
                                </p>
                            </div>
                        </div>
                        <div className='single_message'>
                            <div className='single_message_leftside'>
                                <img src={ProfileImage1} alt='user_message_profile_img' className='user_message_profile_img' />
                            </div>
                            <div className='single_message_rightside'>
                                <p>
                                    This is the message uploaded by the person i just wanted to also see how it would handle 
                                    the message being super long and all that just to see how my frontend will look like and if 
                                    it breaks or anything like that
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='add_new_messages_container'>
                        <input type='text' placeholder='Type in your message here' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgencyTeamChatPage