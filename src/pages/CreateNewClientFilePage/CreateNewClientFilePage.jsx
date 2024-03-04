import React, { useState, useEffect } from 'react'
import "./CreateNewClientFilePage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'

import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';

const CreateNewClientFilePage = () => {
    const { teamUniqueLink, clientName, clientFolderName } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [newFileName, setNewFileName] = useState("");
    const [newActualClientFile, setNewActualClientFile] = useState(null)
    const [fileExtension, setFileExtension] = useState("");

    const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";


    const createNewClientFile = (e) => {
        e.preventDefault();
        const dataFromUrl = { teamUniqueLink, clientName, clientFolderName }
        const actualTeamUniqueLink = dataFromUrl.teamUniqueLink
        const actualClientName = dataFromUrl.clientName;
        const actualClientFolderName = dataFromUrl.clientFolderName;
        const url = `${currentDevelopmentEnviroment}api/agency_side/create_new_client_file/${actualTeamUniqueLink}/create_client_file/${actualClientName}/${actualClientFolderName}/`

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const formData = new FormData()
        formData.append("newFileName", newFileName);
        formData.append("newActualClientFile", newActualClientFile);
        formData.append("fileExtension", fileExtension);

        axios.post(url, formData, config).then((response) => {
            alert("New file has been created");
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
    }, [teamUniqueLink, clientName, clientFolderName])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewActualClientFile(file);

        // Extracting file extension
        const fileNameParts = file.name.split('.');
        const extension = fileNameParts[fileNameParts.length - 1];
        setFileExtension(extension);
    }

    return (
        <div className='main_outer_create_client_file_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>Create new client file</h2>

                    <form className='actual_form' onSubmit={createNewClientFile}>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter file name' onChange={(e) => setNewFileName(e.target.value)} />
                        </div>

                        <div className='single_input'>
                            <input type='file' onChange={handleFileChange} />
                        </div>

                        <div className='add_new_client_file_btn_container'>
                            <button type='submit' className='add_new_client_file_btn'>Create File</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewClientFilePage