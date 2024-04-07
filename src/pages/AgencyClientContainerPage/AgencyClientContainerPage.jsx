import React, { useState, useEffect } from 'react'
import "./AgencyClientContainerPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading'

const AgencyClientContainerPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";

    const { currentTeamLink, currentClientContainerName } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        // getCurrentAgencyUserAuthenticated();
        getAllTasksInsideClientContainer();

        const cachedProfileImg = sessionStorage.getItem('currentUserProfileImg');
        const cachedUsername = sessionStorage.getItem('currentUserUsername');

        if (cachedProfileImg && cachedUsername) {
            setCurrentUserProfileImg(cachedProfileImg);
            setCurrentUserUsername(cachedUsername);
            setIsLoading(false);
        } else {
            getCurrentAgencyUserAuthenticated();
        }

    }, [currentTeamLink, currentClientContainerName])

    const getAllTasksInsideClientContainer = () => {
        const dataFromUrl = {currentTeamLink, currentClientContainerName};
        const actualTeamUniqueLink = dataFromUrl.currentTeamLink;
        const actualClientContainerName = dataFromUrl.currentClientContainerName

        const url = `${currentDevelopmentEnviroment}api/agency_side/get_all_tasks_inside_client_container/${actualTeamUniqueLink}/client_container/${actualClientContainerName}/`;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        axios.get(url, config).then((response) => {
            setTasks(response.data.tasks);
            console.log(response.data)
            setIsLoading(false);
        })
        .catch((error) => {
            alert("No tasks inside client container");
            setIsLoading(false);
            // console.log(error);
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

    return (
        <div className='main_outer_client_container_inside_agency_page'>
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

                    {isLoading ? (<Loading />) : (

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

                    )}

                    {/* <div className='objectives_outer_container'>
                        {tasks.map(task => (
                            <div className='single_objective' key={task.task_title}>
                                <h3 className='objective_title'>{task.task_title}</h3>
                                <p className='objective_description'>{task.task_short_description}</p>
                                <p className='objective_date'>Due Date: {task.task_due_date}</p>
                                <p className='objective_status'>Current Status: {task.task_current_status}</p>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default AgencyClientContainerPage