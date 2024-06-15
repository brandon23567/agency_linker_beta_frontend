import React, { useState } from 'react'
import "./ClientSigninPage.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const ClientSigninPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";


    const signNewAgencyUser = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const url = `${currentDevelopmentEnviroment}api/authentication/login_client_user/`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        axios.post(url, formData, config).then((response) => {
            // const { access_token, refresh_token } = response.data;

            // Cookies.set("access_token", access_token)
			// Cookies.set("refresh_token", refresh_token)

            const new_user_token = response.data.access_token
            Cookies.set("access_token", new_user_token)

            alert("Signin was successful");

            window.location.href = "/client_side/agency_client_home";
        })

    }


    return (
        <div className='main_outer_agency_signup_container'>
            <div className='container'>
                <div className='top_navbar_container'>
                    <div className='logo_container'>
                        <h2>AgencyLinker</h2>
                    </div>

                    <ul className='navbar'>
                        <li>
                            <Link to="/" className='navbar_link'>Home</Link>
                        </li>
                        <li>
                            <Link to="/select_types/client_signup" className='navbar_link'>Signup</Link>
                        </li>
                        <li>
                            <Link to="/select_types/client_signin" className='navbar_link'>Signin</Link>
                        </li>
                    </ul>
                </div>

                <div className='actual_signup_container'>
                    <h2>Signin to your account as a client</h2>

                    <form className='actual_form_container' onSubmit={signNewAgencyUser}>
                        <div className='single_input'>
                            <label>Username: </label>
                            <input type='text' placeholder='Please enter your username' onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='single_input'>
                            <label>Password: </label>
                            <input type='password' placeholder='Please enter your password' onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='signup_btn_container'>
                            <button type='submit' className='signup_btn'>Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ClientSigninPage