import React, { useState, useEffect } from 'react'
import "./AgencyClientContainerPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { Link, useParams } from 'react-router-dom';

const AgencyClientContainerPage = () => {
    const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";

    const { currentTeamLink, currentClientContainerName } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        getCurrentAgencyUserAuthenticated();
        getAllTasksInsideClientContainer();
    }, [currentTeamLink, currentClientContainerName])

    const getAllTasksInsideClientContainer = () => {
        const dataFromUrl = {currentTeamLink, currentClientContainerName};
        console.log(dataFromUrl)
        const actualTeamUniqueLink = dataFromUrl.currentTeamLink;
        const actualClientContainerName = dataFromUrl.currentClientContainerName

        const url = `${currentDevelopmentEnviroment}api/agency_side/get_all_tasks_inside_client_container/${actualTeamUniqueLink}/client_container/${actualClientContainerName}/`;

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.get(url, config).then((response) => {
            // console.log(response.data.tasks);
            setTasks(response.data.tasks);
        })
        .catch((error) => {
            alert("No tasks inside client container");
            console.log(error);
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

        })

    }

    return (
        <div className='main_outer_client_container_inside_agency_page'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                        teamUniqueLink={currentTeamLink}
                        clientName={currentClientContainerName}
                    />
                </div>

                <div className='content_container'>
                    <h2>Current clients tasks/objectives</h2>
                    <p>These are all the tasks and objectives that need to be completed for this client</p>

                    <div className='add_new_client_objective_container'>
                        <button className='add_new_client_objective'>
                            <Link to={`/agency_teams/agency_home/${currentTeamLink}/agency_home/${currentClientContainerName}/create_new_client_task`} className='actual_add_task_link_btn'>Add New Objective</Link>
                        </button>
                    </div>

                    <div className='objectives_outer_container'>
                        {tasks.map(task => (
                            <div className='single_objective' key={task.task_title}>
                                <h3 className='objective_title'>{task.task_title}</h3>
                                <p className='objective_description'>{task.task_short_description}</p>
                                <p className='objective_date'>Due Date: {task.task_due_date}</p>
                                <p className='objective_status'>Current Status: {task.task_current_status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgencyClientContainerPage