import React, { useState, useEffect } from "react";
import "./ClientHomePage.css";
import ClientNavbar from "../../components/ClientSideNavbar/ClientNavbar";
import axios from "axios";
import Cookies from "js-cookie";
import RefreshToken from "../../components/RefreshToken/RefreshToken";
import { Link } from "react-router-dom";

const ClientHomePage = () => {
	const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
	const [currentUserUsername, setCurrentUserUsername] = useState("");
	const [currentClientsAgencyTeams, setCurrentClientsAgencyTeams] = useState([]);

    // const currentDevelopmentEnviroment = process.env.PRODUCTION_ENV

	const currentDevelopmentEnviroment = "https://agency-linker-beta.onrender.com/";


	const getAllCurrentClientsTeamsAPartOf = () => {
		const currentUserToken = Cookies.get("access_token");
		const url = `${currentDevelopmentEnviroment}api/agency_client_side/get_current_clients_agency_teams/`;
		axios.defaults.headers.common[
		"Authorization"
		] = `Bearer ${currentUserToken}`;

		const config = {
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${currentUserToken}`,
		},
		};

		axios
		.get(url, config)
		.then((response) => {
			// console.log(response.data);
			setCurrentClientsAgencyTeams(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
	};

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
			// console.log(response.data);

			const { "current user profile image": profileImageUrl } = response.data;
			const { "current user user": usersUsername } = response.data;

			setCurrentUserProfileImg(profileImageUrl);
			setCurrentUserUsername(usersUsername);
		});
  	};

	useEffect(() => {
		getCurrentAuthenticatedClientUser();
		getAllCurrentClientsTeamsAPartOf();
	}, []);

	return (
		<div className="main_outer_client_home_container">
			<RefreshToken />
		<div className="container">
			<div className="navbar_container">
				<ClientNavbar
					currentUsersUserProfileImg={`${currentUserProfileImg}`}
					currentUsersUsername={currentUserUsername}
				/>
			</div>

			<div className="content_container">
				<h1>Your current assigned agency team</h1>

				<div className="current_clients_agency_teams">
						<div className="current_clients_agency_teams">
							{currentClientsAgencyTeams.map((team) => (
							<div key={team.team_unique_link} className="single_client_agency_team">
								<Link to={`/client_side/agency_client_home/${team.team_unique_link}/${team.current_joined_client_container}`} className="actual_link_to_team_detail">
								<div className="team_leftside">
									<img src={`http://localhost:8000${team.team_image}`} alt="team" className="current_team_image" />
								</div>
								<div className="team_right_side">
									<h3>{team.team_name}</h3>
								</div>
								</Link>
							</div>
							))}
						</div>
				</div>
			</div>
		</div>
		</div>
	);
};

export default ClientHomePage;
