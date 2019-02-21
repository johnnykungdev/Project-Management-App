import React from 'react';

const SignOut = ({ onRouteChange }) => {
    return (
            <button onClick={() => onRouteChange('Login')}>Sign Out</button>
    )
}

export default SignOut;