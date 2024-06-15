import React, { useState } from 'react'
import "./AgencySigninPage.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loading from '../../components/LoadingComponent/Loading'

const AgencySigninPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const currentDevelopmentEnviroment = process.env.PRODUCTION_ENV
    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";


    const signNewAgencyUser = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const url = `${currentDevelopmentEnviroment}api/authentication/login_agency_user/`
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.post(url, formData, config).then((response) => {
            console.log(response)
            const new_user_token = response.data.access_token
            Cookies.set("access_token", new_user_token)
            alert("You have been logged into your account")
            setIsLoading(false);
            window.location.href = "/agency_teams";
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
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
                            <Link to="/select_types/agency_signup" className='navbar_link'>Signup</Link>
                        </li>
                        <li>
                            <Link to="/select_types/agency_signin" className='navbar_link'>Signin</Link>
                        </li>
                    </ul>
                </div>

                <div className='actual_signup_container'>
                    <h2>Signin to your account here with your agency</h2>

                    {/* {isLoading ? (<Loading />) : (
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
                    )} */}

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

export default AgencySigninPage