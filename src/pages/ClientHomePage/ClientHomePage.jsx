import React, { useState, useEffect } from "react";
import "./ClientHomePage.css";
import ClientNavbar from "../../components/ClientSideNavbar/ClientNavbar";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Loading from "../../components/LoadingComponent/Loading";

const ClientHomePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [currentUserProfileImg, setCurrentUserProfileImg] = useState(null);
	const [currentUserUsername, setCurrentUserUsername] = useState("");
	const [currentClientsAgencyTeams, setCurrentClientsAgencyTeams] = useState([]);

	const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";


	const getAllCurrentClientsTeamsAPartOf = () => {
		const currentUserToken = Cookies.get("access_token");
		const url = `${currentDevelopmentEnviroment}api/agency_client_side/get_current_clients_agency_teams/`;
		axios.defaults.headers.common["Authorization"] = `Bearer ${currentUserToken}`;

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${currentUserToken}`,
			},
		};

		axios
		.get(url, config)
			.then((response) => {
				setCurrentClientsAgencyTeams(response.data);
				console.log(response.data)
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
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


		getAllCurrentClientsTeamsAPartOf();
	}, []);

	return (
		<div className="main_outer_client_home_container">
		<div className="container">
			<div className="navbar_container">
				<ClientNavbar
					currentUsersUserProfileImg={`${currentUserProfileImg}`}
					currentUsersUsername={currentUserUsername}
				/>
			</div>

			<div className="content_container">
				<h1>Your current assigned agency team</h1>

				{/* <button onClick={() => getAllCurrentClientsTeamsAPartOf()}>Get current team details</button> */}

				<button className="join_agency_team_btn">
					<Link to='/client_side/agency_client_home/join_agency_team_clientside' className="actual_link_btn">Join agency team as a client</Link>
				</button>

				<div className="current_clients_agency_teams">
					{isLoading ? (<Loading />) : (

						<div className="current_clients_agency_teams">
							{currentClientsAgencyTeams.map((team) => (
							<div key={team.team_unique_link} className="single_client_agency_team">
								<Link to={`/client_side/agency_client_home/${team.team_unique_link}/${team.current_joined_client_container}`} className="actual_link_to_team_detail">
								<div className="team_leftside">
									<img src={`${team.team_image}`} alt="team" className="current_team_image" />
								</div>
								<div className="team_right_side">
									<h3>{team.team_name}</h3>
								</div>
								</Link>
							</div>
							))}
						</div>

					)}
				</div>
			</div>
		</div>
		</div>
	);
};

export default ClientHomePage;
