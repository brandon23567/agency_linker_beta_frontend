import React, { useEffect, useState } from 'react'
import "./ClientRequestsPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken';
import { useParams } from 'react-router-dom';

const ClientRequestsPage = () => {

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [clientRequests, setClientRequests] = useState([]);

    const { teamUniqueLink, clientName } = useParams();

    const getClientRequestsInsideClientContainer = () => {
        const currentTeamUniqueLink = teamUniqueLink
        const currentClientContainer = clientName;
        console.log("current team link", teamUniqueLink);
        console.log("current client container name", clientName);

        const url = `http://localhost:8000/api/agency_side/get_all_client_requests_inside_container/${currentTeamUniqueLink}/${currentClientContainer}/`;
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.get(url, config).then((response) => {
            console.log(response.data)
            setClientRequests(response.data);
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
        getClientRequestsInsideClientContainer();
    }, [teamUniqueLink, clientName])


    return (
        <div className='client_requests_outer_main_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>All requests made by client</h2>

                    <div className='requests_container'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientRequestsPage