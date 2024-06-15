import React, { useState, useEffect } from 'react'
import "./ClientFilesPageClientSide.css"
import TestFileIcon1 from "../../images/icons/docx-file.png";
import TestFileIcon2 from "../../images/icons/pdf.png";
import TestFileIcon3 from "../../images/icons/ppt.png";
import TestFileIcon4 from "../../images/icons/txt-file.png";
import TestFileIcon5 from "../../images/icons/xlsx.png";
import { useParams } from 'react-router-dom'
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";
import Loading from '../../components/LoadingComponent/Loading';

const ClientFilesPageClientSide = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const {agency_team_link, agency_client_container_name, clientFolderName} = useParams();

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";
    const currentDevelopmentEnviromentForTest = "http://localhost:8000/";

    const [clientFiles, setClientFiles] = useState([]);

    const getAllFilesInsideFolder = (e) => {
        console.log("working")
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

    const getFileIcon = (extension) => {
        switch (extension) {
            case 'pdf':
                return TestFileIcon2;
            case 'docx':
                return TestFileIcon1;
            case 'ppt':
                return TestFileIcon3;
            case 'txt':
                return TestFileIcon4;
            case 'xlsx':
                return TestFileIcon5;
            default:
                return 'default-icon.png';
        }
    };

    const formatDate = (dateString) => {
        return dateString.substring(0, 10);
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
        <div className='main_outer_client_files_clientside_container'>
            <div className='navbar_container'>
                <ClientNavbar
                    currentUsersUserProfileImg={`${currentUserProfileImg}`}
                    currentUsersUsername={currentUserUsername}
                    teamUniqueLink={agency_team_link}
                    agencyClientContainerName={agency_client_container_name}
                />
            </div>

            <div className='content_container'>
                <h2>All your files inside this folder</h2>

                <button className='add_new_client_file_btn'>
                    <Link to={`/client_side/agency_client_home/${agency_team_link}/${agency_client_container_name}/clients_folders/${clientFolderName}/create_new_client_file`} className='actual_link_btn'>Add new file</Link>
                </button>


                {isLoading ? (<Loading />) : (

                        <div className='client_files_container'>
                            {clientFiles.map((file, index) => (
                                <div className='client_single_file' key={index}>
                                    <div className='file_left_side'>
                                        <img src={getFileIcon(file.file_extension)} alt='file_icon_img' className='file_icon_img' />
                                    </div>
                                    <div className='file_right_side'>
                                        <h3>{file.file_name}</h3>
                                        <p className='user_who_uploaded'>
                                            Uploaded by: {file.user_who_uploaded}
                                        </p>
                                        <p className='date_uploaded'>
                                            Date Uploaded: {formatDate(file.date_uploaded)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                )}
            </div>
        </div>
    )
}

export default ClientFilesPageClientSide