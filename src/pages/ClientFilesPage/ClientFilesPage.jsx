import React, { useState, useEffect } from 'react'
import "./ClientFilesPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import TestFileIcon1 from "../../images/icons/docx-file.png";
import TestFileIcon2 from "../../images/icons/pdf.png";
import TestFileIcon3 from "../../images/icons/ppt.png";
import TestFileIcon4 from "../../images/icons/txt-file.png";
import TestFileIcon5 from "../../images/icons/xlsx.png";
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams, Link } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading';

const ClientFilesPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const { teamUniqueLink, clientName, clientFolderName } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";


    const [clientFiles, setClientFiles] = useState([]);

    const getAllCurrentClientFiles = () => {
        const dataFromUrl = { teamUniqueLink, clientName, clientFolderName }
        const actualTeamUniqueLink = dataFromUrl.teamUniqueLink
        const actualClientName = dataFromUrl.clientName;
        const actualClientFolderName = dataFromUrl.clientFolderName;

        const url = `${currentDevelopmentEnviroment}api/agency_side/get_all_client_files_inside_client_container/${actualTeamUniqueLink}/client_files/${actualClientName}/${actualClientFolderName}/`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        axios.get(url, config).then((response) => {
            setClientFiles(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            
        })
    }

    const getFileIcon = (extension) => {
        switch (extension) {
            case 'pdf':
                return TestFileIcon2;
            case 'docx':
                return TestFileIcon1;
            case 'ppt':
                return TestFileIcon3;
            case 'pptx':
                return TestFileIcon3;
            case 'txt':
                return TestFileIcon4;
            case 'xlsx':
                return TestFileIcon5;
            default:
                return 'default-icon.png';
        }
    };


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

            sessionStorage.setItem('currentUserProfileImg', profileImageUrl);
            sessionStorage.setItem('currentUserUsername', usersUsername);

        })

    }

    useEffect(() => {
        // getCurrentAgencyUserAuthenticated();
        getAllCurrentClientFiles();

        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAgencyUserAuthenticated();
        }
        
    }, [teamUniqueLink, clientName, clientFolderName])


    const formatDate = (dateString) => {
        return dateString.substring(0, 10);
    };


    return (
        <div className='main_client_files_outer_container'>
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
                    <h2>Client's Files</h2>

                    <div className='add_new_file_btn_container'>
                        <button className='add_new_file_btn'>
                            <Link to={`/agency_teams/agency_home/${teamUniqueLink}/agency_home/${clientName}/client_folders/client_files/${clientFolderName}/create_new_client_file`} className="new_clientfile_actual_link">Add New File</Link>
                        </button>
                    </div>

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

                    {/* <div className='client_files_container'>
                        {clientFiles.map((file, index) => (
                            <div className='client_single_file' key={index} onClick={() => handleFileDownload(file.file_path)}>
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ClientFilesPage