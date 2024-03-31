import React, { useState, useEffect } from 'react'
import "./CreateNewClientFilePage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';

const CreateNewClientFilePage = () => {
    const { teamUniqueLink, clientName, clientFolderName } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [newFileName, setNewFileName] = useState("");
    const [newActualClientFile, setNewActualClientFile] = useState(null)
    const [fileExtension, setFileExtension] = useState("");

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";
    const currentDevelopmentEnviromentForUpload = "http://localhost:8000/api/agency_side/";

    const createNewClientFile = async (e) => {
        e.preventDefault();
        const dataFromUrl = { teamUniqueLink, clientName, clientFolderName }
        const actualTeamUniqueLink = dataFromUrl.teamUniqueLink
        const actualClientName = dataFromUrl.clientName;
        const actualClientFolderName = dataFromUrl.clientFolderName;

        const formData = new FormData()
        formData.append("newFileName", newFileName);
        formData.append("newActualClientFile", newActualClientFile);
        formData.append("fileExtension", fileExtension);

        try {
            const url = `${currentDevelopmentEnviromentForUpload}create_new_client_file/${actualTeamUniqueLink}/create_client_file/${actualClientName}/${actualClientFolderName}/`
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            await axios.post(url, formData, config);
            alert("New file has been created");
        } catch (error) {
            console.error('Error creating new client file:', error.message);
        }
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

        const fileNameParts = file.name.split('.');
        const extension = fileNameParts[fileNameParts.length - 1];
        setFileExtension(extension);
    }

    return (
        <div className='main_outer_create_client_file_container'>
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
                    <h2>Create new client file</h2>

                    <form className='actual_form' onSubmit={createNewClientFile}>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter file name' onChange={(e) => setNewFileName(e.target.value)} />
                        </div>

                        <div className='single_input'>
                            <input type='file' id='uploader' onChange={handleFileChange} />
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
