//     import React from "react";
// function FinalLoginPage(){



//   const API_BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL || 'http://localhost:8080';
//   const REDIRECT_URI = import.meta.env.VITE_DIRECT_REDIRECT_URI ||"http://localhost:5173/callback";

// console.log("you are in FINAL LOGIN PAGE")
//   return (
//     <div style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       backgroundColor: "#f0f2f5"
//     }}>
//       <div style={{
//         backgroundColor: "white",
//         padding: "30px",
//         borderRadius: "8px",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         width: "350px"
//       }}>
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//           Login
//         </h2>

//         {/* THIS FORM POSTS DIRECTLY TO SPRING */}
//         <form method="POST" action="http://localhost:8080/login">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             required
//             style={inputStyle}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             style={inputStyle}
//           />

//            <button type="submit" style={buttonStyle}>
//             Login
//           </button>
//          </form> 

//         <hr style={{ margin: "20px 0" }} />

//       </div>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "15px",
//   border: "1px solid #ddd",
//   borderRadius: "4px",
//   boxSizing: "border-box"
// };

// const buttonStyle = {
//   width: "100%",
//   padding: "12px",
//   backgroundColor: "#1877f2",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer"
// };

// export default FinalLoginPage;
