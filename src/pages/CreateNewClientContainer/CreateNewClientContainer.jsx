import React, { useState, useEffect } from 'react'
import "./CreateNewClientContainer.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading'

const CreateNewClientContainer = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { slug } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [clientName, setClientName] = useState("");
    const [clientDescription, setClientDescription] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientBudget, setClientBudget] = useState("");

    const currentDevelopmentEnviroment = "https://philosophical-marsha-brandon23567-organization.koyeb.app/";


    const createNewClientContainer = (e) => {
        e.preventDefault();
        const currentTeamUniqueLink = {slug};
        const teamLinkUrl = currentTeamUniqueLink.slug;
        const formData = new FormData();
        formData.append("clientName", clientName)
        formData.append("clientDescription", clientDescription)
        formData.append("clientEmail", clientEmail)
        formData.append("clientBudget", clientBudget)
        formData.append("currentTeamUniqueLink", teamLinkUrl)

        const url = `${currentDevelopmentEnviroment}api/agency_side/create_new_client_container/`
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        // console.log(teamLinkUrl)

        axios.post(url, formData, config).then((response) => {
            alert("New client container has been created");
            setIsLoading(false);
            window.location.href = `/agency_teams/${slug}/agency_home`;
        })
        .catch((error) => {
            setIsLoading(false);
            alert("Only team admins can create a new client container");
            console.log(error);
        })
    }

    const getCurrentTeamsDetails = () => {
        const url = `${currentDevelopmentEnviroment}api/agency_side/go_to_agency_team_detail/${slug}`
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        }

        axios.get(url, config).then((response) => {
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


        getCurrentTeamsDetails();
    }, [slug])


    return (
        <div className='main_new_client_container_outer_container'>
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
                        teamUniqueLink={slug}
                        clientName={clientName}
                    />
                </div>

                <div className='content_container'>
                    <h2>Create new client container</h2>

                    <form className='actual_form_container' onSubmit={createNewClientContainer}>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter client name' onChange={(e) => setClientName(e.target.value)} />
                        </div>
                        <div className='single_input'>
                            <textarea placeholder='Enter short description of client' onChange={(e) => setClientDescription(e.target.value)}></textarea>
                        </div>
                        <div className='single_input'>
                            <input type='email' placeholder='Please enter client email' onChange={(e) => setClientEmail(e.target.value)} />
                        </div>
                        <div className='single_input'>
                            <input type='text' placeholder='Please enter client budget' onChange={(e) => setClientBudget(e.target.value)} />
                        </div>

                        <div className='create_new_client_container_btn_container'>
                            <button className='create_new_client_container_btn' type='submit'>Create Container</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewClientContainer