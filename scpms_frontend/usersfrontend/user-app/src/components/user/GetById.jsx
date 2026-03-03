import { useEffect, useState } from "react";
import { GetUserById } from "../apis";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../Login Component/UseAuth";
import  decodeJWT  from "../apps/decodeJWT";

function GetById() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [searchPharm] = useSearchParams();
  const { id } = useParams();




  useEffect(() => {
    const handleUserById = async () => {
      try {
          // const token = localStorage.getItem("access_token");
          
          // if (token) {
          //   const decodedToken=decodeJWT(token);
          //   if(decodedToken){
          //     const userFromStorage={
          //       id:decodedToken.id,
          //       email:decodedToken.email,
          //       roles: decodedToken.roles || [],
          //                   grantAuthority: decodedToken.roles?.[0] || 'USER',
          //     name: decodedToken.sub || decodedToken.email, // Use sub as name or email
          //     // Add other fields as needed
          //   };
          //   console.log("USER FROM TOKEN:", userFromStorage);
          //   setUser(userFromStorage);
          //   return;
          //   }

          // }

        // Fallback to localStorage user data
        const userFromStorage = localStorage.getItem("user");
        if (userFromStorage) {
          const parsedUser = JSON.parse(userFromStorage);
          console.log("USER FROM LOCALSTORAGE:", parsedUser);
          setUser(parsedUser);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.log("Error:", err.message);
        setError("Failed to fetch user data");
      }
    };
    handleUserById();
  }, [id]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome</h1>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: 10 }}>
          {error}
        </p>
      )}

      {user && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            background: "#a79494ff",
            maxWidth: 400,
            margin: "20px auto",
            borderRadius: "8px",
          }}
        >
          <h2>User ID: {user.id}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Authority:</strong> {user.grantAuthority}</p>
          <p><strong>Subject:</strong> {user.sub}</p>
          {user.username && <p><strong>Name:</strong> {user.username}</p>}
          {user.address && <p><strong>Address:</strong> {user.address}</p>}
          {user.rolesList && (
            <p>
              <strong>Roles:</strong> {user.rolesList.join(", ")}
            </p>
          )}
        </div>
      )}
    </>
  );
}
export default GetById;
