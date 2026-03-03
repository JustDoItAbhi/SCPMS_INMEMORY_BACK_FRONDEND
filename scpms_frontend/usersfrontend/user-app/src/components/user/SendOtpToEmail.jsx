import { useState } from "react";
import { ResetPass, SendOTP } from "../apis";
import {useNavigate} from "react-router-dom"

function SendOtpToEmail(){
const navigate=  useNavigate();
 const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter an email");
      return;
    }

    setLoading(true);
    try {
      const response = await SendOTP(email);
      console.log("OTP Response:", response);

      // Show success message (depends on your backend response)
      if(response){
        navigate("/RESETPASSWORD")
      }
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };


    return(
    <div style={{ margin:"0px",height:"100vh", textAlign: "center", background:"content-box radial-gradient(rgba(173, 153, 157, 1), rgba(110, 114, 119, 1))"}}>
      <h2>Send OTP</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", width: "30vw", marginBottom: "10px" }}
      />
      <button
        onClick={handleSendOtp}
        disabled={loading}
        style={{ padding: "8px 15px", cursor: "pointer" }}
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );

}
export default SendOtpToEmail;