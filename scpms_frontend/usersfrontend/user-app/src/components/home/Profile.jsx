import { useEffect, useState } from "react";
import { GetSubjectAndStudentAllDetailsById } from "../apis";
import "./Profile.css";
import { useNavigate } from "react-router-dom";


function Profile() {
const navigator=useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  

    const getAllUserDetails = async () => {
        try {
            const userId = localStorage.getItem("userId");
            // const userId = 1152;
            const getUserData = await GetSubjectAndStudentAllDetailsById(userId);
            if (getUserData) {
                console.log("FULL USER DETAILS ", getUserData.data);
                setUser(getUserData.data);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }


    const handleLogout = () => {
        navigator("/logout")
    }

    useEffect(() => {
        getAllUserDetails();
    }, []);

    if (loading) {
        return (
            <div className="profile-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-container">
                <div className="error-message">Failed to load user data</div>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        );
    }

    const userRole = user?.subject?.students?.user?.rolesList?.[0]?.roleName || "No role assigned";

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-title">Student Profile</h1>
                <div className="header-actions">
                    <div className="profile-badge">{userRole}</div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="profile-content">
                {/* Personal Information Section */}
                <div className="profile-section">
                    <h2 className="section-title">Personal Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Full Name</label>
                            <span className="info-value">{user.subject.students.user.name}</span>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <span className="info-value">{user.subject.students.user.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Address</label>
                            <span className="info-value">{user.subject.students.user.address}</span>
                        </div>
                        <div className="info-item">
                            <label>User ID</label>
                            <span className="info-value">{user.subject.students.user.id}</span>
                        </div>
                    </div>
                </div>

                {/* Student Information Section */}
                <div className="profile-section">
                    <h2 className="section-title">Student Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Current Year</label>
                            <span className="info-value highlight">{user.subject.students.currentYear}</span>
                        </div>
                        <div className="info-item">
                            <label>Group Number</label>
                            <span className="info-value">{user.subject.students.groupNumber}</span>
                        </div>
                        <div className="info-item">
                            <label>Sub Group Number</label>
                            <span className="info-value">{user.subject.students.subGroupNumber}</span>
                        </div>
                        <div className="info-item">
                            <label>Monitor Name</label>
                            <span className="info-value">{user.subject.students.monitorName}</span>
                        </div>
                        <div className="info-item">
                            <label>Student ID Card</label>
                            <span className="info-value">{user.subject.students.studentIdCardNumber}</span>
                        </div>
                        <div className="info-item">
                            <label>Passport Number</label>
                            <span className="info-value">{user.subject.students.passportNumber}</span>
                        </div>
                    </div>
                </div>

                {/* Subject Information Section */}
                <div className="profile-section">
                    <h2 className="section-title">Subject Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Subject</label>
                            <span className="info-value subject-name">{user.subject.subject}</span>
                        </div>
                        <div className="info-item">
                            <label>Subject Year</label>
                            <span className="info-value">{user.subject.subjectYear}</span>
                        </div>
                        <div className="info-item">
                            <label>Enrollment ID</label>
                            <span className="info-value">{user.studentAndSubjectId}</span>
                        </div>
                        <div className="info-item">
                            <label>Subject ID</label>
                            <span className="info-value">{user.subject.id}</span>
                        </div>
                    </div>
                </div>

                {/* Dates Information */}
                <div className="profile-section">
                    <h2 className="section-title">Registration Dates</h2>
                    <div className="dates-grid">
                        <div className="date-item">
                            <label>User Created</label>
                            <span className="date-value">{new Date(user.subject.students.user.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="date-item">
                            <label>Student Profile Created</label>
                            <span className="date-value">{new Date(user.subject.students.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="date-item">
                            <label>Subject Enrollment</label>
                            <span className="date-value">{new Date(user.subject.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="date-item">
                            <h1 >😎</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;