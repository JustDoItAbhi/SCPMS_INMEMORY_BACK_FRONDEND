import { Routes, Route, useLocation } from 'react-router-dom';
import OauthLoginForm from '../oauth/OauthLoginForm';
import SignupForm from '../oauth/SignupForm';
// import Callback from '../oauth/Callback';
import GetList from '../oauth/GetList';
// import Dashboard from '../oauth/Dashboard';
import Users from '../user/Users';
import CreatingUsers from '../user/CreatingUsers';
import NavBar from '../user/NavBar';
import GetById from "../user/GetById";
import ResetPassword from '../user/ResetPassword';
import SendOtpToEmail from '../user/SendOtpToEmail';
import ProtectedRoute from '../Login Component/ProtectedRoute';
import AuthLogin from '../Login Component/AuthLogin';
import ROLE from '../constrains/Roles';
import Unauthorized from '../Login Component/Unauthorized';
import HomePage from '../home/HomePage';
import StudentsSignup from '../Students/StudentsSignup';
import TeachersSignup from '../teachers/TeachersSignup';
import DeleteStudent from '../Students/DeleteStudent';
import SubjectYear from '../Dashboard/SubjectYear';
import RegisterToSubject from '../Dashboard/RegisterToSubject';
import Profile from '../home/Profile';
import StudentTopic from '../Dashboard/StudentTopic';
import TeacherProfile from '../teachers/TeacherProfile';
import StudentRequests from '../teachers/StudentRequests';
import DeleteAllTopics from '../teachers/DeleteAllTopics';
import TopicPage from '../TOPICS/TopicPage';
import StudentSignupWithOtp from '../PRE-REQUESTS-SIGNUP/StudentSignupWithOtp';
import CheckOtp from '../PRE-REQUESTS-SIGNUP/SIGNUP-APIS/CheckOtp';
import TeacherWaitingPage from '../PRE-REQUESTS-SIGNUP/TeacherWaitingPage';
import ContactUs from '../home/ContactUs';
import ApproveTeacher from '../ADMIN/ApproveTeacher';
import MyLogin from '../logout/MyLogin';
import CallbackHandler from '../testingLogin/CallbackHandler';
import LogoutButton from '../logout/LogoutButton';
import CreatingTeacher from '../user/CreateTeacher';
import AllApplicantTeachersRequest from '../ADMIN/AllApplicantTeachersRequest';
import InMemoryChat from '../chat/InMemoryChat ';




function AppContent() {
  const location = useLocation();
  const showNavBar = ['/USER',  '/GetList', '/dashboard', '/unauthorized'].includes(location.pathname)
    || location.pathname.startsWith('/GetById/');

  return (
    <>
    {/* <HomePage /> */}
      {showNavBar && (
        <div style={{ position: "relative", zIndex: 2 }}>
          <NavBar />
        </div>
      )}

      <Routes>
             <Route path="/" element={<HomePage />} />
        <Route path="/final-login" element={<AuthLogin />} />
        <Route path="/mylogin" element={<MyLogin />} />

        <Route path="/callback" element={<CallbackHandler />} />

        <Route path="/signup" element={<SignupForm />} />
        {/* <Route path="/callback" element={<Callback />} /> */}

        <Route path="/SEND-OPT-FOR-SIGNUP" element={<StudentSignupWithOtp />} /> 
        <Route path="/CHECK-OTP-FOR-SIGNUP" element={<CheckOtp />} />

           <Route path="/chat" element={<InMemoryChat />} />


        <Route path="/RESETPASSWORD" element={<ResetPassword />} />
        <Route path="/SENDOTP" element={<SendOtpToEmail />} />
        <Route path="/GetById/:id" element={<GetById />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/create" element={<CreatingUsers />} />
        <Route path="/createteacher" element={<CreatingTeacher/>} />
   
        <Route path="/STUDENTSIGNUP" element={<StudentsSignup />} />
        <Route path="/TEACHERSIGNUP" element={<TeachersSignup />} />
        <Route path="/DELETESTUDENT" element={<DeleteStudent />} />
        
        <Route path="/Student-dashboard" element={<SubjectYear />} />
        <Route path='/REGISTER-SUBJECT' element={<RegisterToSubject/>}/>
        <Route path='/USER-PROFILE' element={<Profile/>}/>

        <Route path='/TOPIC-SELECTION' element={<StudentTopic/>}/>
        <Route path="/TEACHER-PROFILE" element={<TeacherProfile />} />
        <Route path="/TEACHER-APROVEL" element={<StudentRequests />} />
        <Route path="/TEACHER-DELETE-ALL-TOPICS" element={<DeleteAllTopics />} />
        <Route path="/ALL-TOPICS" element={<TopicPage />} />
        <Route path="/TEACHER-WAIT" element={<TeacherWaitingPage />} />
        <Route path="/CONTACT-US" element={<ContactUs />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/AllTeacherApplicents" element={<  AllApplicantTeachersRequest />} />
      


                <Route path="/TEACHER-ROLE" element={
                  <ApproveTeacher />
                  } />
        <Route
          path="/GetList"
          element={
            <ProtectedRoute>
              <GetList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/USER"
          element={
            <ProtectedRoute requiredRole={ROLE.ADMIN}>
              <Users />
             </ProtectedRoute>
          }
        />

        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </>
  );
}

export default AppContent;