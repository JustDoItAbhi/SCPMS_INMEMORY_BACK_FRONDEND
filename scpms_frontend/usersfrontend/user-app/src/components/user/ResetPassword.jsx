import { useState } from "react";
import { ResetPass, SendOTP } from "../apis";
import { useNavigate } from "react-router-dom";
// import {userNavigate} from "react-router-dom"

function ResetPassword() {
 const navigate= useNavigate();
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const[req,setRequest]=useState([]);
  console.log("email ",email , "pass ", pass,"otp",otp)

  const handleRest = async () => {
    try {
      const response = await ResetPass(email,otp,pass);
      console.log("RES FROM RESET PASSWORD ", response);
      if (response) {
        console.log("RES ", response);
        setRequest(response)
        navigate("/Login")
      }
    } catch (err) {
      console.log("ERROR",err.message);
    }
  }


  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>ENTER YOUR DETAILS</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Enter your OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Enter your New Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />
      <button
        onClick={handleRest}
        disabled={loading}
        style={{ padding: "8px 15px", cursor: "pointer" }}
      >
        {loading ? "Sending..." : "CONFIRM OTP"}
      </button>
      {/* {message && <p style={{ marginTop: 10 }}>{message}</p>} */}
    </div>
  )
}
export default ResetPassword;