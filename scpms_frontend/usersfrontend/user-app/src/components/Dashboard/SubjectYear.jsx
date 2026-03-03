import React, { useState, useEffect } from 'react';
import { Card, List, Checkbox, Button, Typography, Alert, Spin } from 'antd';
import { BookOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './SubjectYear.css';
import { GetSubjectAndStudentAllDetailsById, GetSubjectByYear, GetUserById, registerSubjects } from '../apis';
import "./SubjectYear.css"
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const SubjectYear = () => {

const navigate= useNavigate();

    const [selectedYear, setSelectedYear] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [chhoseSeubject, setChoosenSubject] = useState('');
        const[userN,setUserName]=useState("");
    




    const userDetails = localStorage.getItem("userId");
    // console.log("STUDENT DETAILS TO GET ID ",userDetails.subject.students.user)
       const studentSubjectId = localStorage.getItem('studentAndSubjectId') 
          if(studentSubjectId){
            navigate("/TOPIC-SELECTION")
            }
const getData=async()=>{
    try{
        const getUser=await GetUserById(userDetails);
        console.log("USER DETAILS ",getUser.data);
        setUserName(getUser.data.name)
    }catch(error){
        console.log(error.message);
    }
}
useEffect(()=>{
    getData();
},[])

    const years = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th'];

        const getStudentIfExists=async()=>{
        try{
            const student=await GetSubjectAndStudentAllDetailsById(userDetails);
            if(student){
                console.log("STUDENT DETAILS TO GET ID ",student);
                             console.log("STUDENT NAME ",student.data.subject.students.user.name);
                             const userNa=student.data.subject.students.user.name;
        
                  navigate("/TOPIC-SELECTION")
            }
        }catch(err){
            console.log(err.message);
        }
    }
    getStudentIfExists();

    // Fetch subjects when year is selected
    const fetchSubjectsByYear = async (year) => {
        setLoading(true);
        setMessage({ type: '', content: '' });
 
        try {
      
            const response = await GetSubjectByYear(year);
            setSubjects(response.subjectsList || []);
            setSelectedSubjects([]); // Reset selections when year changes
            setMessage({ 
                type: 'success', 
                content: `Loaded subjects for ${year} year` 
            });
        } catch (error) {
            console.error('Error fetching subjects:', error);
            const errorMessage = error.response?.data?.message || 'Failed to fetch subjects';
            setMessage({ 
                type: 'error', 
                content: errorMessage
            });
            setSubjects([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle year selection
    const handleYearSelect = (year) => {
        setSelectedYear(year);
        fetchSubjectsByYear(year);
    };

    // Handle subject selection
    const handleSubjectSelect = (subject, checked) => {
        if (checked) {
            setSelectedSubjects(prev => [...prev, subject]);
            console.log(subject);
            console.log("SUBJECTSSS",subject)
            localStorage.setItem("subject",subject);
        } else {
            setSelectedSubjects(prev => prev.filter(sub => sub !== subject));
        }
    };

    // Handle subject registration
    const handleRegisterSubjects = async (value) => {
        if (selectedSubjects.length === 0) {
                navigate("/TOPIC-SELECTION")
            setMessage({ 
                type: 'warning', 
                content: 'Please select at least one subject' 
            });
            console.log("SUBJECT REGISTERED ",selectedSubjects?.subject)
            setChoosenSubject(selectedSubjects);

        
            return;
        }

        setLoading(true);
        try {
            const studentId = localStorage.getItem('studentId') || 'CURRENT_STUDENT_ID';
            
        const registerSubject=  await registerSubjects(studentId, selectedYear,selectedSubjects);
          console.log("RESPONSE FROM SUBJECT ",registerSubject.subject)
          localStorage.setItem("studentAndSubjectId",registerSubject.subject)

            setMessage({ 
                type: 'success', 
                content: `Successfully registered ${selectedSubjects.length} subject(s) for ${selectedYear} year` 
            });

            // Clear selections after successful registration
            setSelectedSubjects([]);
            
        } catch (error) {
            console.error('Error registering subjects:', error);
            const errorMessage = error.response?.data?.message || 'Failed to register subjects';
            setMessage({ 
                type: 'error', 
                content: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };

    // Clear all selections
    const handleClearSelection = () => {
        setSelectedSubjects([]);
        setMessage({ type: '', content: '' });
    };

    // Select all subjects
    const handleSelectAll = () => {
        setSelectedSubjects([...subjects]);
    };

    const user=JSON.parse(localStorage.getItem("user"));
    console.log("user",user)
console.log("USER", typeof user === 'string' ? JSON.parse(user)?.username : user?.usernamE);
// const userName=typeof user === 'string' ? JSON.parse(user)?.username : user?.username

    return (
        <div className="subject-year-container">
            <Card className="subject-year-card">
                <Title level={2} className="page-title" style={{color:"white"}}>
                    <BookOutlined /> {userN} Your Subjects
                </Title>
                
                {/* Year Selection */}
                <div className="year-selection">
                <Text strong className="section-title" style={{color:"white"}}>Select Academic Year:</Text>
                    <div className="year-buttons">
                        {years.map(year => (
                            <Button
                                key={year}
                                type={selectedYear === year ? "primary" : "default"}
                                onClick={() => handleYearSelect(year)}
                                className="year-button"
                            >
                                {year} Year
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Message Alert */}
                {message.content && (
                    <Alert
                        message={message.content}
                        type={message.type}
                        showIcon
                        closable
                        onClose={() => setMessage({ type: '', content: '' })}
                        className="alert-message"
                    />
                )}

                 {selectedYear && (
                    <Card 
                        title={
                            <div className="card-title">
                                <span>{selectedYear} Year Subjects</span>
                                <Text type="secondary">({subjects.length} subjects available)</Text>
                            </div>
                        } 
                        className="subjects-card"
                        extra={
                            <div className="selection-info">
                                <Text strong>{selectedSubjects.length}/{subjects.length} selected</Text>
                            </div>
                        }
                    >
                        {loading ? (
                            <div className="loading-container">
                                <Spin size="large" />
                                <Text>Loading subjects for {selectedYear} year...</Text>
                            </div>
                        ) : subjects.length > 0 ? (
                            <>
                                <div className="list-actions">
                                    <Button 
                                        size="small" 
                                        onClick={handleSelectAll}
                                        disabled={selectedSubjects.length === subjects.length}
                                    >
                                        Select All
                                    </Button>
                                    <Button 
                                        size="small" 
                                        onClick={handleClearSelection}
                                        disabled={selectedSubjects.length === 0}
                                    >
                                        Clear All
                                    </Button>
                                </div>
                                
                                <List
                                    dataSource={subjects}
                                    renderItem={(subject, index) => (
                                        <List.Item className="subject-item">
                                            <Checkbox
                                                checked={selectedSubjects.includes(subject)}
                                                onChange={(e) => handleSubjectSelect(subject, e.target.checked)}
                                                className="subject-checkbox"
                                            >
                                                <div className="subject-content">
                                                    <Text strong className="subject-name">
                                                        {index + 1}. {subject}
                                                    </Text>
                                                </div>
                                            </Checkbox>
                                            {selectedSubjects.includes(subject) && (
                                                <CheckCircleOutlined className="selected-icon" />
                                            )}
                                        </List.Item>
                                    )}
                                    className="subjects-list"
                                />
                                
                                {/* Action Buttons */}
                                <div className="action-buttons">
                                    <Button 
                                        onClick={handleClearSelection}
                                        disabled={selectedSubjects.length === 0}
                                        className="clear-button"
                                    >
                                        Clear Selection
                                    </Button>
                                    <Button 
                                        type="primary" 
                                        onClick={handleRegisterSubjects}
                                        loading={loading}
                                        disabled={selectedSubjects.length === 0}
                                        icon={<CheckCircleOutlined />}
                                        className="register-button"
                                        size="large"
                                    >
                                        Register Selected Subjects ({selectedSubjects.length})

                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="no-subjects">
                                <Text type="secondary">No subjects available for {selectedYear} year</Text>
                            </div>
                        )}
                    </Card>
                )}

                {/* Selected Subjects Summary */}
                {selectedSubjects.length > 0 && (
                    <Card title="Selected Subjects Summary" className="summary-card">
                        <List
                            dataSource={selectedSubjects}
                            renderItem={(subject, index) => (
                                <List.Item>
                                    <Text>
                                        <span className="subject-number">{index + 1}.</span> 
                                        {subject}
                                    </Text>
                                </List.Item>
                            )}
                            size="small"
                        />
                    </Card>
                )}
            </Card>
        </div>
    );
};

export default SubjectYear;