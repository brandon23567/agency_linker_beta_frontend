import React, { useState, useEffect } from 'react'
import "./ClientFoldersPage.css"
import SideNavbar from "../../components/SideNavbar/SideNavbar.jsx"
import FolderIcon from "../../images/icons/shared-folder.png"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';

const ClientFoldersPage = () => {
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const { teamUniqueLink, clientName } = useParams();

    // const currentDevelopmentEnviroment = process.env.PRODUCTION_ENV

    const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";


    const [folders, setFolders] = useState([]);

    const getCurrentClientFoldersInContainer = () => {

        const dataFromUrl = { teamUniqueLink, clientName };

        const actualTeamUniqueLink = dataFromUrl.teamUniqueLink;
        const actualClientName = dataFromUrl.clientName

        const url = `${currentDevelopmentEnviroment}api/agency_side/get_folders_inside_current_container/${actualTeamUniqueLink}/client_folders/${actualClientName}/`;

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.get(url, config)
            .then(response => {
                const formattedFolders = response.data.map(folder => ({
                    ...folder,
                    date_created: new Date(folder.date_created).toLocaleString()
                }));
                setFolders(formattedFolders);
            })
            .catch(error => {
                console.error("Error fetching folders:", error);
            });
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

            const { "current user profile image": profileImageUrl } = response.data;
			const { "current user user": usersUsername } = response.data;

            setCurrentUserProfileImg(profileImageUrl);
            setCurrentUserUsername(usersUsername);

        })

    }

    useEffect(() => {
        getCurrentAgencyUserAuthenticated();
        getCurrentClientFoldersInContainer();
    }, [teamUniqueLink, clientName])


    return (
        <div className='client_folders_main_outer_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>Clients folders and files</h2>

                    <div className='add_new_folder_btn_container'>
                        <button className='add_new_folder'>Add New Folder</button>
                    </div>

                    <div className='client_folders_container'>
                        {folders.map((folder, index) => (
                            <div className='single_folder' key={index}>
                                <div className='single_folder_leftside'>
                                    <img src={FolderIcon} className='folder_icon_img' alt='folder_icon_img' />
                                </div>
                                <div className='single_folder_rightside'>
                                    <Link to={`/agency_teams/agency_home/${teamUniqueLink}/agency_home/${clientName}/client_folders/client_files/${folder.folder_name}/`} className='folder_name'>
                                        <p className='actual_folder_name'>{folder.folder_name}</p>
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

export default ClientFoldersPage