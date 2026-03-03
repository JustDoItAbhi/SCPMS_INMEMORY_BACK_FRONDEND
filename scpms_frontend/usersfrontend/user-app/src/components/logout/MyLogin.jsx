import React, { useEffect } from "react";

function MyLogin() {
  const API_BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL || 'http://localhost:8080';
  const REDIRECT_URI = import.meta.env.VITE_DIRECT_REDIRECT_URI ||"http://localhost:5173/callback";

  const clientID = import.meta.env.VITE_CLIENT_ID  ||"abhi";

  useEffect(() => {
    console.log("Redirecting to OAuth2 authorize...");
    const authUrl =
      `${API_BASE_URL}/oauth2/authorize?response_type=code` +
      `&client_id=${clientID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=openid%20profile` +
      `&state=xyz123`; // ⚠ note the & before state

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