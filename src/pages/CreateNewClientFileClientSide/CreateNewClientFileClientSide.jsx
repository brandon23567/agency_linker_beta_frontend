import React, { useState, useEffect } from 'react'
import "./CreateNewClientFileClientSide.css"
import { useParams } from 'react-router-dom'
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

const CreateNewClientFileClientSide = () => {

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const {agency_team_link, agency_client_container_name, clientFolderName} = useParams();

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";
    const currentDevelopmentEnviromentForTest = "http://localhost:8000/";

    const [newFileName, setNewFileName] = useState("");
    const [newActualClientFile, setNewActualClientFile] = useState(null)
    const [fileExtension, setFileExtension] = useState("");

    const createNewClientFile = async (e) => {
        e.preventDefault();

        const dataFromUrl = { agency_team_link, agency_client_container_name, clientFolderName }
        const actualTeamUniqueLink = dataFromUrl.agency_team_link
        const actualClientName = dataFromUrl.agency_client_container_name;
        const actualClientFolderName = dataFromUrl.clientFolderName;

        const formData = new FormData()
        formData.append("newFileName", newFileName);
        formData.append("newActualClientFile", newActualClientFile);
        formData.append("fileExtension", fileExtension);

        try {
            const url = `${currentDevelopmentEnviroment}api/agency_client_side/create_new_client_file_clientside/${actualTeamUniqueLink}/${actualClientName}/${actualClientFolderName}/`
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                }
            }
            await axios.post(url, formData, config).then((response) => {
                alert("New file has been created and updated")
                console.log(response.data)
            });
        } catch (error) {
            console.error('Error creating new client file:', error.message);
        }
    }


    const getCurrentAuthenticatedClientUser = () => {
        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/authentication/get_current_client_user/`;
        axios.defaults.headers.common["Authorization"] = `Bearer ${currentUserToken}`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${currentUserToken}`,
            },
        };

        axios.get(url, config).then((response) => {

            const { "current user profile image": profileImageUrl } = response.data;
            const { "current user user": usersUsername } = response.data;

            setCurrentUserProfileImg(profileImageUrl);
            setCurrentUserUsername(usersUsername);

            sessionStorage.setItem('currentUserProfileImg', profileImageUrl);
            sessionStorage.setItem('currentUserUsername', usersUsername);
        });
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewActualClientFile(file);

        const fileNameParts = file.name.split('.');
        const extension = fileNameParts[fileNameParts.length - 1];
        setFileExtension(extension);
    }


    useEffect(() => {
        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
        } else {
            getCurrentAuthenticatedClientUser();
        }
    }, [agency_team_link, agency_client_container_name]);

    return (
        <div className='main_outer_new_client_file_clientside_container'>
            <div className='container'>
                <div className='navbar_container'>
                    <ClientNavbar
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername}
                        teamUniqueLink={agency_team_link}
                        agencyClientContainerName={agency_client_container_name}
                    />
                </div>

                <div className='content_container'>
                    <h2>Upload new file here</h2>

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

export default CreateNewClientFileClientSide