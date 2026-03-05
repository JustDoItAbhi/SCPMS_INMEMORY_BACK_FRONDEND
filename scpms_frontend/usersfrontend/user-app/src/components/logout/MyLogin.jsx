import React, { useEffect } from "react";

function MyLogin() {
  const API_BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL;
  const REDIRECT_URI = import.meta.env.VITE_DIRECT_REDIRECT_URI;
  // const REDIRECT_URI =`https://scpms-frontend-nrcx.onrender.com/callback`
  console.log("backend url ",API_BASE_URL);
  console.log("frontend url ",REDIRECT_URI);


  const clientID = import.meta.env.VITE_CLIENT_ID  ||"abhi";
  console.log("client ",clientID);

  useEffect(() => {
    console.log("Redirecting to OAuth2 authorize...");
    const authUrl =
      `${API_BASE_URL}/oauth2/authorize?response_type=code` +
      `&client_id=${clientID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&scope=openid%20profile` ;
      // `&state=xyz123`;
      // `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    console.log("AUTH URL:", authUrl);
    window.location.href = authUrl; // triggers redirect
  }, []);

  return (
    <div style={containerStyle}>
      <h3>Redirecting to login...</h3>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f0f2f5"
};

export default MyLogin;