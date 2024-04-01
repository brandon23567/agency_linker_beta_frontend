import React, { useEffect, useState } from 'react'
import "./ClientRequestDetailPage.css"
import SideNavbar from "../../components/SideNavbar/SideNavbar.jsx"
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading.jsx'

const ClientRequestDetailPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [currentClientRequestData, setCurrentClientRequestData] = useState({});

    const { teamUniqueLink, clientName, client_request_title } = useParams();

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";


    const getCurrentActiveClientRequest = () => {
        const currentTeamUniqueLink = teamUniqueLink;
        const currentClientContainer = clientName;
        const currentClientRequestTitle = client_request_title;

        const url = `${currentDevelopmentEnviroment}api/agency_side/get_current_client_request_detail/${currentTeamUniqueLink}/${currentClientContainer}/${currentClientRequestTitle}/`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        axios.get(url, config).then((response) => {
            setCurrentClientRequestData(response.data);
            setIsLoading(false);
        }).catch((error) => {
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

            sessionStorage.setItem('currentUserProfileImg', profileImageUrl);
            sessionStorage.setItem('currentUserUsername', usersUsername);

        })

    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        // getCurrentAgencyUserAuthenticated();

        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAgencyUserAuthenticated();
        }


        getCurrentActiveClientRequest();
    }, [teamUniqueLink, clientName, client_request_title])

    return (
        <div className='client_request_detail_page_outer_container'>
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    {isLoading ? (<Loading />) : (

                        <div className='request_detail_container'>
                            <div className='title_container'>
                                <h2>{currentClientRequestData.request_title}</h2>
                            </div>

                            <p className='date_requested'>
                                {formatDate(currentClientRequestData.date_requested)}
                            </p>

                            <p className='request_body_content'>
                                {currentClientRequestData.client_request_body}
                            </p>
                        </div>

                    )}
                    {/* <div className='request_detail_container'>
                        <div className='title_container'>
                            <h2>{currentClientRequestData.request_title}</h2>
                        </div>

                        <p className='date_requested'>
                            {formatDate(currentClientRequestData.date_requested)}
                        </p>

                        <p className='request_body_content'>
                            {currentClientRequestData.client_request_body}
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ClientRequestDetailPage