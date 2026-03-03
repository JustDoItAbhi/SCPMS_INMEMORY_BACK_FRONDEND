// LogoutButton.jsx
import React from 'react';
import { logout } from '../user/Logout';
 

function LogoutButton() {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="logout-btn"
        >
            Logout
        </button>
    );
}

export default LogoutButton;