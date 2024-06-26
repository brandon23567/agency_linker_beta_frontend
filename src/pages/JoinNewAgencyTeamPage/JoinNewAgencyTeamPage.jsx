import React, { useState, useEffect } from 'react'
import "./JoinNewAgencyTeamPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading'

const JoinNewAgencyTeamPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { slug } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [agencyUniqueLink, setAgencyUniqueLink] = useState("")

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";


    const JoinAgencyTeam = (e) => {
        e.preventDefault();
        const url = `${currentDevelopmentEnviroment}api/agency_side/join_agency_team/${slug}/`
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        // console.log(agencyUniqueLink);

        const formData = new FormData();
        formData.append("agencyUniqueLink", agencyUniqueLink)

        axios.post(url, formData, config).then((response) => {
            setIsLoading(false);
            alert("You have joined the agency team");
            window.location.href = "/agency_teams";
        })
    }

    const getCurrentAgencyUserAuthenticated = () => {

        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/authentication/get_current_agency_user/`
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
        getCurrentAgencyUserAuthenticated();

        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAgencyUserAuthenticated();
        }


    }, [slug])


    return (
        <div className='main_join_new_agency_outer_container'>
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>Join your organization here</h2>

                    <form className='form_container' onSubmit={JoinAgencyTeam}>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter agency team link' onChange={(e) => setAgencyUniqueLink(e.target.value)}/>
                        </div>

                        <div className='join_team_btn_container'>
                            <button type='submit' className='join_team_btn'>Join Team</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JoinNewAgencyTeamPage