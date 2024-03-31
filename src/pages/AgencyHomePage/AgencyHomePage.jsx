import React, { useState, useEffect } from 'react'
import "./AgencyHomePage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link, useParams } from 'react-router-dom';

const AgencyHomePage = () => {

    const { slug } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");
    const [currentTeamLink, setCurrentTeamLink] = useState("");

    const [clientContainers, setClientContainers] = useState([]);

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";

    const getCurrentTeamUniqueLink = () => {
        const currentLink = {slug}
        const actual_current_team_link = currentLink.slug;
        setCurrentTeamLink(actual_current_team_link);
    }

    const getCurrentAgencyTeamClientContainer = () => {

        const currentTeamContainerName = {slug};
        const actualCurrentTeamContainerName = currentTeamContainerName.slug;

        const url = `${currentDevelopmentEnviroment}api/agency_side/get_client_containers_inside_agency_team/${actualCurrentTeamContainerName}/`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        };

        axios.get(url, config)
            .then((response) => {
                const containers = response.data.team_details.client_containers;
                setClientContainers(containers);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCurrentTeamsDetails = () => {
        const url = `${currentDevelopmentEnviroment}api/agency_side/go_to_agency_team_detail/${slug}`
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        axios.get(url, config).then((response) => {
            // console.log(response.data)
        })
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
        getCurrentTeamsDetails();
        getCurrentAgencyTeamClientContainer();
        getCurrentTeamUniqueLink();
    }, [slug])

    return (
        <div className='agency_homepage_outer_main_container'>
            <div className='container'>
                <div className='sidenavbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>
                <div className='main_content_container'>
                    <h1>Client Containers</h1>

                    <div className='add_client_container_btn_container'>
                        <button className='add_client_container_btn'>
                            <Link to={`/agency_teams/${slug}/agency_home/create_new_client_container`} className='actual_new_client_container_link'>Add new client container</Link>
                        </button>
                    </div>

                    <div className='client_containers_container'>
                        {clientContainers.map((container, index) => (
                            <div className='single_client' key={index}>
                                <Link to={`/agency_teams/agency_home/${currentTeamLink}/agency_home/${container.client_name}`} className='actual_container_link'>
                                    <div className='client_top_part'>
                                        <h2>{container.client_name}</h2>
                                    </div>
                                    <div className='client_bottom_part'>
                                        <p className='client_description'>
                                            {container.client_description}
                                        </p>
                                        <p className='client_email'>
                                            Client Email: {container.client_email}
                                        </p>
                                        <p className='client_budget'>
                                            Client Budget: {container.client_budget}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgencyHomePage