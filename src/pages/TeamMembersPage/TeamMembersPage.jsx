import React, { useState, useEffect } from 'react'
import "./TeamMembersPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading'

const TeamMembersPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { currentTeamLink } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [teamMembers, setTeamMembers] = useState([]);

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";

    const testDevEnviroment = "http://localhost:8000/";


    const getCurrentTeamUniqueLink = () => {
        const currentLink = {currentTeamLink}
        const actual_current_team_link = currentLink.currentTeamLink;
        console.log("your current team link", actual_current_team_link)
    }

    const getCurrentTeamMembers = () => {
        const currentTeamUniquLink = {currentTeamLink}
        const actualCurrentTeamUniqueLink = currentTeamUniquLink.currentTeamLink;

        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/agency_side/get_current_team_members_inside_team/${actualCurrentTeamUniqueLink}/`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${currentUserToken}`;

        axios.get(url)
            .then(response => {
                setTeamMembers(response.data.team_members);
                setIsLoading(false);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching team members:", error);
                setIsLoading(false);
            });
    }

    const getCurrentAgencyUserAuthenticated = () => {

        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/authentication/get_current_agency_user/`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${currentUserToken}`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${currentUserToken}`
            }
        }

        axios.get(url, config).then((response) => {
            const { "current user profile image": profileImageUrl } = response.data;
			const { "current user user": usersUsername } = response.data;

            setCurrentUserProfileImg(profileImageUrl);
            setCurrentUserUsername(usersUsername);

            sessionStorage.setItem('currentUserProfileImg', profileImageUrl);
            sessionStorage.setItem('currentUserUsername', usersUsername);

        })

    }

    useEffect(() => {
        // getCurrentAgencyUserAuthenticated();

        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAgencyUserAuthenticated();
        }

        getCurrentTeamUniqueLink();
        getCurrentTeamMembers();
    }, [currentTeamLink])

    return (
        <div className='team_members_page_outer_main_container'>
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>All team members on the current team</h2>

                    <div className='add_new_team_member_btn_container'>
                        <button className='add_new_team_member'>Add New Member</button>
                    </div>

                    {isLoading ? (<Loading />) : (

                        <div className='team_members_container'>
                            {teamMembers.map(member => (
                                <div className='single_member' key={member.username}>
                                    <div className='single_member_top_part'>
                                        <img src={member.profile_img} alt='user_profile_img' className='user_profile_img' />
                                    </div>
                                    <div className='single_member_bottom_part'>
                                        <h3>
                                            <Link to="#" className='user_username'>@{member.username}</Link>
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                    )}

                    {/* <div className='team_members_container'>
                        {teamMembers.map(member => (
                            <div className='single_member' key={member.username}>
                                <div className='single_member_top_part'>
                                    <img src={member.profile_img} alt='user_profile_img' className='user_profile_img' />
                                </div>
                                <div className='single_member_bottom_part'>
                                    <h3>
                                        <Link to="#" className='user_username'>@{member.username}</Link>
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default TeamMembersPage