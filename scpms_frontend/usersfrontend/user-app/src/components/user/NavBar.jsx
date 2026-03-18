import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
                        console.log("USER", userData )
        if (userData) {
            try {
                const user = JSON.parse(userData);
                console.log("USERs", user )
                setUserId(user.id);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleMyProfileClick = () => {
        if (userId) {
            // Navigate directly to the user's profile
            navigate(`/GetById/${userId}`);
        } else {
            // Redirect to login if no user ID found
            navigate('/Login');
        }
    };

    return (
        <nav style={{
            background: "#1890ff", 
            padding: "15px 20px",
            display: "flex",
            gap: "30px",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
                 <Link to="/Home" style={{ color: "white", textDecoration: "none" }}>HOME</Link>
            {/* <Link to="/USER" style={{ color: "white", textDecoration: "none" }}>USERS</Link>  */}
            
            {/* My Profile with click handler */}
             <span 
                onClick={handleMyProfileClick}
                style={{ 
                    color: "white", 
                    textDecoration: "none",
                    cursor: "pointer"
                }}
            >
                MY PROFILE
            </span>
         
             <Link to="/USER" style={{ color: "white", textDecoration: "none" }}>USERS</Link>
            <Link to="/create" style={{ color: "white", textDecoration: "none" }}>SIGN UP</Link>
            <Link to="/Login" style={{ color: "white", textDecoration: "none" }}>LOGIN</Link>
            <Link to="/SENDOTP" style={{ color: "white", textDecoration: "none" }}>SEND OTP</Link>
            <Link to="/logout" style={{color: "white", textDecoration: "none"}}>LOGOUT</Link>
            <Link to="/TEACHER-APROVEL" style={{color: "white", textDecoration: "none"}}>APPROVE TEACHR</Link>
            <Link to="/AllTeacherApplicents" style={{color: "white", textDecoration: "none"}}>ALL TEACHER REQ</Link>
        </nav>
    );
}

export default NavBar;