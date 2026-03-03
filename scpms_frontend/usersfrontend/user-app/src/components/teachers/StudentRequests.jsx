import React, { useState, useEffect } from 'react';
import './StudentRequests.css';
import { GetAllTheStdListForTeacher, SetApprovalToTopicByTeacher } from '../apis';

const StudentThesisRequests = () => {
  const [thesisRequests, setThesisRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const[getUser,setUser]=useState([]);
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    fetchThesisRequests();
  }, []);
  


  


  const fetchThesisRequests = async () => {
 
    try {
      setLoading(true);
      const response = await GetAllTheStdListForTeacher(teacherId);
            console.log('THESIS REQUESTS:',response )
      console.log('THESIS REQUESTS:',response?.map(student=>student.topicId).filter(Boolean) )
      const validTopcId=response?.map(student=>student.topicId).filter(Boolean);
       const firstTopicId = response?.map(student=>student.responseDto.subject.students);
  console.log('FIRST TOPIC ID:', firstTopicId);
  setUser(firstTopicId);

      // localStorage.setItem("topicId",validTopcId);

      setThesisRequests(response);
    } catch (err) {
      setError('Failed to fetch thesis requests');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleApprove = async (topicIds, student) => {
    
    const studentTopic={
      topicStatus:"APPROVED",
      topicId:topicIds,
      studentSubjectId:student.responseDto.subject.id,
      teacherId:student.teacherId,
      topic:student.topic
}
    try {
      console.log("STUDENT AND TOPIC ",studentTopic)
      setActionLoading(topicIds);
      const topic=await SetApprovalToTopicByTeacher(studentTopic)
      console.log("TOPIC APPROVAL",topic)
     
      console.log('Approving topic:', topicIds, student);
      console.log("STUDENT AND SUBJECT ID",student.responseDto.subject.id)
            console.log("STUDENT AND teacher ID",student.teacherId)
         console.log("STUDENT AND teacher ID",student.topic)
      alert(`Thesis topic approved for ${getStudentName(student)}!`);
      
      // Remove from list after approval
      setThesisRequests(prev => prev.filter(req => req.topicId !== topicIds));
    } catch (err) {
      alert('Failed to approve thesis topic');
      console.error('Error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (topicIds, student) => {

    const studentName = getStudentName(student);
    if (!window.confirm(`Reject thesis topic for ${studentName}?`)) {
      return;
    }
        const studentTopic={
      topicStatus:"REJECTED",
      topicId:topicIds,
      studentSubjectId:student.responseDto.subject.id,
      teacherId:student.teacherId,
      topic:student.topic
}
    try {
      setActionLoading(topicIds);
      const topic=await SetApprovalToTopicByTeacher(studentTopic)
      console.log("TOPIC ",topic)

      
      console.log('Rejecting topic:', topicIds, student);
      alert(`Thesis topic rejected for ${studentName}`);
      
      // Remove from list after rejection
      setThesisRequests(prev => prev.filter(req => req.topicId !== topicIds));
    } catch (err) {
      alert('Failed to reject thesis topic');
      console.error('Error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Safe data access functions
  const getStudentName = (request) => {
    if (!request?.responseDto) return 'Student';
    
    if (typeof request.responseDto === 'string') return 'Student';
    if (request.responseDto.studentName) return request.responseDto.subject.students.user.name;
    if (request.responseDto.subject?.students?.user?.name) return request.responseDto.subject.students.user.name;
    
    return 'Student';
  };

  const getStudentId = (request) => {
    if (!request?.responseDto) return 'N/A';
    if (typeof request.responseDto === 'string') return 'N/A';
    
    return request.responseDto.subject.students.user.id || request.responseDto.id || 'N/A';
  };

  const getStudentSubject = (request) => {
    if (!request?.responseDto) return 'N/A';
    if (typeof request.responseDto === 'string') return 'N/A';
    
    return request.responseDto.subject || request.responseDto.subjectYear || 'N/A';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
     WAITING: { class: 'status-pending', text: 'Pending Review' },
      APPROVED: { class: 'status-approved', text: 'Approved' },
      REJECTED: { class: 'status-rejected', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.WAITING;
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading thesis requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={fetchThesisRequests}>Retry</button>
      </div>
    );
  }

  return (
    <div className="thesis-requests">
      {/* Header */}
      <div className="requests-header">
        <h1>Student  Requests</h1>
        <p>Review and manage student thesis topic submissions</p>
        <div className="requests-stats">
          <div className="stat-card">
            <span className="stat-number">{thesisRequests.length}</span>
            <span className="stat-label">Total Requests</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {thesisRequests.filter(req => req.status === 'PENDING').length}
            </span>
            <span className="stat-label">Pending Review</span>
          </div>
        </div>
      </div>

      {/* Thesis Requests List */}
      <div className="requests-list">
        {thesisRequests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Thesis Requests</h3>
            <p>No student thesis requests found for your subjects.</p>
          </div>
        ) : (
          thesisRequests.map((request) => (
            <div key={request.topicId} className="request-card">
              {/* Student Info */}
              <div className="student-header">
                <div className="student-avatar">
                  {getStudentName(request)?.charAt(0).toUpperCase() || 'S'}
                </div>
                <div className="student-info">
                  <h3>{getStudentName(request)}</h3>
                  <p>Student ID: {getStudentId(request)}</p>
                  {/* <p>Subject: {getStudentSubject(request)}</p> */}
                </div>
                <div className="request-status">
                  {getStatusBadge(request.status)}
                </div>
              </div>

              {/* Thesis Topic */}
              <div className="thesis-topic">
                <h4>Proposed Thesis Topic:</h4>
                <div className="topic-content">
                  <p>{request.topic || 'No topic provided'}</p>
                </div>
                {request.description && (
                  <div className="topic-description">
                    <strong>Description:</strong>
                    <p>{request.description}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  className="btn-approve"
                  onClick={() => handleApprove(request.topicId, request)}
                  disabled={actionLoading === request.topicId}
                >
                  {actionLoading === request.topicId ? (
                    <span className="btn-loading">Approving...</span>
                  ) : (
                    <>
                      <span className="icon">✓</span>
                      APPROVE
                    </>
                  )}
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleReject(request.topicId, request)}
                  disabled={actionLoading === request.topicId}
                >
                  {actionLoading === request.topicId ? (
                    <span className="btn-loading">Rejecting...</span>
                  ) : (
                    <>
                      <span className="icon">✕</span>
                      Reject
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentThesisRequests;