import React, { useState, useEffect } from "react";
import "./ClientAgencyTeamDetailPage.css"
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";

const ClientAgencyTeamDetailPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [requests, setRequests] = useState([]);

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";
    const currentDevelopmentEnviromentForTest = "http://localhost:8000/";


    const { agency_team_link, agency_client_container_name } = useParams();

    const getAllPreviousMadeClientRequests = () => {
        const teamLinkValue = { agency_team_link, agency_client_container_name }
        const currentTeamUniqueLink = teamLinkValue.agency_team_link
        const currentClientContainer = teamLinkValue.agency_client_container_name
        const url = `${currentDevelopmentEnviroment}api/agency_client_side/get_current_team_requests/${currentTeamUniqueLink}/${currentClientContainer}/`
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        // console.log(`current team link is: ${currentTeamUniqueLink}`)
        // console.log(`current client container is: ${currentClientContainer}`)

        axios.get(url, config).then((response) => {
            setRequests(response.data);
            // console.log(response.data)
            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
            setIsLoading(false);
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

            sessionStorage.setItem('currentUserProfileImg', profileImageUrl);
            sessionStorage.setItem('currentUserUsername', usersUsername);
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };


    useEffect(() => {
        // getCurrentAuthenticatedClientUser();

        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAuthenticatedClientUser();
        }

        getAllPreviousMadeClientRequests();
    }, [agency_team_link, agency_client_container_name]);

    return (
        <div className='main_outer_client_team_detail_page'>
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
                    <h2 className="big_title">All previously made requests</h2>

                    <button className="make_new_client_request_btn">
                        <Link to={`/client_side/agency_client_home/${agency_team_link}/${agency_client_container_name}/create_new_client_request`} className="actual_link">Make new request</Link>
                    </button>

                    {/* <button onClick={() => getAllPreviousMadeClientRequests()}>get all requests</button> */}

                    {isLoading ? (<Loading />) : (

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

                    )}

                    {/* <div className="requests_container">
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ClientAgencyTeamDetailPage