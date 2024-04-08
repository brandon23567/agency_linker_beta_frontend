import React, { useState, useEffect } from 'react'
import "./CurrentAgencyTeamSettingsPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';


const CurrentAgencyTeamSettingsPage = () => {
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";

    const testDevEnviroment = "http://localhost:8000/";

    const { teamUniqueLink, clientName } = useParams();


    const getCurrentTeamContainerDetailsSettings = () => {
        console.log(`the curren team unique link is: ${teamUniqueLink}`)
        console.log(`the curren team client container is: ${clientName}`)
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
        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
        } else {
            getCurrentAgencyUserAuthenticated();
        }

    }, [])

    return (
        <div className='main_outer_agency_team_settings_container'>
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>Your current client container and team details</h2>
                    <p>Please share these details with your client to allow them to join the team</p>

                    {/* <button onClick={() => getCurrentTeamContainerDetailsSettings()}>Get container details</button> */}

                    <div className='team_settings_container'>
                        <h3>Team unique link:   {teamUniqueLink}</h3>
                        <h3>Client Container name:    {clientName}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentAgencyTeamSettingsPage