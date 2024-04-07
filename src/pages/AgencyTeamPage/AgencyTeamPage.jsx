import React, { useEffect, useState } from 'react'
import "./AgencyTeamPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import Loading from '../../components/LoadingComponent/Loading'

const AgencyTeamPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");
    const [currentUserTeams, setCurrentUserTeams] = useState([])

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";


    const getAllTeamsCurrentUserIsAPartOf = () => {
        const url = `${currentDevelopmentEnviroment}api/agency_side/get_user_teams/`
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        axios.get(url, config).then((response) => {
            setCurrentUserTeams(response.data.user_teams);
            // console.log(response.data)
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const getCurrentAgencyUserAuthenticated = () => {

        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/authentication/get_current_agency_user/`
        axios.defaults.headers.common['Authorization'] = `Bearer ${currentUserToken}`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
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

    // const deleteLocalStorageStuff = () => {
    //     localStorage.clear();
    // }

    useEffect(() => {
        // getCurrentAgencyUserAuthenticated();
        getAllTeamsCurrentUserIsAPartOf();

        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAgencyUserAuthenticated();
        }
    }, [])

    return (
        <div className='main_agency_team_page_outer_container'>
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>All the teams you are a part of</h2>

                    {/* <button onClick={() => deleteLocalStorageStuff()}>
                        Delete local storage for nwo
                    </button> */}

                    <div className='add_new_team_btn_container'>
                        <button className='add_new_team_btn'>
                            <Link to={`/agency_teams/create_new_team`} className='actual_link'>Add New Team</Link>
                        </button>

                        <button className='join_new_team_btn'>
                            <Link to={`/agency_teams/join_team`} className='actual_link'>join New Team</Link>
                        </button>
                    </div>

                    {isLoading ? (<Loading />) : (

                        <div className='users_teams_container'>
                            {currentUserTeams.map((single_team, index) => (
                                <div className='single_team' key={index}>
                                    <Link to={`/agency_teams/${single_team.team_unique_link}/agency_home`} className='link_to_agency_team_page'><h2 className='team_name'>{single_team.team_name}</h2></Link>
                                    <p className='created_by'>Created by: @{single_team.user_who_created}</p>
                                    <p className='assigned_client'>Client assigned: {single_team.client_assigned}</p>
                                    <p className='number_of_members'>Team Members: {single_team.num_members}</p>
                                </div>
                            ))}
                        </div>

                    )}

                    {/* <div className='users_teams_container'>
                        {currentUserTeams.map((single_team, index) => (
                            <div className='single_team' key={index}>
                                <Link to={`/agency_teams/${single_team.team_unique_link}/agency_home`} className='link_to_agency_team_page'><h2 className='team_name'>{single_team.team_name}</h2></Link>
                                <p className='created_by'>Created by: @{single_team.user_who_created}</p>
                                <p className='assigned_client'>Client assigned: {single_team.client_assigned}</p>
                                <p className='number_of_members'>Team Members: {single_team.num_members}</p>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default AgencyTeamPage
