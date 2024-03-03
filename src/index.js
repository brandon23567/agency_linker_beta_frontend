import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { SpeedInsights } from '@vercel/speed-insights/react';
import IndexPage from "./pages/IndexPage/IndexPage.jsx"
import AgencyHomePage from "./pages/AgencyHomePage/AgencyHomePage.jsx"
import AgencyClientContainerPage from './pages/AgencyClientContainerPage/AgencyClientContainerPage.jsx';
import ClientFoldersPage from './pages/ClientFoldersPage/ClientFoldersPage.jsx';
import ClientFilesPage from './pages/ClientFilesPage/ClientFilesPage.jsx';
import ClientRequestsPage from './pages/ClientRequestsPage/ClientRequestsPage.jsx';
import ClientRequestDetailPage from './pages/ClientRequestDetailPage/ClientRequestDetailPage.jsx';
import TeamMembersPage from './pages/TeamMembersPage/TeamMembersPage.jsx';
import SelectTypePage from './pages/SelectTypePage/SelectTypePage.jsx';
import AgencySignupPage from './pages/AgencySignupPage/AgencySignupPage.jsx';
import AgencySigninPage from './pages/AgencySigninPage/AgencySigninPage.jsx';
import ClientSignupPage from "./pages/ClientSignupPage/ClientSignupPage.jsx";
import ClientSigninPage from "./pages/ClientSigninPage/ClientSigninPage.jsx";
import SideNavbar from './components/SideNavbar/SideNavbar.jsx';
import AgencyTeamPage from './pages/AgencyTeamPage/AgencyTeamPage.jsx';
import AgencyTeamChatPage from './pages/AgencyTeamChatPage/AgencyTeamChatPage.jsx';
import JoinNewAgencyTeamPage from './pages/JoinNewAgencyTeamPage/JoinNewAgencyTeamPage.jsx';
import CreateNewTeamPage from './pages/CreateNewTeamPage/CreateNewTeamPage.jsx';
import CreateNewClientContainer from './pages/CreateNewClientContainer/CreateNewClientContainer.jsx';
import CreateClientTaskPage from './pages/CreateClientTaskPage/CreateClientTaskPage.jsx';
import CreateNewClientFolderPage from './pages/CreateNewClientFolderPage/CreateNewClientFolderPage.jsx';
import CreateNewClientFilePage from './pages/CreateNewClientFilePage/CreateNewClientFilePage.jsx';
import ClientHomePage from './pages/ClientHomePage/ClientHomePage.jsx';
import JoinAgencyTeamClientSide from './pages/JoinAgencyTeamAsClient/JoinAgencyTeamClientSide.jsx';
import ClientAgencyTeamDetailPage from './pages/ClientAgencyTeamDetailPage/ClientAgencyTeamDetailPage.jsx';
import CreateNewClientRequest from './pages/CreateNewClientRequest/CreateNewClientRequest.jsx';
import ClientSideRequestDetailPage from './pages/ClientSideRequestDetailPage/ClientSideRequestDetailPage.jsx';
import CreateNewClientTaskClientSide from './pages/CreateNewClientTaskClientSide/CreateNewClientTaskClientSide.jsx';
import ClientTasksPageFromClientSide from './pages/ClientTasksPageFromClientSide/ClientTasksPageFromClientSide.jsx';



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
	{
		path: "/",
		element: <IndexPage />,
  	},
	{
		path: "/select_types",
		element: <SelectTypePage />,
  	},
	{
		path: "/select_types/agency_signup",
		element: <AgencySignupPage />,
  	},
	{
		path: "/select_types/agency_signin",
		element: <AgencySigninPage />,
  	},
	{
		path: "/select_types/client_signup",
		element: <ClientSignupPage />,
  	},
	{
		path: "/select_types/client_signin",
		element: <ClientSigninPage />,
  	},
	{
		path: "/agency_teams",
		element: <AgencyTeamPage />,
  	},
	{
		path: "/agency_teams/create_new_team",
		element: <CreateNewTeamPage />,
  	},
	{
		path: "/agency_teams/join_team",
		element: <JoinNewAgencyTeamPage />,
  	},
	{
		path: "/agency_teams/:slug/agency_home",
		element: <AgencyHomePage />,
  	},
	{
		path: "/agency_teams/:slug/agency_home/create_new_client_container",
		element: <CreateNewClientContainer />,
  	},
	{
		path: "/agency_teams/:slug/member_chat",
		element: <AgencyTeamChatPage />,
  	},
	{
		path: "/agency_teams/:currentTeamLink/agency_home/team_members",
		element: <TeamMembersPage />,
  	},
	{
		path: "/agency_teams/agency_home/:currentTeamLink/agency_home/:currentClientContainerName",
		element: <AgencyClientContainerPage />,
  	},
	{
		path: "/agency_teams/agency_home/:teamUniqueLink/agency_home/:clientName/create_new_client_task",
		element: <CreateClientTaskPage />,
  	},
	{
		path: "/agency_teams/agency_home/:teamUniqueLink/agency_home/:clientName/client_requests",  //the client name in this case is the client container name bro
		element: <ClientRequestsPage />,
  	},
	{
		path: "/agency_teams/agency_home/:teamUniqueLink/:clientName/client_requests/client_request_detail/:client_request_title",
		element: <ClientRequestDetailPage />,
  	},
	{
		path: "/agency_teams/agency_home/:teamUniqueLink/agency_home/:clientName/client_folders",
		element: <ClientFoldersPage />,
  	},
	{
		path: "/agency_teams/agency_home/:teamUniqueLink/agency_home/:clientName/client_folders/create_new_client_folder",
		element: <CreateNewClientFolderPage />,
  	},
	{
		path: "/agency_teams/agency_home/:teamUniqueLink/agency_home/:clientName/client_folders/client_files/:clientFolderName",
		element: <ClientFilesPage />,
  	},
	{
		path: "/agency_teams/agency_home/:teamUniqueLink/agency_home/:clientName/client_folders/client_files/:clientFolderName/create_new_client_file",
		element: <CreateNewClientFilePage />,
  	},
	{
		path: "/client_side/agency_client_home",
		element: <ClientHomePage />,
  	},
	{
		path: "/client_side/agency_client_home/join_agency_team_clientside",
		element: <JoinAgencyTeamClientSide />,
  	},
	{
		path: "/client_side/agency_client_home/:agency_team_link/:agency_client_container_name",
		element: <ClientAgencyTeamDetailPage />,
  	},
	{
		path: "/client_side/agency_client_home/:agency_team_link/:agency_client_container_name/create_new_task",
		element: <CreateNewClientTaskClientSide />,
  	},
	{
		path: "/client_side/agency_client_home/:agency_team_link/:agency_client_container_name/client_tasks_page",
		element: <ClientTasksPageFromClientSide />,
  	},
	{
		path: "/client_side/agency_client_home/:teamUniqueLink/:clientName/:client_request_title",
		element: <ClientSideRequestDetailPage />,
  	},
	{
		path: "/client_side/agency_client_home/:agency_team_link/:agency_client_container_name/create_new_client_request",
		element: <CreateNewClientRequest />,
  	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
    	<RouterProvider router={router}>
			<SpeedInsights />
			<SideNavbar />
		</RouterProvider>
  	</React.StrictMode>
);

