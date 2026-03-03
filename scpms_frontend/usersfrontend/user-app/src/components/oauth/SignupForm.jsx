
import React, { useState } from "react";

function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
    rolesList: "ROLE_USER",
    address:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://unvocalized-irretrievably-roman.ngrok-free.dev/api/user/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      alert("Signup successful!");
      window.location.href = "https://frontend-oauth-direct.onrender.com/login";
    } else if (response.status === 409) {
      alert("User already exists. Redirecting to login.");
      window.location.href = "https://frontend-oauth-direct.onrender.com/api/login";
    } else {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
    
      <input name="address" placeholder="Address" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
