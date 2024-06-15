import React, { useState, useEffect } from 'react'
import "./JoinAgencyTeamClientSide.css"
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loading from '../../components/LoadingComponent/Loading'

const JoinAgencyTeamClientSide = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [teamUniqueLink, setTeamUniqueLink] = useState("")
    const [currentClientContainerName, setCurrentCloientContainerName] = useState("")

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";


    const joinAgencyTeamAsClient = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("teamUniqueLink", teamUniqueLink)
        formData.append("currentClientContainerName", currentClientContainerName)
        const url = `${currentDevelopmentEnviroment}api/agency_client_side/join_agency_team_as_client/`;
        const currentUserToken = Cookies.get("access_token");
        axios.defaults.headers.common['Authorization'] = `Bearer ${currentUserToken}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentUserToken}`
            }
        }

        axios.post(url, formData, config).then((response) => {
            setIsLoading(false);
            alert("You have joined this team as a client");
            window.location.href = "/client_side/agency_client_home";
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCurrentAuthenticatedClientUser = () => {
        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/authentication/get_current_client_user/`;
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
        // getCurrentAuthenticatedClientUser();

        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAuthenticatedClientUser();
        }


    }, [])


    return (
        <div className='main_outer_join_team_as_client_continaer'>
            <div className='container'>
                <div className='navbar_container'>
                    <ClientNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>Join the agency team as client here</h2>

                    <form className='actual_form_container' onSubmit={joinAgencyTeamAsClient}>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter agency team unique link' onChange={(e) => setTeamUniqueLink(e.target.value)} />
                        </div>

                        <div className='single_input'>
                            <input type='text' placeholder='Please enter client container name given to you by your agency' onChange={(e) => setCurrentCloientContainerName(e.target.value)} />
                        </div>

                        <div className='join_team_as_client_btn_container'>
                            <button type='submit' className='join_team_as_client_btn'>Join Team As Client</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JoinAgencyTeamClientSide