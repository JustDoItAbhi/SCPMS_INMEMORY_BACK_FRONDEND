import React from 'react';

const OauthLoginForm = () => {

    console.log("4TH REQUEST OAUTH LOGIN FORM")
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login with OAuth2</h2>
     <a
href = "http://localhost:8080/oauth2/authorize?response_type=code&client_id=abhi&redirect_uri=http://localhost:5173/callback&scope=openid profile"

>
  <button style={{ padding: '10px 20px', fontSize: '16px' }}>Login</button>
</a>

      
    </div>
  );
};

export default OauthLoginForm;
