import React, { useState } from 'react'
import "./AgencySignupPage.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loading from '../../components/LoadingComponent/Loading'

const AgencySignupPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userProfileImg, setUserProfileImg] = useState(null);
    const [password, setPassword] = useState("");

    const currentDevelopmentEnviroment = "https://agencylinkerpro.pythonanywhere.com/";
    

    const signNewAgencyUser = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("userProfileImg", userProfileImg);
        formData.append("password", password);

        const url = `${currentDevelopmentEnviroment}api/authentication/register_agency_user/`
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        // console.log("your username is ", username)
        // console.log("your email is ", email)

        axios.post(url, formData, config).then((response) => {
            const new_user_token = response.data.access_token
            Cookies.set("access_token", new_user_token)
            alert("Signup was successful");
            window.location.href = "/select_types/agency_signin";
            setIsLoading(false);
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
                    <h2>Signup for a new account here with your agency</h2>

                    {/* {isLoading ? (
                        <form className='actual_form_container' onSubmit={signNewAgencyUser}>
                            <div className='single_input'>
                                <label>Username: </label>
                                <input type='text' placeholder='Please enter your username' onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='single_input'>
                                <label>Email: </label>
                                <input type='email' placeholder='Please enter your email' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='single_input'>
                                <label>Profile Image: </label>
                                <input type='file' onChange={(e) => setUserProfileImg(e.target.files[0])} />
                            </div>
                            <div className='single_input'>
                                <label>Password: </label>
                                <input type='password' placeholder='Please enter your password' onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className='signup_btn_container'>
                                <button type='submit' className='signup_btn'>Sign Up</button>
                            </div>
                        </form>
                    ) : (<Loading />)} */}

                    <form className='actual_form_container' onSubmit={signNewAgencyUser}>
                        <div className='single_input'>
                            <label>Username: </label>
                            <input type='text' placeholder='Please enter your username' onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='single_input'>
                            <label>Email: </label>
                            <input type='email' id="email_input" placeholder='Please enter your email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='single_input'>
                            <label>Profile Image: </label>
                            <input type='file' onChange={(e) => setUserProfileImg(e.target.files[0])} />
                        </div>
                        <div className='single_input'>
                            <label>Password: </label>
                            <input type='password' placeholder='Please enter your password' onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='signup_btn_container'>
                            <button type='submit' className='signup_btn'>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AgencySignupPage