import { useState, useEffect } from 'react';

const ProtectedRoute = ({ requiredRole, children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log("USER FROM PROTECTED ROUTE", userData);

        if (userData) {
            setUser(userData);
            console.log("USER ROLE FROM PROTECTED ROUTE", userData.roles);

            // Find ADMIN role
            let adminRole = null;
            if (userData.roles) {
                for (let i = 0; i < userData.roles.length; i++) {
                    if (userData.roles[i] === "ADMIN") {
                        adminRole = "ADMIN";
                        break;
                    }
                }
            }
            console.log("ROLE", adminRole);
            setRole(adminRole);
        }

        setLoading(false);
    }, []);

    console.log("ProtectedRoute - requiredRole:", requiredRole);
    console.log("ProtectedRoute - user:", user);
    console.log("ProtectedRoute - loading:", loading);
    console.log("ProtectedRoute - role:", role);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in</div>;
    }

    if (requiredRole && role !== requiredRole) {
        return <div>Access denied. Required role: {requiredRole}</div>;
    }

    return children;
};

export default ProtectedRoute;