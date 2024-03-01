import React, { useState, useEffect } from 'react'
import "./CreateNewTeamPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'

const CreateNewTeamPage = () => {

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [teamName, setTeamName] = useState("");
    const [teamAssignedClient, setTeamAssignedClient] = useState("");
    const [teamProfileImg, setTeamProfileImg] = useState(null);

    // const currentDevelopmentEnviroment = process.env.PRODUCTION_ENV

    const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";

    const CreateNewTeam = (e) => {
        e.preventDefault();
        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/agency_side/create_new_agency_team/`
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${currentUserToken}`
            }
        }

        const formData = new FormData()
        formData.append("teamName", teamName)
        formData.append("teamAssignedClient", teamAssignedClient)
        formData.append("teamProfileImg", teamProfileImg)

        axios.post(url, formData, config).then((response) => {
        })
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

        })

    }


    useEffect(() => {
        getCurrentAgencyUserAuthenticated();
    }, [])

    return (
        <div className='outer_main_new_team_outer_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>Create New Agency Team Here</h2>

                    <form className='actual_form_container' onSubmit={CreateNewTeam}>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter team name' onChange={(e) => setTeamName(e.target.value)} />
                        </div>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter client assigned for this team' onChange={(e) => setTeamAssignedClient(e.target.value)} />
                        </div>
                        <div className='single_input'>
                            <input type='file' onChange={(e) => setTeamProfileImg(e.target.files[0])} />
                        </div>
                        <div className='create_new_team_btn_container'>
                            <button type='submit' className='create_new_team_btn'>Create Team</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewTeamPage