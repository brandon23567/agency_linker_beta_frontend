import React, { useEffect, useState } from 'react'
import "./ClientRequestsPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading'

const ClientRequestsPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [clientRequests, setClientRequests] = useState([]);

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";


    const { teamUniqueLink, clientName } = useParams();

    const getClientRequestsInsideClientContainer = () => {
        const currentTeamUniqueLink = teamUniqueLink
        const currentClientContainer = clientName;

        const url = `${currentDevelopmentEnviroment}api/agency_side/get_all_client_requests_inside_container/${currentTeamUniqueLink}/${currentClientContainer}/`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        axios.get(url, config).then((response) => {
            setClientRequests(response.data);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
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

        
        getClientRequestsInsideClientContainer();
    }, [teamUniqueLink, clientName])


    return (
        <div className='client_requests_outer_main_container'>
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
                    <h2>All requests made by client</h2>

                    <div className='requests_container'>
                        {isLoading ? (<Loading />) : (

                            <div className='requests_container'>
                                {clientRequests.map((request, index) => (
                                    <div className='single_request' key={index}>
                                        <Link to={`/agency_teams/agency_home/${teamUniqueLink}/${clientName}/client_requests/client_request_detail/${request.request_title}`} className='link_to_request_detail'>
                                            <h2>{request.request_title}</h2>
                                            <p className='request_short_description'>{request.short_description}</p>
                                            <p className='request_date_posted'>Date Requested: {formatDate(request.date_requested)}</p>
                                            <p className='request_status'>Request Status: Ongoing</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                        )}
                        {/* <div className='requests_container'>
                            {clientRequests.map((request, index) => (
                                <div className='single_request' key={index}>
                                    <Link to={`/agency_teams/agency_home/${teamUniqueLink}/${clientName}/client_requests/client_request_detail/${request.request_title}`} className='link_to_request_detail'>
                                        <h2>{request.request_title}</h2>
                                        <p className='request_short_description'>{request.short_description}</p>
                                        <p className='request_date_posted'>Date Requested: {formatDate(request.date_requested)}</p>
                                        <p className='request_status'>Request Status: Ongoing</p>
                                    </Link>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientRequestsPage