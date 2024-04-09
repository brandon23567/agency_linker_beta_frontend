import React from 'react'
import "./DemoVideoPage.css"

const DemoVideoPage = () => {
    return (
        <div className='main_outer_demo_vid_page_container'>
            <div className='container'>
                <video controls>
                    <source src='https://res.cloudinary.com/dhx2dmixw/video/upload/v1712678441/agency_linker_demo_video_h0juoj.mp4' />
                </video>
            </div>
        </div>
    )
}

export default DemoVideoPage