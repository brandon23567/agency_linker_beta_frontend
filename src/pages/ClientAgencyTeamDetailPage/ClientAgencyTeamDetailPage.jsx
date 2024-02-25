import React, { useState, useEffect } from "react";
import "./ClientAgencyTeamDetailPage.css"
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


const ClientAgencyTeamDetailPage = () => {

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [requests, setRequests] = useState([]);

    const { agency_team_link, agency_client_container_name } = useParams();

    const getAllPreviousMadeClientRequests = () => {
        const teamLinkValue = { agency_team_link, agency_client_container_name }
        const currentTeamUniqueLink = teamLinkValue.agency_team_link
        const currentClientContainer = teamLinkValue.agency_client_container_name
        const url = `http://localhost:8000/api/agency_client_side/get_current_team_requests/${currentTeamUniqueLink}/${currentClientContainer}/`
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.get(url, config).then((response) => {
            // console.log(response.data);
            setRequests(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCurrentAuthenticatedClientUser = () => {
        const currentUserToken = Cookies.get("access_token");
        const url = `http://localhost:8000/api/authentication/get_current_client_user/`;
        axios.defaults.headers.common[
        "Authorization"
        ] = `Bearer ${currentUserToken}`;
        const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentUserToken}`,
        },
        };

        axios.get(url, config).then((response) => {
        console.log(response.data);

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
        getAllPreviousMadeClientRequests();
    }, [agency_team_link, agency_client_container_name]);

    return (
        <div className='main_outer_client_team_detail_page'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <ClientNavbar
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername}
                    />
                </div>

                <div className='content_container'>
                    <h2 className="big_title">All previously made requests</h2>

                    <div className="requests_container">
                        {requests.map((request, index) => (
                            <div className="single_request" key={index}>
                                <Link to={`/client_side/agency_client_home/${agency_team_link}/${agency_client_container_name}/${request.request_title}`} className="actual_request_detail_container">
                                    <h2 className="request_title">{request.request_title}</h2>
                                    <p className="request_short_description">
                                        {request.short_description}
                                    </p>
                                    <p className="request_date_posted">
                                        Date posted: {formatDate(request.date_requested)}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientAgencyTeamDetailPage