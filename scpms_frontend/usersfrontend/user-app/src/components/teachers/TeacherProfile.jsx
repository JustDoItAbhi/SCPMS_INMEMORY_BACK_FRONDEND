import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './TeacherProfile.css';
import { GetAllTheStdListForTeacher, GetTeacherApprovel, GetTeacherByidss } from '../apis';
import { message } from 'antd';

const TeacherProfile = () => {

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const[students,setStudents]=useState([])||[];
  const[getStatus,setStatus]=useState(null);
  const navigate=  useNavigate();

  const teach=localStorage.getItem("teacherId");
  console.log("teacher", teach);


      //  const id=JSON.parse(localStorage.getItem("teacher"));
      // console.log("TEACHER DETAILS FOR ID ", id);

  useEffect(() => {
    fetchTeacherProfile();
  }, [teach]);

  const fetchTeacherProfile = async () => {
    try {
      setLoading(true);
      // const response = await GetTeacherByidss(id.teacherId);
      // console.log('TEACHER DATA BY ID', response);
      // setTeacher(response);
      //       if(!response){
          const response = await GetTeacherByidss(teach);
               console.log('TEACHER DATA BY ID 2nD API', response);
      setTeacher(response);
      // }
    } catch (err) {
      setError('Failed to fetch teacher profile');
      console.error('Error fetching teacher:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading teacher profile...</p>
      </div>
    );
  }

  const GetStudnetDetails=async()=>{
    try{
      const getList=await GetAllTheStdListForTeacher(teach);
      console.log("STUDENTS LIST ", getList);
            console.log("STUDENTS LIST ", getList);
      if(getList){
      navigate("/TEACHER-APROVEL")

      }
    }catch(err){
      console.log(err.message);
    }
  }

  const getApprovels=async()=>{
    try{
      const status=await GetTeacherApprovel("APPROVED");
      console.log("STATUS",status);
      setStatus(status);
    }catch(err){
      console.log(err.message);
    }
  }
  getApprovels();

  const movetoDeletePage=()=>{
    navigate("/TEACHER-DELETE-ALL-TOPICS");
  }
  const Settings=()=>{
    navigate("/logout")
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={fetchTeacherProfile}>Retry</button>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="not-found">
        <h3>Teacher Not Found</h3>
        <p>No teacher found with ID: {teacherId}</p>
      </div>
    );
  }

  return (
    <div className="teacher-profile">
      {/* Header Section */}
      <div className="profile-header">
        <div className="teacher-avatar">
          <div className="avatar-placeholder">
            {teacher.teacherName?.charAt(0).toUpperCase() || 'T'}
          </div>
        </div>
        <div className="teacher-basic-info">
          <h1>{teacher.teacherName}</h1>
          <p className="teacher-subject">{teacher.subject}</p>
          <p className="teacher-year">Year: {teacher.teacherYear}</p>
        </div>
        <div className="profile-actions">
          <button className="btn-edit">Edit Profile</button>
          <button className="btn-message">Send Message</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Personal Information Card */}
        <div className="info-card">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name:</label>
              <span>{teacher.teacherName}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{teacher.teacherEmail}</span>
            </div>
            <div className="info-item">
              <label>Teaching Year:</label>
              <span>{teacher.teacherYear}</span>
            </div>
            <div className="info-item">
              <label>Subject:</label>
              <span className="subject-badge">{teacher.subject}</span>
            </div>
          </div>
        </div>

        {/* User Account Information */}
        {teacher.users && (
          <div className="info-card">
            <h3>Account Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Address:</label>
                <span>{teacher.users.address || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <label>Account Created:</label>
                <span>{new Date(teacher.users.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <label>Last Updated:</label>
                <span>{new Date(teacher.users.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <label>Role:</label>
                <span className="role-badge">
                  {teacher.users.rolesList?.[0]?.roleName || 'TEACHER'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Teaching Statistics (You can populate with real data) */}
        <div className="info-card">
          <h3>Teaching Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{getStatus}</div>
              <div className="stat-label">Students Assigned</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Topics Created</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Active Projects</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="info-card">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn" 
            onClick={movetoDeletePage}>
              <span className="icon">📚
              </span>
              <span>Manage Subjects</span>
            </button>
            <button className="action-btn" 
            onClick={GetStudnetDetails}
            >
              <span className="icon">👥</span>
              <span>View Students</span>
            </button>
            <button className="action-btn">
              <span className="icon">📝</span>
              <span>Create Topic</span>
            </button>
            <button className="action-btn"
            onClick={Settings}
            >
              <span className="icon">⚙️</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;