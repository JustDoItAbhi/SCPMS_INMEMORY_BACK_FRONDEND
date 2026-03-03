// ✅ validateToken.js
import axios from 'axios'; // (You can keep this if you need it elsewhere, but it's unused here)

// Token validation function
const validateToken = (token) => {
  if (!token) return { valid: false, reason: 'No token' };

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const isExpired = now >= expiration;

    // console.log("🔍 Token validation:", {
    //   issuedAt: new Date(payload.iat * 1000).toLocaleString(),
    //   expiresAt: new Date(expiration).toLocaleString(),
    //   currentTime: new Date(now).toLocaleString(),
    //   isExpired: isExpired,
    //   timeUntilExpiry: Math.round((expiration - now) / 1000 / 60) + " minutes"
    // });

    return {
      valid: !isExpired,
      reason: isExpired ? 'Token expired' : 'Token valid',
      payload: payload
    };
  } catch (error) {
    console.log("❌ Token validation error:", error);
    return { valid: false, reason: 'Invalid token format' };
  }
};

export default validateToken;
