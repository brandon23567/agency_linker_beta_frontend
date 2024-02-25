import React from 'react'
import "./ClientContainerDetailPage.css"
import SideNavbar from '../../components/SideNavbar/SideNavbar'

const ClientContainerDetailPage = () => {
    return (
        <div className='main_client_container_detail_outer_container'>
            <div className='container'>
                <div className='navbar_container'>
                    <SideNavbar />
                </div>

                <div className='content_container'>
                    <h2>This is the detail page when u click the client container</h2>
                </div>
            </div>
        </div>
    )
}

export default ClientContainerDetailPage