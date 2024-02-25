import React, { useState, useEffect } from 'react'
import "./CreateNewClientContainer.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';

const CreateNewClientContainer = () => {

    const { slug } = useParams();

    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [clientName, setClientName] = useState("");
    const [clientDescription, setClientDescription] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientBudget, setClientBudget] = useState("");

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

        const url = "http://localhost:8000/api/agency_side/create_new_client_container/"
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.post(url, formData, config).then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            alert("Only team admins can create a new client container");
            console.log(error);
        })
    }

    const getCurrentTeamsDetails = () => {
        const url = `http://localhost:8000/api/agency_side/go_to_agency_team_detail/${slug}`
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.get(url, config).then((response) => {
            console.log(response.data)
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

    useEffect(() => {
        getCurrentAgencyUserAuthenticated();
        getCurrentTeamsDetails();
    }, [slug])


    return (
        <div className='main_new_client_container_outer_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar 
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername} 
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