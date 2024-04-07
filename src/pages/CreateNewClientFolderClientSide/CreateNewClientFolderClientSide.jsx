import React, { useState, useEffect } from "react";
import "./CreatenewClientFolderClientSide.css"
import { useParams } from 'react-router-dom'
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";

const CreateNewClientFolderClientSide = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [newFolderName, setNewFolderName] = useState("")

    const {agency_team_link, agency_client_container_name} = useParams();

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";
    const currentDevelopmentEnviromentForTest = "http://localhost:8000/";

    const createNewClientFolder = (e) => {
        e.preventDefault();
        // const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/agency_client_side/create_new_client_folder_clientside/${agency_team_link}/${agency_client_container_name}/`

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        const formData = new FormData()
        formData.append("folderName", newFolderName)

        axios.post(url, formData, config).then((response) => {
            // console.log(response.data);
            alert("new client folder has been created");
            window.location.href = `/client_side/agency_client_home/${agency_team_link}/${agency_client_container_name}/clients_folders`
        })
        .catch((error) => {
            console.log(error)
        })
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


    useEffect(() => {
        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAuthenticatedClientUser();
        }
    }, [agency_team_link, agency_client_container_name]);


    return (
        <div className='main_outer_create_folder_container'>
            <div className="container">
                <div className="navbar_container">
                    <ClientNavbar
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername}
                        teamUniqueLink={agency_team_link}
                        agencyClientContainerName={agency_client_container_name}
                    />
                </div>

                <div className="content_container">
                    <h2>Add new folder here</h2>

                    <form className="actual_form" onSubmit={createNewClientFolder}>
                        <div className="single_input">
                            <input type="text" placeholder="Please enter the name of your folder" onChange={(e) => setNewFolderName(e.target.value)} />
                        </div>

                        <div className="add_new_client_folder_btn_container">
                            <button type="submit" className="add_new_client_folder_btn">Add Folder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewClientFolderClientSide