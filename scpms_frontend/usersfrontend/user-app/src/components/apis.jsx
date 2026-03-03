import axios from "axios"
import axiosInstance from "../auth/AuthMiddleWear"
import { data, useNavigate } from "react-router-dom"
const BASE_URL = `${import.meta.env.VITE_DIRECT_BACKEND_URL}/api/user`;

export const GetAllUsers = async () => {
 const navigate=   useNavigate();
    try {
        console.log("🔍 Making GetAllUsers API call...");
        const response = await axiosInstance.get("/api/user/allUsers");
        console.log("✅ GetAllUsers success:", response.data);
        return response.data;
    } catch (err) {
        console.log("❌ GetAllUsers error details:", {
            message: err.message,
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
            headers: err.response?.headers
        });
        throw err;
    }
}
export const CreateUser = async (values) => {
    try {
        const create = await axios.post(`${BASE_URL}/createUser`, values, {
            headers: {
                Authorization: undefined, // Explicitly remove
                'Content-Type': 'application/json'
            },
            withCredentials: false // Important: disable credentials
        });
        console.log("✅ CreateUser success:", create);
        return create;
    } catch (err) {
        console.log("❌ CreateUser error:", err.message);
        throw err;
    }
}
export const FinishTeacherSignUp=async(userId,subject)=>{

    try {
        const teacherSignup = await axiosInstance.post(`/api/teachers/finishSignUP/${userId}/${subject}`);
        console.log("✅ CompleteTeacherSignup success:", teacherSignup);
        return teacherSignup;
    } catch (err) {
        console.log("❌ CompleteTeacherSignup error:", err.message);
        throw err;
    }
}

export const GetTeacherByidss=async(teacherId)=>{

    try {
        const teacher= await axiosInstance.get(`/api/teachers/getTeacherById/${teacherId}`);
        console.log("✅ CompleteTeacherSignup success:", teacher.data);
        return teacher.data;
    } catch (err) {
        console.log("❌ CompleteTeacherSignup error:", err.message);
        throw err;
    }
}

export const GetAllTheStdListForTeacher =async(teacherId)=>{
    try {
        const teacher= await axiosInstance.get(`/api/teachers/allTopicsByTeacherId/${teacherId}`);
        console.log("✅ LIST OF STUDNETS:", teacher.data);
        return teacher.data;
    } catch (err) {
        console.log("❌ LIST OF STUDNETS error:", err.message);
        throw err;
    }
}
export const GetTeacherByUserEmail =async(userEmail)=>{
    try {
        const teacher= await axiosInstance.get(`/api/teachers/getTeacherByUserEmail/${userEmail}`);
        console.log("✅ TEACHER BY USER EMAIL:", teacher.data); 
        return teacher.data;
    } catch (err) {
        console.log("❌ TEACHER BY USER EMAIL error:", err.message);
        throw err;
    }
}



export const DeleteTeacherByID=async(userId)=>{

    try {
        const teacherDelete = await axiosInstance.delete(`/api/teachers/deleteTeacher/${userId}`);
        console.log("✅ teacher deteted success:", teacherDelete.data);
        return teacherDelete.data;
    } catch (err) {
        console.log("❌ Teacher delete from api error:", err.message);
        throw err;
    }
}

export const getStudentByID=async(userId,studentData)=>{

    try {
        const studentSignup = await axiosInstance.post(`/api/students/completeStundentSignUp/${userId}`, studentData);
        console.log("✅ Complete STUDENT Signup success:", studentSignup);
        return studentSignup;
    } catch (err) {
        console.log("❌ Complete STUDENT Signup error:", err.message);
        throw err;
    }
}

export const LoginUser=async(value)=>{
    try{
        const login=await axiosInstance.post(`/api/user/Login`,value);
        
        console.log("LOGIN USERS",JSON.parse( login.data))
        return login.data
    }catch(err){
        console.log(err.message);
    }
}
export const DeleteUser=async(id)=>{
    try{
        const removeUser=await axiosInstance.delete(`/api/user/DeleteUserById/${id}`);
        console.log("DELETE USERS",removeUser.data)
        return removeUser.data
    }catch(err){
        console.log(err.message);
    }
}

export const DeleteSubject=async(id)=>{
    try{
        const removeUser=await axiosInstance.delete(`/api/students/deleteSubject/${id}`);
        console.log("DELETE USERS",removeUser.data)
        return removeUser.data
    }catch(err){
        console.log(err.message);
    }
}


export const GetUserById=async(id)=>{
    try{
        const response=await axiosInstance.get(`/api/user/getUserById/${id}`);
        console.log("user email",response.data.email);
        return response
    }catch(err){
        console.log(err.message);
    }
}

 export const SendOTP=async(email)=>{
    try{
        const response=await axiosInstance.get(`${BASE_URL}/sendOtp/${email}`);
        console.log(" OTP SENT ",response.data)
        return response.data
    }catch(err){
        console.log(err.message);
    }
}
 export const ResetPass=async(email,otp,pass)=>{
    try{
        const response=await axiosInstance.post(`${BASE_URL}/resetPassword`,{email:email,otp:otp,password:pass});
        console.log(" RESET BY ",response.data)
        return response.data
    }catch(err){
        console.log(err.message);
    }
}
 export const DeleteStudentDataFrom=async(studentId)=>{
    try{
        const response=await axiosInstance.delete(`api/students/delete/${studentId}`);
        console.log(" deleted student BY ",response.data)
        return response.data
    }catch(err){
        console.log(err.message);
    }
}

 export const DeleteFullUserDetails=async(userId)=>{
    try{
        const response=await axiosInstance.delete(`/api/students/deleteFullUser/${userId}`);
        console.log(" deleted student BY ",response.data)
        return response.data
    }catch(err){
        console.log(err.message);
    }
}


 export const GetStudentDetailById=async(id)=>{
    try{
        const response=await axiosInstance.get(`/api/students/getStudentById/${id}`);
        console.log("  student BY id ",response.data)
        return response.data
    }catch(err){
        console.log(err.message);
    }
}


const formatYear = (year) => {
  if (typeof year === 'number') {
    year = year.toString();
  }
  
  if (year.endsWith('st') || year.endsWith('nd') || year.endsWith('rd') || year.endsWith('th')) {
    return year; // Already formatted
  }
  
  const lastDigit = year.charAt(year.length - 1);
  switch (lastDigit) {
    case '1': return year + 'st';
    case '2': return year + 'nd';
    case '3': return year + 'rd';
    default: return year + 'th';
  }
};

 export const GetSubjectByYear=async(year)=>{
    try{
        const formattedYear = formatYear(year);
        const response=await axiosInstance.get(`/api/subject/getByYear/${formattedYear}`);
        console.log("SUBJECTS BY YEAR ",response.data)
        return response.data
    }catch(err){
        console.log(err.message);
    }
}


 export const GetSubjectAndStudentAllDetailsById=async(userId)=>{
    try{
        const response=await axiosInstance.get(`/api/students/getStudentSubjectDetails/${userId}`);
        console.log("SUBJECTS BY ID ",response.data.studentAndSubjectId)
        console.log("SUBJECTS BY ID STORE ",response.data)
        localStorage.setItem("subject",response.data.subject.subject)
        localStorage.setItem("studentAndSubjectId",response.data.studentAndSubjectId)
        return response
    }catch(err){
        console.log(err.message);
    }
}

export const registerSubjects = async (id, year, subjects) => {
  try {
    const formattedYear = formatYear(year);
    
    const subjectValue = Array.isArray(subjects) ? subjects[0] : subjects;//ITS A SINGLE SUBJECT 
    
    const response = await axiosInstance.post(`api/students/selectSubject/${id}`, { 
      subjectYear: formattedYear,  // Change 'year' to 'subjectYear'
      subject: subjectValue         // Ensure this is a string, not array
    });
    
    console.log("REGISTERED SUBJECT", response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering subjects:', error);
    throw error;
  }
};

 export const GetAllTeachersBySubjectName=async(subject)=>{
    try{
        const response=await axiosInstance.get(`/api/teachers/subject/${subject}`);
        console.log("TEACHRS BY SUBJECTS ",response.data)
        return response.data
    }catch(err){
        console.log(err.message);
    }
}

 export const WriteTopic=async(values)=>{
      try {
     
        const response = await axiosInstance.post(`/api/students/writeTopic`, values);
        console.log("Topic submitted successfully:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error submitting topic:", err.response?.data || err.message);
        throw err;
    }
}

 export const SetApprovalToTopicByTeacher=async(values)=>{
      try {
     
        const response = await axiosInstance.post(`/api/teachers/setTeacherTopicStataus`, values);
        console.log("Topic selection successfully:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error submitting topic:", err.response?.data || err.message);
        throw err;
    }
}
 export const GetTeacherApprovel=async(status)=>{
      try {
     
        const response = await axiosInstance.get(`/api/teachers/getApproveal/${status}`);
        console.log("STUDENTS STATUS FOR TEACHER :", response.data);
        return response.data;
    } catch (err) {
        console.error("Error submitting topic:", err.response?.data || err.message);
        throw err;
    }
}
 export const DeleteAllTeachersTopicByTeacherId=async(topicId)=>{
      try {
     
        const response = await axiosInstance.delete(`/api/teachers/deleteTopicByTeacherId/${topicId}`);
        console.log("TOPIC DELTED TEACHER :", response.data);
        return response.data;
    } catch (err) {
        console.error("Error submitting topic:", err.response?.data || err.message);
        throw err;
    }
}

 export const GetALLTopicsByTeacherid=async(teacherId)=>{
      try {
        const response = await axiosInstance.get(`/api/teachers/getAllTopicByTeacherTopicId/${teacherId}`);
        console.log("TEACHER AND TOPIC :", response.data);
        return response.data;
    } catch (err) {
        console.error("Error submitting topic:", err.response?.data || err.message);
        throw err;
    }
}
 export const ApproveTeacherProfile=async(values)=>{
 try {
        console.log("Sending teacher approval request:", values);
         const requestData = {
            teacherEmail: values.email,  
            role: values.roles           
        };
        
       const response = await axiosInstance.post(`/api/user/confirmTeacherRole`, requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("TEACHER APPROVAL SUCCESS:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error submitting TEACHER ROLE:", err.response?.data || err.message);
        
        // Throw the error so it can be caught in the component
        throw new Error(err.response?.data?.message || err.message || "Failed to approve teacher role");
    }
}