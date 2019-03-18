import React from 'react';
import user_icon from './user_icon.png';
import './User.css';

const User = ({username}) => {
    return (
        <div className='user'>
            <img className='user_icon' src={user_icon}/>
            <p className='user_name'>{username}</p>
        </div>
    )
}

export default User;