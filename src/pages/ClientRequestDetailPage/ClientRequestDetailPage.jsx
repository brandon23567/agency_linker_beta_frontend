import React, { useEffect, useState } from 'react'
import "./ClientRequestDetailPage.css"
import SideNavbar from "../../components/SideNavbar/SideNavbar.jsx"
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken';
import { useParams } from 'react-router-dom';

const ClientRequestDetailPage = () => {

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [currentClientRequestData, setCurrentClientRequestData] = useState({});

    const { teamUniqueLink, clientName, client_request_title } = useParams();

    const getCurrentActiveClientRequest = () => {
        const currentTeamUniqueLink = teamUniqueLink;
        const currentClientContainer = clientName;
        const currentClientRequestTitle = client_request_title;

        const url = `http://localhost:8000/api/agency_side/get_current_client_request_detail/${currentTeamUniqueLink}/${currentClientContainer}/${currentClientRequestTitle}/`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        axios.get(url, config).then((response) => {
            console.log(response.data)
            setCurrentClientRequestData(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCurrentAgencyUserAuthenticated = () => {

        const currentUserToken = Cookies.get("access_token");
        const url = "http://localhost:8000/api/authentication/get_current_agency_user/"
        axios.defaults.headers.common['Authorization'] = `Bearer ${currentUserToken}`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${currentUserToken}`
            }
        }

        axios.get(url, config).then((response) => {
            console.log(response.data);

            const { "current user profile image": profileImageUrl } = response.data;
			const { "current user user": usersUsername } = response.data;

            setCurrentUserProfileImg(profileImageUrl);
            setCurrentUserUsername(usersUsername);

        })

    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        getCurrentAgencyUserAuthenticated();
        getCurrentActiveClientRequest();
    }, [teamUniqueLink, clientName, client_request_title])

    return (
        <div className='client_request_detail_page_outer_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
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

                        {/* <p className='request_status'>Status: Ongoing</p> */}

                        <p className='request_body_content'>
                            {currentClientRequestData.client_request_body}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientRequestDetailPage