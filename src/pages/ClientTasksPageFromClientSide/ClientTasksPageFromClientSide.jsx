import React, { useState, useEffect } from "react";
import "./ClientTasksPageFromClientSide.css"
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';


const ClientTasksPageFromClientSide = () => {
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [clientTasks, setClientTasks] = useState([]);

    const {agency_team_link, agency_client_container_name} = useParams();

    const currentDevelopmentEnviroment = process.env.PRODUCTION_ENV


    const getCurrentClientsTasksMadeByClient = () => {
        const dataFromUrl = {agency_team_link, agency_client_container_name}
        const currentTeamLink = dataFromUrl.agency_team_link
        const currentClientContainerName = dataFromUrl.agency_client_container_name
        const url = `${currentDevelopmentEnviroment}api/agency_client_side/get_current_clients_request_they_made/${currentTeamLink}/${currentClientContainerName}/`;
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.get(url, config).then((response) => {
            setClientTasks(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCurrentAuthenticatedClientUser = () => {
        const currentUserToken = Cookies.get("access_token");
        const url = `${currentDevelopmentEnviroment}api/authentication/get_current_client_user/`;
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

        const { "current user profile image": profileImageUrl } = response.data;
        const { "current user user": usersUsername } = response.data;

        setCurrentUserProfileImg(profileImageUrl);
        setCurrentUserUsername(usersUsername);
        });
    };

    useEffect(() => {
        getCurrentAuthenticatedClientUser();
        getCurrentClientsTasksMadeByClient();
    }, [agency_team_link, agency_client_container_name]);

    return (
        <div className='main_outer_task_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <ClientNavbar
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername}
                    />
                </div>

                <div className='content_container'>
                    <h2>All your tasks</h2>

                    <div className="tasks_container">
                        {clientTasks.map((task, index) => (
                        <div className="single_task" key={index}>
                            <h3>{task.task_title}</h3>
                            <p className="task_short_description">{task.task_short_description}</p>
                            <p>Due Date: {task.task_due_date}</p>
                            <p>Status: {task.task_current_status}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientTasksPageFromClientSide