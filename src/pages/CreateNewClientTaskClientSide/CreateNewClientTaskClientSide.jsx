import React, { useState, useEffect } from "react";
import "./CreateNewClientTaskClientSide.css"
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';
import Loading from "../../components/LoadingComponent/Loading";

const CreateNewClientTaskClientSide = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const {agency_team_link, agency_client_container_name} = useParams();

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskStatus, setTaskStatus] = useState("");


    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";


    const createNewClientTaskClientSide = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("taskTitle", taskTitle)
        formData.append("taskDescription", taskDescription)
        formData.append("taskDate", taskDate)
        formData.append("taskStatus", taskStatus)

        const currentTeamLink = agency_team_link
        const currentClientContainerName = agency_client_container_name

        const url = `${currentDevelopmentEnviroment}api/agency_client_side/create_new_client_task_client_side/${currentTeamLink}/${currentClientContainerName}/`;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        axios.post(url, formData, config).then((response) => {
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
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


    }, [agency_team_link, agency_client_container_name]);

    return (
        <div className='main_new_client_task_outer_container'>
            <div className="container">
                <div className="navbar_container">
                    <ClientNavbar
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
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