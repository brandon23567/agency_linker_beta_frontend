import React, { useState, useEffect } from 'react'
import "./CreateNewClientFolderPage.css";
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';

const CreateNewClientFolderPage = () => {

    const { teamUniqueLink, clientName } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [clientFolderName, setClientFolderName] = useState("")

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";


    const createNewClientFolder = (e) => {
        e.preventDefault();

        const dataFromUrl = { teamUniqueLink, clientName };

        const actualTeamUniqueLink = dataFromUrl.teamUniqueLink;
        const actualClientName = dataFromUrl.clientName

        const url = `${currentDevelopmentEnviroment}api/agency_side/create_new_client_folder/${actualTeamUniqueLink}/create_new_container/${actualClientName}/`
        const formData = new FormData();
        formData.append("clientFolderName", clientFolderName)
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.post(url, formData, config).then((response) => {
            alert("New client folder has been created")
            window.location.href = `/agency_teams/agency_home/${teamUniqueLink}/agency_home/${clientName}/client_folders`
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
    }, [teamUniqueLink, clientName])


    return (
        <div className='outer_main_create_new_folder_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>

                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                        teamUniqueLink={teamUniqueLink}
                        clientName={clientName}
                    />
                
                </div>

                <div className='content_container'>
                    <h2>Add new client folder</h2>

                    <form className='actual_form' onSubmit={createNewClientFolder}>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter folder name' onChange={(e) => setClientFolderName(e.target.value)} />
                        </div>

                        <div className='add_new_client_folder_btn_container'>
                            <button className='add_new_client_folder_btn' type='submit'>Add Folder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewClientFolderPage