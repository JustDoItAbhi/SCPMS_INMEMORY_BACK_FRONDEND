import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_DIRECT_BACKEND_URL}/api/user`;

export const StudentSendingOtpForSignUP = async (values) => {
    try {
        const sendOtp = await axios.post(`${BASE_URL}/StudentSignUp`, values);
        console.log("YOUR OTP ",sendOtp.data);
        return sendOtp.data;
    } catch (err) {
        console.log(err.message);
    }
}

export const ConfimeStudentOtp = async (values) => {
    try {
        const response = await axios.post(`${BASE_URL}/ConfirmStudentSignUp/otp`, values);

        console.log("OTP Verification Response:", response.data);
        return response.data; 

    } catch (err) {
        console.error("OTP Verification Error:", err);

        if (err.response) {
            console.error("Response status:", err.response.status);
            console.error("Response data:", err.response.data);
        } else if (err.request) {
            console.error("No response received:", err.request);
        } else {
            console.error("Error setting up request:", err.message);
        }

        const errorMessage = err.response?.data ||
            err.message ||
            "OTP verification failed";

        throw new Error(errorMessage);
    }
}