import React from 'react'
import './Admin.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
function AdminNav(props) {
   
    return (
        <nav className='adminNav navbar navbar-expand navbar-dark'>
            <div className="container-fluid">
                <h1 className='adminlogo navbar-brand'>Admin Panel</h1>
                <span className='mx-5 notification'>
                    <span data-count={props.count} className='Notify_count redbulb'></span>
                    <NotificationsIcon className='tinkle'/>
                </span>
            </div>
        </nav>
    )
}

export default AdminNav