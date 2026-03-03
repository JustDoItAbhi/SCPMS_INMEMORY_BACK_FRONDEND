import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decodeJWT from "../apps/decodeJWT";
import { GetTeacherByUserEmail, GetUserById } from "../apis";

// CallbackHandler.jsx
const CallbackHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");

      if (!code) {
        navigate("/login?error=no_code");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/auth/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            redirectUri: "http://localhost:5173/callback"
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Token exchange failed:", errorData);
          navigate("/login?error=token_exchange_failed");
          return;
        }

        const tokens = await response.json();
        console.log("Tokens received successfully");

        // Store tokens
        localStorage.setItem("access_token", tokens.access_token);
        if (tokens.refresh_token) {
          localStorage.setItem("refresh_token", tokens.refresh_token);
        }
        if (tokens.id_token) {
          localStorage.setItem("id_token", tokens.id_token);
        }
if (tokens.access_token) {
  const decodedToken = decodeJWT(tokens.access_token);
  console.log("Full decoded token:", decodedToken);
  
  if (decodedToken) {
    // Log specific claims safely
    console.log("User roles:", decodedToken.roles || decodedToken.authorities || []);
    console.log("User subject (sub):", decodedToken.sub);
    console.log("User email:", decodedToken.email || decodedToken.sub);
    console.log("User ID:", decodedToken.id || decodedToken.userId);
    
    // Create user object
    const user = {
      roles: decodedToken.roles || decodedToken.authorities || [],
      email: decodedToken.email || decodedToken.sub,
      userId: decodedToken.id || decodedToken.userId || decodedToken.sub,
      name: decodedToken.name || decodedToken.preferred_username || '',
      // Add timestamp for when this was stored
      storedAt: new Date().toISOString()
    };
     // Store as JSON string
    localStorage.setItem("user", JSON.stringify(user));
    // console.log("roles",user.roles);
    localStorage.setItem("roles",JSON.stringify(user.roles))
  }
}
 try {

                    const user =JSON.parse(localStorage.getItem("user"));
                    console.log("userId", user.userId)


                    const getUser = await GetUserById(user.userId);
                    console.log("USER" ,getUser.data)
                    localStorage.setItem("userEmail",getUser.data.email);

                    // console.log("get user from local , ", getUser.data.rolesList[0]);
                    const userRole = localStorage.getItem("roles");
                      const roles = userRole ? JSON.parse(userRole) : [];
                   console.log("USER ROLES:", userRole);
                    if(userRole.includes("ADMIN")){
                        navigate("/USER")
                        return;
                    }
                    const studentId = localStorage.getItem("studentId");
                    if (!studentId && studentId === "undefined") {
                        navigate("/STUDENTSIGNUP")
                     return;
                      } else if (studentId) {
                        navigate("/Student-dashboard")
                        return;
                    }
                    else {
                        if (userRole.includes("STUDENT")) {
                            navigate("/STUDENTSIGNUP");
                            return;
                        } else if (userRole.includes("TEACHER")|| teacherRole==="TEACHER") {
                            try {
                                const teacherId = localStorage.getItem("teacherId");
                                const userEmail = localStorage.getItem("userEmail");

                                if (teacherId) {
                                    navigate("/TEACHER-PROFILE");
                                    return; 
                                }

                                // If no teacherId but we have email, try to get teacher data
                                if (userEmail) {
                                    const getteacherbyemail = await GetTeacherByUserEmail(userEmail);

                                    if (getteacherbyemail) {
                                        // Store the teacher ID properly
                                        localStorage.setItem("teacherId", getteacherbyemail);
                                        navigate("/TEACHER-PROFILE");
                                    } else {
                                        // Teacher not found, need to sign up
                                        navigate("/TEACHERSIGNUP");
                                    }
                                } else {
                                    // No email found, need to sign up
                                    navigate("/TEACHERSIGNUP");
                                }
                            } catch (error) {
                                console.error("Error fetching teacher data:", error);
                                // On error, redirect to signup
                                navigate("/TEACHERSIGNUP");
                            }
                        }
                    }

        } catch (err) {
                        console.error("Login error:", err);
                        setError(err.response?.data?.error || err.message || 'Login failed');
                    } finally {
                        setLoading(false);
                    }  
      } catch (err) {
        console.error("Token exchange error:", err);
        navigate("/login?error=server_error");
      }
      
    };

    exchangeCodeForToken();
  }, [location, navigate]);

  return <div>Processing login...</div>;
};

export default CallbackHandler;