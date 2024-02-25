import React, { useState, useEffect } from "react";
import "./CreateNewClientTaskClientSide.css"
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';

const CreateNewClientTaskClientSide = () => {
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const {agency_team_link, agency_client_container_name} = useParams();

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const createNewClientTaskClientSide = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("taskTitle", taskTitle)
        formData.append("taskDescription", taskDescription)
        formData.append("taskDate", taskDate)
        formData.append("taskStatus", taskStatus)

        const currentTeamLink = agency_team_link
        const currentClientContainerName = agency_client_container_name

        const url = `http://localhost:8000/api/agency_client_side/create_new_client_task_client_side/${currentTeamLink}/${currentClientContainerName}/`;

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })

        // console.log("Current team unique link", currentTeamLink);
        // console.log("Current client container name", currentClientContainerName);
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

    useEffect(() => {
        getCurrentAuthenticatedClientUser();
    }, [agency_team_link, agency_client_container_name]);

    return (
        <div className='main_new_client_task_outer_container'>
            <RefreshToken />
            <div className="container">
                <div className="navbar_container">
                    <ClientNavbar
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername}
                    />
                </div>

                <div className="content_container">
                    <h2>Create a new task here</h2>

                    <form className="actual_main_form" onSubmit={createNewClientTaskClientSide}>
                        <div className="single_input">
                            <input type="text" placeholder="Enter task title" onChange={(e) => setTaskTitle(e.target.value)} />
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

export default CreateNewClientTaskClientSide