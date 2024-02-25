import React from 'react'
import "./IndexPage.css"
import { Link } from 'react-router-dom'

const IndexPage = () => {
    return (
        <div className='main_outer_landingpage_container'>
            <div className='top_navbar_container'>
                <div className='logo_container'>
                    <h2>AgencyLinker</h2>
                </div>

                <ul className='navbar'>
                    <li>
                        <Link className='actual_link' to="">Home</Link>
                    </li>
                    <li>
                        <Link className='actual_link' to="">About</Link>
                    </li>
                    <li>
                        <Link className='actual_link' to="">Features</Link>
                    </li>
                    <li>
                        <Link className='actual_link' to="">Signup</Link>
                    </li>
                    <li>
                        <Link className='actual_link' to="">Signin</Link>
                    </li>
                </ul>
            </div>

            <div className='main_hero_main_outer_container'>
                <div className='hero_content_container'>
                    <h2>Welcome to AgencyLinker</h2>

                    <p>
                        This is the only platform to help your agency not only just grow
                        but also help you to manage and sustain that growth by allowing you 
                        to manage all your client communication and files all in one place 
                        and make the process not only simple for you as the agency but for all your 
                        clients under your belt. Signup Today for a new account today to enjoy the benefits
                    </p>

                    <button className='signup_btn'>
                        <Link className='actual_link_btn' to="/select_types">Signup for account</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IndexPage
