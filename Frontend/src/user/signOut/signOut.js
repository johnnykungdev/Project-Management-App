import React from 'react';
import './signOut.css';

const SignOut = ({ onRouteChange }) => {
    return (
            <button className='sign-out' onClick={() => onRouteChange('Login')}>Sign Out</button>
    )
}

export default SignOut;