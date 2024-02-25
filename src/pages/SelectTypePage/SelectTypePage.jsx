import React from 'react'
import "./SelectTypePage.css"
import { Link } from 'react-router-dom'

import AgencyIcon from "../../images/icons/digital-advertising.png"
import AgencyClientIcon from "../../images/icons/customer-service.png"

const SelectTypePage = () => {
    return (
        <div className='main_slect_type_outer_container'>
            <div className='container'>
                <div className='top_navbar_container'>
                    <div className='logo_container'>
                        <h2>AgencyLinker</h2>
                    </div>

                    <ul className='navbar_container'>
                        <li>
                            <Link to="" className='nav_link'>Home</Link>
                        </li>
                        <li>
                            <Link to="" className='nav_link'>Signup</Link>
                        </li>
                        <li>
                            <Link to="" className='nav_link'>Signin</Link>
                        </li>
                    </ul>
                </div>

                <div className='content_container'>
                    <h2>Select your character avatar....</h2>

                    <div className='slection_container'>
                        <div className='single_selection'>
                            <div className='single_selection_top_part'>
                                <img src={AgencyIcon} alt='agency_icon_img' className='agency_icon_img' />
                            </div>
                            <div className='single_selection_bottom_part'>
                                <Link to="/select_types/agency_signup" className='actual_name_link'>
                                    <h2>Agency</h2>
                                </Link>
                            </div>
                        </div>

                        <div className='single_selection'>
                            <div className='single_selection_top_part'>
                                <img src={AgencyClientIcon} alt='agency_icon_img' className='agency_icon_img' />
                            </div>
                            <div className='single_selection_bottom_part'>
                                <Link to="/select_types/client_signup" className='actual_name_link'>
                                    <h2>Agency Client</h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectTypePage