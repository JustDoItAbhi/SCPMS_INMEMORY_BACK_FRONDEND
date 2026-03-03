import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import decodeJWT from "../apps/decodeJWT";
import { GetTeacherByUserEmail } from "../apis";

const Callback = () => {
  const navigate = useNavigate();
  console.log("call back");

  const handleTokenExchange = async (code) => {
      const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  
    console.log("6TH REQUEST",clientId, "secret ",clientSecret);
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', 'http://localhost:5173/callback'); 
      params.append('client_id', clientId);

      console.log("7TH REQUEST");
      const response = await axios.post(
        'http://localhost:8080/oauth2/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)

          }
        }
      );

      console.log("8TH REQUEST", response.data.id_token);

      // Extract the access token properly
      const accessToken = response.data.id_token;
      const decode =decodeJWT(accessToken);
      console.log("token here ",decode);
      
      localStorage.setItem("email", decode.sub);
       const userEmails=localStorage.getItem("email");
                                if (userEmails) {
                                    const getteacherbyemail1 = await GetTeacherByUserEmail(userEmails);
                                    console.log(getteacherbyemail1);
                                  }else{
                                  console.error("user not found "+userEmails);
                                }

      if(decode.roles[0]==="ADMIN"){
         localStorage.setItem("admin", decode.roles[0]);
         localStorage.setItem("user",decode.roles[0])
      }else if(decode.roles[0]==="TEACHER"){
           localStorage.setItem("teacher", decode.roles[0]);
      }else if(decode.roles[0]==="STUDENT"){
              localStorage.setItem("student", decode.roles[0]);
      }else if(decode.roles[1]==="TEACHER"){
          localStorage.setItem("teacher", decode.roles[1]);
      }else if(decode.roles[1]==="STUDENT"){
          localStorage.setItem("student", decode.roles[1]);
      }
      const studentsDetail=localStorage.getItem("student");
      const teachersDetail=localStorage.getItem("teacher");
      const adminlevel=localStorage.getItem("admin");
      if(adminlevel==="ADMIN"){
        navigate("/USER")
      }
                    if (studentsDetail === "undefined") {
                        navigate("/STUDENTSIGNUP")
                    } else if (studentsDetail) {
                        navigate("/Student-dashboard")
                    }
                    else {
                        if (studentsDetail === "STUDENT") {
                            navigate("/STUDENTSIGNUP");
                        } else if (teachersDetail === "TEACHER") {
                            try {
                                if (teachersDetail) {
                                    navigate("/TEACHER-PROFILE");
                                    return; 
                                }

                                // If no teacherId but we have email, try to get teacher data
                              const userEmails=localStorage.getItem("email");
                                if (userEmails) {
                                    const getteacherbyemail = await GetTeacherByUserEmail(userEmails);

                                    if (getteacherbyemail) {
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

    } catch (error) {
      console.error('Token exchange error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    console.log("9TH REQUEST");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      console.error('OAuth error:', error);
      // navigate("/login");
      return;
    }

    if (code) {
      handleTokenExchange(code);
    }
  }, [navigate]);

  return <p>Processing login...</p>;
};

export default Callback;
