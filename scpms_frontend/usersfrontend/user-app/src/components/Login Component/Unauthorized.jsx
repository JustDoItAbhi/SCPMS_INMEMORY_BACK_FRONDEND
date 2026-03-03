// Unauthorized.js
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div style={{ 
      textAlign: "center", 
      padding: "50px",
      color: "white"
    }}>
      <h1>403 - Access Denied</h1>
      <p>You don't have permission to access this page.</p>
      <Link 
        to="/" 
        style={{ 
          color: "#1890ff", 
          textDecoration: "none",
          fontSize: "18px"
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Unauthorized;