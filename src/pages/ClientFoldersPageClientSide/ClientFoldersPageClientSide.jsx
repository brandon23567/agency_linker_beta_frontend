import React, { useState, useEffect } from "react";
import "./ClientFoldersPageClientSide.css"
import { useParams } from 'react-router-dom'
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";
import FolderIcon from "../../images/icons/shared-folder.png"

const ClientFoldersPageClientSide = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const {agency_team_link, agency_client_container_name} = useParams();

    const [folders, setFolders] = useState([]);

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";
    const currentDevelopmentEnviromentForTest = "http://localhost:8000/";

    const getCurrentClientsFolders = (e) => {
        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/agency_client_side/get_current_clients_folders_client_side/${agency_team_link}/${agency_client_container_name}/`
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${currentUserToken}`,
            },
        };

        axios.get(url, config)
            .then(response => {
                const formattedFolders = response.data.map(folder => ({
                    ...folder,
                    date_created: new Date(folder.date_created).toLocaleString()
                }));
                setFolders(formattedFolders);
                setIsLoading(false);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching folders:", error);
                setIsLoading(false);
            });
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
        getCurrentClientsFolders()
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
        <div className='main_outer_client_folders_page'>
            <div className='navbar_container'>
                <ClientNavbar
                    currentUsersUserProfileImg={`${currentUserProfileImg}`}
                    currentUsersUsername={currentUserUsername}
                    teamUniqueLink={agency_team_link}
                    agencyClientContainerName={agency_client_container_name}
                />
            </div>

            <div className='content_container'>
                <h2>All your folders and files</h2>

                <button className="add_new_client_folder_btn">
                    <Link to={`/client_side/agency_client_home/${agency_team_link}/${agency_client_container_name}/create_new_client_folder`} className="actual_link_btn">Add new folder</Link>
                </button>

                <div className="folders_container">

                    <div className='client_folders_container'>
                        {folders.map((folder, index) => (
                            <div className='single_folder' key={index}>
                                <div className='single_folder_leftside'>
                                    <img src={FolderIcon} className='folder_icon_img' alt='folder_icon_img' />
                                </div>
                                <div className='single_folder_rightside'>
                                    <Link to={`/client_side/agency_client_home/${agency_team_link}/${agency_client_container_name}/clients_folders/${folder.foldername}`} className='folder_name'>
                                        <p className='actual_folder_name'>{folder.foldername}</p>
                                        <p className='user_who_uploaded'>By: @{folder.user_who_created}</p>
                                        <p className='date_when_folder_created'>Date created: {folder.date_created}</p>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default ClientFoldersPageClientSide