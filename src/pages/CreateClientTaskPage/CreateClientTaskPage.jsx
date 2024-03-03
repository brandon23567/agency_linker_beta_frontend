import React, { useState, useEffect } from 'react'
import "./CreateClientTaskPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';

const CreateClientTaskPage = () => {
    const { teamUniqueLink, clientName } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";

    const createNewClientTask = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const dataFromUrl = {teamUniqueLink, clientName};
        const actualTeamLinkUrl = dataFromUrl.teamUniqueLink;
        const actualCurrentTeamName = dataFromUrl.clientName;
        formData.append("taskTitle", taskTitle)
        formData.append("taskDescription", taskDescription)
        formData.append("taskDate", taskDate)
        formData.append("taskStatus", taskStatus)
        formData.append("currentTeamName", actualCurrentTeamName)
        formData.append("currentTeamUniqueLink", actualTeamLinkUrl)

        const url = `${currentDevelopmentEnviroment}api/agency_side/create_new_client_task/`;
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.post(url, formData, config).then((response) => {
            alert("New client task has been created");
            window.location.href = `/agency_teams/agency_home/${teamUniqueLink}/agency_home/${clientName}`;
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

    useEffect(() => {
        getCurrentAgencyUserAuthenticated();
    }, [teamUniqueLink, clientName])


    return (
        <div className='create_new_client_task_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                    />
                </div>

                <div className='content_container'>
                    <h2>Create new client task</h2>

                    <form className='actual_form' onSubmit={createNewClientTask}>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter task title' onChange={(e) => setTaskTitle(e.target.value)} />
                        </div>

                        <div className='single_input'>
                            <textarea placeholder='Please enter description of the task for others on the team' onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                        </div>

                        <div className='single_input'>
                            <input type='text' placeholder='Please enter due date' onChange={(e) => setTaskDate(e.target.value)} />
                        </div>

                        <div className='single_input'>
                            <input type='text' placeholder='Please enter current status of task' onChange={(e) => setTaskStatus(e.target.value)} />
                        </div>

                        <div className='create_new_client_task_btn_container'>
                            <button className='create_new_client_task_btn' type='submit'>Create Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateClientTaskPage