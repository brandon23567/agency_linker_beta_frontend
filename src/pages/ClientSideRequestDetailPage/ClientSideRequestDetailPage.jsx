import React, { useEffect, useState } from 'react'
import "./ClientSideRequestDetailPage.css";
import ClientNavbar from "../../components/ClientSideNavbar/ClientNavbar";
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken';
import { useParams } from 'react-router-dom';

const ClientSideRequestDetailPage = () => {
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [currentClientRequestData, setCurrentClientRequestData] = useState({});

    const { teamUniqueLink, clientName, client_request_title } = useParams();

    // const currentDevelopmentEnviroment = process.env.PRODUCTION_ENV

    const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";


    const getCurrentActiveClientRequestClientSide = () => {

        const dataFromURL = { teamUniqueLink, clientName, client_request_title }

        const currentTeamUniqueLink = dataFromURL.teamUniqueLink;
        const currentClientContainer = dataFromURL.clientName;
        const currentClientRequestTitle = dataFromURL.client_request_title;

        const currentUserToken = Cookies.get("access_token");

        const url = `${currentDevelopmentEnviroment}api/agency_client_side/get_current_client_request_detail/${currentTeamUniqueLink}/${currentClientContainer}/${currentClientRequestTitle}/`;
        axios.defaults.headers.common["Authorization"] = `Bearer ${currentUserToken}`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${currentUserToken}`,
            },
        };

        axios.get(url, config).then((response) => {
            setCurrentClientRequestData(response.data);
        }).catch((error) => {
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
                Authorization: `Bearer ${currentUserToken}`,
            },
        };

        axios.get(url, config).then((response) => {
        const { "current user profile image": profileImageUrl } = response.data;
        const { "current user user": usersUsername } = response.data;

        setCurrentUserProfileImg(profileImageUrl);
        setCurrentUserUsername(usersUsername);
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        getCurrentAuthenticatedClientUser();
        getCurrentActiveClientRequestClientSide()
    }, [teamUniqueLink, clientName, client_request_title]);
    
    return (
        <div className='client_request_detail_page_outer_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <ClientNavbar
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername}
                    />
                </div>

                <div className='content_container'>
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
                </div>
            </div>
        </div>
    )
}

export default ClientSideRequestDetailPage