import { useEffect, useState } from "react";
import { DeleteFullUserDetails, DeleteStudentDataFrom, DeleteSubject, DeleteUser, GetAllUsers, GetStudentDetailById, GetSubjectAndStudentAllDetailsById } from "../apis";
import { useAuth } from "../Login Component/UseAuth";
import { Navigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../auth/AuthMiddleWear";
import { Button } from "antd";
import decodeJWT from "../apps/decodeJWT";

function Users() {
  const [getUsers, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();

  const getData = async () => {
    try {
      setError(null);
      setLoadingUsers(true);
      
      const token = localStorage.getItem('access_token');
      const decode=decodeJWT(token);
      console.log("TOKEN ",decode)
      // console.log("=== BEFORE API CALL ===");
      // console.log("Token in localStorage:", token);
      // console.log("User from auth:", user);
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      const users=await axiosInstance.get(`/api/user/allUsers`);

if (users.data.length > 0) {
    console.log("First user object:", users.data[1]);
console.log("Roles in first user:", users.data[0].rolesList); 
}
      setUsers(users.data);

      
    } catch (err) {
      console.log("Error in getData:", err);
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

const deleteUser = async (userId) => {
    try {
      if (!userId) {
        message.error("No user ID provided");
        return;
      }
      // if (!window.confirm("Are you sure you want to delete this user?")) {
      //   return;
      // }

      console.log("Deleting user with ID:", userId);
      const response = await DeleteFullUserDetails(userId); 
      if(response){
      console.log("REMOVED ", response);
      }
      
      // setMessage("User deleted successfully");
      
      // Refresh the users list after deletion
      getData();
      
    } catch (err) {
      console.log("Error deleting user:", err);
      message.error(err.message || "Failed to delete user");
    }
  };


  
  useEffect(() => {
      getData();
  }, [user]);

  const userRole = user?.roles?.[1];
  const isAdmin = userRole === "ADMIN";

  if (authLoading) {
    return <div>Loading authentication...</div>;
  }

  if (!user) {
    console.log("you are not a user")
    // return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    console.log("you are not admin")
    // return <Navigate to="/unauthorized" replace />;
  }

  

  return (
    <div style={{ position: "relative", zIndex: 10, color: "black", padding: "20px" }}>
      <h1>ADMIN PANEL - ALL STUDENTS PANNEL</h1>
      
      <div style={{ 
        background: "rgba(0,0,0,0.3)", 
        padding: "10px", 
        borderRadius: "4px",
        marginBottom: "20px",
        fontSize: "14px"
      }}>
        <strong>Your Details:</strong> 
        <br />User Role: <span style={{color: "lightgreen"}}>{userRole}</span>
        <br />Token: <span style={{color: localStorage.getItem('access_token') ? "lightgreen" : "red"}}>
          {localStorage.getItem('access_token') ? "Present" : "Missing"}
        </span>
        <br />Total Number of Clients: <span style={{color: "lightblue"}}>{getUsers.length}</span>
      </div>
      
      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          Error: {error}
        </div>
      )}
      
      {loadingUsers ? (
        <div>Loading users...</div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {getUsers.length > 0 ? (
            getUsers.map((user, index) => (
              <div key={user.id || index}>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 220,
                    minHeight: "140px",
                    background: "rgba(13, 12, 12, 0.5)",
                    padding: "15px",
                    borderRadius: "8px",
                  }}
                >
                  <li
                    style={{
                      background: "hsla(120, 100%, 50%, 0.3)",
                      fontSize: "18px",
                      padding: "5px 8px",
                      borderRadius: "4px",
                      marginBottom: "8px"
                    }}
                  >
                    {user.name}
                  </li>
                  <li><strong>Email:</strong> {user.email}</li>
                  <li><strong>ID:</strong> {user.id}</li>
                  <li><strong>Address:</strong> {user.address}</li>
    
        <li><strong>ROLES:</strong> 
          {user?.rolesList?.map(role => 
             JSON.stringify(role)
          ).join(", ") || "No roles"}
        </li>
                  <Button 
                    onClick={() => deleteUser(user.id)}
                    danger
                    type="primary"
                    style={{ marginTop: "10px" }}
                  >
                    DELETE
                  </Button>
                </ul>
                
              </div>
            ))
          ) : (
            <div>No users found</div>
          )}

        </div>
     
      )}
    </div>
  );
}

export default Users;