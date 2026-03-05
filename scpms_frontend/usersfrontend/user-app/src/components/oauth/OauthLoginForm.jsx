import React from 'react';

const OauthLoginForm = () => {
//     const API_BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL || 'http://localhost:8080';
//   const REDIRECT_URI = import.meta.env.VITE_DIRECT_REDIRECT_URI ||"http://localhost:5173/callback";
// // const URL= `${API_BASE_URL}/oauth2/authorize?response_type=code` +
//       `&client_id=${clientID}` +
//       `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
//       `&scope=openid%20profile` +
//       `&state=xyz123`;

    console.log("4TH REQUEST OAUTH LOGIN FORM")
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>

      <h2>Login with OAuth2</h2>

     <a href='URL'>  </a>

  <button style={{ padding: '10px 20px', fontSize: '16px' }}>
    Login</button>



      
    </div>
  );
};

export default OauthLoginForm;
