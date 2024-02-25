import React, { useState, useEffect } from "react";
import "./CreateNewClientRequest.css"
import ClientNavbar from '../../components/ClientSideNavbar/ClientNavbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import RefreshToken from '../../components/RefreshToken/RefreshToken'
import { useParams } from 'react-router-dom';

const CreateNewClientRequest = () => {
    const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
    const [currentUserUsername, setCurrentUserUsername] = useState("");

    const [requestTitle, setRequestTilte] = useState("")
    const [requestShortDescription, setRequestShortDescription] = useState("")
    const [requestBody, setRequestBody] = useState("")

    const { agency_team_link, agency_client_container_name } = useParams();

    const createNewClientRequestForTeam = (e) => {
        e.preventDefault();
        const teamLinkValue = { agency_team_link, agency_client_container_name }
        const currentTeamUniqueLink = teamLinkValue.agency_team_link
        const actualCurrentClientContainerName = teamLinkValue.agency_client_container_name;
        const formData = new FormData()
        formData.append("requestTitle", requestTitle)
        formData.append("requestShortDescription", requestShortDescription)
        formData.append("requestBody", requestBody)
        formData.append("actualCurrentClientContainerName", actualCurrentClientContainerName)

        const currentUserToken = Cookies.get("access_token");

        const url = `http://localhost:8000/api/agency_client_side/create_new_client_request/${currentTeamUniqueLink}/`
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentUserToken}`,
            }
        }

        axios.post(url, formData, config).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
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
            "Authorization": `Bearer ${currentUserToken}`,
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
        <div className='main_outer_create_new_client_request_container'>
            <RefreshToken />
            <div className='container'>
                <div className='navbar_container'>
                    <ClientNavbar
                        currentUsersUserProfileImg={`http://localhost:8000/${currentUserProfileImg}`}
                        currentUsersUsername={currentUserUsername}
                    />
                </div>

                <div className='content_container'>
                    <h2>Make a new request here</h2>

                    <form className="actual_form_container" onSubmit={createNewClientRequestForTeam}>
                        <div className="single_input">
                            <label>Request title:</label>
                            <input type="text" placeholder="Please enter a title for your request" onChange={(e) => setRequestTilte(e.target.value)}/>
                        </div>
                        <div className="single_input">
                            <label>Short description:</label>
                            <textarea placeholder="Please enter short description" onChange={(e) => setRequestShortDescription(e.target.value)} className="short_description_input"></textarea>
                        </div>
                        <div className="single_input">
                            <label>Request Body:</label>
                            <textarea placeholder="Please enter your full request for the agency" onChange={(e) => setRequestBody(e.target.value)} className="request_body_input"></textarea>
                        </div>

                        <div className="upload_request_btn_container">
                            <button type="submit" className="upload_request_btn">Upload Request</button>
                        </div>
                    </form>

                    {/* <button onClick={() => getDetailsFromAddressBar()}>Testing</button> */}
                </div>
            </div>
        </div>
    )
}

export default CreateNewClientRequest