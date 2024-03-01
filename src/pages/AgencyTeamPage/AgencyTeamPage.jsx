import React, { useEffect, useState } from 'react'
import "./AgencyTeamPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken';
import { Link } from 'react-router-dom'

const AgencyTeamPage = () => {

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");
    const [currentUserTeams, setCurrentUserTeams] = useState([])

    // const currentDevelopmentEnviroment = process.env.PRODUCTION_ENV
    const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";


    const getAllTeamsCurrentUserIsAPartOf = () => {
        const url = `${currentDevelopmentEnviroment}api/agency_side/get_user_teams/`
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.get(url, config).then((response) => {
            console.log(response.data.user_teams)
            setCurrentUserTeams(response.data.user_teams);
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
            console.log(response.data);

            const { "current user profile image": profileImageUrl } = response.data;
			const { "current user user": usersUsername } = response.data;

            setCurrentUserProfileImg(profileImageUrl);
            setCurrentUserUsername(usersUsername);

        })

    }

    useEffect(() => {
        getCurrentAgencyUserAuthenticated();
        getAllTeamsCurrentUserIsAPartOf();
    }, [])

    return (
        <div className='main_agency_team_page_outer_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>All the teams you are a part of</h2>

                    <div className='add_new_team_btn_container'>
                        <button className='add_new_team_btn'>Add New Team</button>
                    </div>

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
                </div>
            </div>
        </div>
    )
}

export default AgencyTeamPage