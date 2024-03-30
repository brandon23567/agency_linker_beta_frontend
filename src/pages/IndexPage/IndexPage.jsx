import React from 'react'
import "./IndexPage.css"
import { Link } from 'react-router-dom'
import Image1 from "../../images/test_imgs/demo_dashboard.png"

import FeatureIcon1 from "../../images/test_imgs/bucket-list.png"
import FeatureIcon2 from "../../images/test_imgs/customer-satisfaction.png";
import FeatureIcon3 from "../../images/test_imgs/dashboard.png";
import FeatureIcon4 from "../../images/test_imgs/folders.png";
import FeatureIcon5 from "../../images/test_imgs/send-mail.png";
import FeatureIcon6 from "../../images/test_imgs/task.png";

const IndexPage = () => {
    return (
        <div className='maian_outer_landing_page_container'>
            <div className='top_navbar_container'>
                <div className='logo_container'>
                    <Link to="/" className='nav_logo_link'>
                        <h2>AgencyLinker</h2>
                    </Link>
                </div>

                <ul className='actual_top_navbar'>
                    <li>
                        <Link to="/" className='actual_nav_link'>Home</Link>
                    </li>

                    <li>
                        <Link to="/" className='actual_nav_link'>About</Link>
                    </li>

                    <li>
                        <Link to="/" className='actual_nav_link'>Features</Link>
                    </li>

                    <li>
                        <Link to="/" className='actual_nav_link'>Pricing</Link>
                    </li>
                </ul>
            </div>

            <div className='main_landing_hero_outer_container'>
                <div className='hero_container'>
                    <h2>We would like to welcome you to:</h2>
                    <h1><span>AgencyLinker</span></h1>

                    <p>
                        The only platform your agency needs to be successful so you can grow, manage and scale all 
                        your clients, projects and work. And we always have your best interest at heart so you can 
                        focus on your work without any fear or worry.
                    </p>

                    <div className='cta_btns_container'>
                        <button className='cta_btn signup_btn'>
                            <Link to="/select_types" className='actual_btn_link'>Signup For Account</Link>
                        </button>
                        <button className='cta_btn demo_vid_btn'>
                            <Link to="/select_types" className='actual_btn_link'>Check Demo Video</Link>
                        </button>
                    </div>
                </div>
            </div>

            <div className='main_about_us_outer_container'>
                <div className='about_us_container'>
                    <div className='about_us_leftside'>
                        <h2>Now, <span>why</span> should you even listen to us??</h2>

                        <p className='subtext_of_heading'>
                            Because we grow along with you and your business and your businesses best interest 
                            is out best interest
                        </p>

                        <p className='actual_about_us_text'>
                            Here at agency linker, we are not just like any other tool and you are not just any 
                            other business in our eyes. When you signup to our platform you have joined our family 
                            and we treat you in such a manner that represents that aspect. We provide you with the tools 
                            you need not only to manage all your current clients but as well as the new clients you 
                            will recieve as your agency and business grows. Not only that but we also help and offer 
                            internal team communication and collaboration to make it easier for everyone involved
                        </p>

                        <button className='join_about_us_btn'>Join The Family</button>
                    </div>
                    <div className='about_us_rightside'>
                        <img src={Image1} className='about_us_image' alt='about_us_dashboard' />
                    </div>
                </div>
            </div>

            <div className='features_main_outer_container'>
                <h2>All the <span>features</span> currently available on our platform</h2>
                <div className='features_container'>
                    <div className='single_feature'>
                        <div className='single_feature_icon_img_container'>
                            <img src={FeatureIcon6} className='icon_img' alt='this is the feature_icon' />
                        </div>
                        <h3>Task creation & management</h3>
                    </div>
                    <div className='single_feature'>
                        <div className='single_feature_icon_img_container'>
                            <img src={FeatureIcon2} className='icon_img' alt='this is the feature_icon' />
                        </div>
                        <h3>Client Containers & management</h3>
                    </div>
                    <div className='single_feature'>
                        <div className='single_feature_icon_img_container'>
                            <img src={FeatureIcon4} className='icon_img' alt='this is the feature_icon' />
                        </div>
                        <h3>Files & document storage</h3>
                    </div>
                    <div className='single_feature'>
                        <div className='single_feature_icon_img_container'>
                            <img src={FeatureIcon1} className='icon_img' alt='this is the feature_icon' />
                        </div>
                        <h3>Team creation & management</h3>
                    </div>
                    <div className='single_feature'>
                        <div className='single_feature_icon_img_container'>
                            <img src={FeatureIcon5} className='icon_img' alt='this is the feature_icon' />
                        </div>
                        <h3>Client Requests</h3>
                    </div>
                    <div className='single_feature'>
                        <div className='single_feature_icon_img_container'>
                            <img src={FeatureIcon3} className='icon_img' alt='this is the feature_icon' />
                        </div>
                        <h3>A dedicated dashboard for your client</h3>
                    </div>
                </div>
            </div>


            <div className='join_us_main_outer_container'>
                <div className='join_us_container'>
                    <h2>Join us today to experience it all and see what first class service is</h2>

                    <div className='signup_email_newsletter_container'>
                        <input type='text' placeholder='Please enter your email here for new updates to the software' />

                        <button className='join_letter_btn'>Join</button>
                    </div>
                </div>
            </div>

            <div className='main_outer_footer_container'>
                <div className='footer_container'>
                    <div className='footer_leftside'>
                        <h2>AgencyLinker</h2>
                    </div>

                    <div className='footer_rightside'>

                        <ul className='footer_nav_links'>
                            <li>
                                <Link to="/" className='actual_footer_link'>Home</Link>
                            </li>

                            <li>
                                <Link to="/" className='actual_footer_link'>About</Link>
                            </li>

                            <li>
                                <Link to="/" className='actual_footer_link'>Features</Link>
                            </li>

                            <li>
                                <Link to="/" className='actual_footer_link'>Newsletter</Link>
                            </li>

                            <li>
                                <Link to="/" className='actual_footer_link'>Pricing</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexPage
