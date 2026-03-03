import React from "react";
import '../oauth/OauthLoginCss.css'

const OauthLogin = () => {
        console.log("oauth login")
    useEffect(() => {
  // Check if backend is accessible
  console.log("1ST REQUEST")
  fetch('http://localhost:8080/')
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
      redirect_uri: "http://localhost:5173/callback",
   scope: "openid profile",
      // Remove client_secret from authorization request
    });
  console.log("1st step call login oauth2 server REQUEST")
    window.location.href = `http://localhost:8080/oauth2/authorize?${params}`;
  };

  return (
    <div className="but">
      <button onClick={handleLogin}>Login with OAuth2</button>
    </div>
  );
};

export default OauthLogin;

