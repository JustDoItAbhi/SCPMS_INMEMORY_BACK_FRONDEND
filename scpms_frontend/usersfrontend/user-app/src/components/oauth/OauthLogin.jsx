import React from "react";
import '../oauth/OauthLoginCss.css'

const OauthLogin = () => {
        console.log("oauth login")
    useEffect(() => {
  // Check if backend is accessible
  console.log("1ST REQUEST")
    const API_BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL;
  const REDIRECT_URI = import.meta.env.VITE_DIRECT_REDIRECT_URI;
  fetch(API_BASE_URL)
    .then(response => {
      if (response.ok) {
        console.log('Backend server is running');
      } else {
        console.error('Backend server responded with error:', response.status);
      }
    })
    .catch(error => {
      console.error('Cannot reach backend server:', error);
    });
}, []);

    const handleLogin = () => {
          console.log("2ND REQUEST")
    const params = new URLSearchParams({
      response_type: "code",
      client_id: "abhi",
      redirect_uri: {REDIRECT_URI},
   scope: "openid profile",
      // Remove client_secret from authorization request
    });
  console.log("1st step call login oauth2 server REQUEST")
    // window.location.href = `https://scpms*************/oauth2/authorize?${params}`;
  };

  return (
    <div className="but">
      <button onClick={handleLogin}>Login with OAuth2</button>
    </div>
  );
};

export default OauthLogin;

