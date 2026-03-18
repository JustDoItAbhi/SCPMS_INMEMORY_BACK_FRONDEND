import { useEffect, useState } from "react";
import { GetAllTeachersBySubjectName, GetSubjectAndStudentAllDetailsById, WriteTopic } from "../apis";
import { Button, Card, Spin, Alert, Typography, Space, Divider, Modal, Input, Form, message } from "antd";
import { ReloadOutlined, UserOutlined, BookOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { TextArea } = Input;

function StudentTopic() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [form] = Form.useForm();
   const navigator= useNavigate();
   const[userName,setUserName]=useState("");

    const subject = localStorage.getItem("subject");
    const studentId = localStorage.getItem("studentId");
    const userId=JSON.parse(localStorage.getItem("userId"));
    console.log("user id ", userId)

    const getStudentsSubject=async()=>{
        try{
            // const studentSubject=await 
        }catch(err){
            console.log(err.message);
        }
    }

const logoutfunction=()=>{
    navigator("/logout")
}
const userDetail=async()=>{
 try {
        const getStudentAndSubjectbyId = await GetSubjectAndStudentAllDetailsById(`${userId}`);
        const name = getStudentAndSubjectbyId?.data?.subject?.students?.user?.name || "Unknown";
        console.log("USER NAME:", name);
        setUserName(name); // update state
    } catch (err) {
        console.error("Error fetching user detail:", err);
    }
}
useEffect(() => {
    userDetail();
}, []);
    const getData = async () => {
        setLoading(true);
        setError("");
        try {

            
           

            const response = await GetAllTeachersBySubjectName(subject);
            if (response) {
                setTeachers(Array.isArray(response) ? response : [response]);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load teachers data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleTeacherClick = (teacher) => {
        setSelectedTeacher(teacher);
        setModalVisible(true);
    };

    const handleSubmitTopic = async (values) => {
        setSubmitting(true);
        try {

            const studentandSubjectId = localStorage.getItem("studentAndSubjectId");
            
            if (!studentandSubjectId) {
                console.log("ERROR : Student subject information not found. Please contact administration.");
                return;
            }

            const submissionData = {
                teacherId: selectedTeacher.teacherId, // Use teacherId from the teacher object
                studentandSubjectId: parseInt(studentandSubjectId), // Ensure it's a number
                topic: values.topic
            };

            console.log("Submitting topic with data:", submissionData);

            const result = await WriteTopic(submissionData);
            console.log("RESULT ",result)
            
            message.success("Topic submitted successfully!");
            setModalVisible(false);
            form.resetFields();
            navigator("/USER-PROFILE")
        } catch (err) {
            console.error("Submission error:", err);
            
            if (err.response?.status === 400) {
                const errorData = err.response.data;
                message.error(errorData.message || "Invalid request. Please check your data and try again.");
            } else {
                message.error("Failed to submit topic. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validateTopicLength = (_, value) => {
        if (!value || value.trim().length === 0) {
            return Promise.reject(new Error('Please enter your topic'));
        }
        
        if (value.trim().length < 10) {
            return Promise.reject(new Error('Topic must be at least 10 characters long'));
        }
        
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount > 100) {
            return Promise.reject(new Error(`Topic must be 100 words or less (current: ${wordCount} words)`));
        }
        
        return Promise.resolve();
    };

    const handleCancel = () => {
        setModalVisible(false);
        setSelectedTeacher(null);
        form.resetFields();
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <Spin size="large" tip="Loading teachers data..." />
            </div>
        );
    }

    return (
        <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto"}}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <Title level={2} style={{ color: "#1890ff", margin: 0 }}>
                        <BookOutlined /> Available Teachers for {subject} by {userName}
                    </Title>
                    <Text type="secondary">
                        Click on a teacher to submit your topic request
                    </Text>
                </div>

                {error && (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError("")}
                    />
                )}

                {/* Teachers List */}
                <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
                    {teachers.map((teacher, index) => (
                        <Card
                            key={index}
                            hoverable
                            style={{ 
                                borderRadius: "12px",
                                boxShadow: "0 4px 12px rgba(161, 50, 50, 0.1)",
                                transition: "all 0.3s ease",
                                cursor: "pointer"
                            }}
                            onClick={() => handleTeacherClick(teacher)}
                            bodyStyle={{ padding: "20px" }}
                        >
                            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <BookOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
                                    <Text strong style={{ fontSize: "16px" }}>
                                        {teacher.subject || subject}
                                    </Text>
                                </div>
                                
                                <Divider style={{ margin: "12px 0" }} />
                                
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <IdcardOutlined style={{ fontSize: "16px", color: "#fa8c16" }} />
                                    <Text>Teacher ID: {teacher.teacherId}</Text>
                                </div>
                                
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <MailOutlined style={{ fontSize: "16px", color: "#52c41a" }} />
                                    <Text>{teacher.teacherEmail}</Text>
                                </div>
                                
                                <Text type="secondary" style={{ fontSize: "12px", textAlign: "center" }}>
                                    Click to submit your topic
                                </Text>
                            </Space>
                        </Card>
                    ))}
                </div>

                {teachers.length === 0 && !loading && (
                    <Card style={{ textAlign: "center", borderRadius: "12px" }}>
                        <Title level={4} type="secondary">
                            No teachers found for {subject}
                        </Title>
                        <Text type="secondary">
                            Please check back later or contact administration.
                        </Text>
                    </Card>
                )}

                {/* Refresh Button */}
                <div style={{ textAlign: "center", marginTop: "32px" }}>
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        onClick={getData}
                        loading={loading}
                        size="large"
                        style={{ 
                            borderRadius: "8px",
                            padding: "0 32px",
                            height: "40px"
                        }}
                    >
                        Refresh Teachers List
                    </Button>
                </div>
            </Space>

                <div style={{ textAlign: "center", marginTop: "32px" }}>
                    <Button
                        type="primary"
                        onClick={logoutfunction}
                        loading={loading}
                        size="large"
                        style={{ 
                            borderRadius: "8px",
                            padding: "0 32px",
                            height: "40px"
                        }}
                    >
                       logout
                    </Button>
                    </div>

            {/* Topic Submission Modal */}
            <Modal
                title={
                    <Space>
                        <MailOutlined />
                        Submit Topic to Teacher (email server is down please wait for response)
                    </Space>
                }
                open={modalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
                style={{ borderRadius: "12px" }}
            >
                {selectedTeacher && (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmitTopic}
                        style={{ marginTop: "20px" }}
                    >
                        <Form.Item label="Teacher ID">
                            <Input 
                                value={selectedTeacher.teacherId} 
                                disabled 
                                style={{ borderRadius: "8px" }}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Teacher Email">
                            <Input 
                                value={selectedTeacher.teacherEmail} 
                                disabled 
                                style={{ borderRadius: "8px" }}
                            />
                        </Form.Item>
                        
                        <Form.Item label="Subject">
                            <Input 
                                value={selectedTeacher.subject || subject} 
                                disabled 
                                style={{ borderRadius: "8px" }}
                            />
                        </Form.Item>
                        
                        <Form.Item
                            name="topic"
                            label="Your Topic (min 10 chars, max 100 words)"
                            rules={[
                                { required: true, message: 'Please enter your topic' },
                                { validator: validateTopicLength }
                            ]}
                        >
                            <TextArea
                                rows={6}
                                placeholder="Describe your topic or project idea (minimum 10 characters, maximum 100 words)..."
                                style={{ borderRadius: "8px" }}
                                showCount
                                minLength={10}
                                maxLength={1000}
                            />
                        </Form.Item>
                        
                        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                            <Space>
                                <Button 
                                    onClick={handleCancel} 
                                    style={{ borderRadius: "8px" }}
                                    disabled={submitting}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    style={{ borderRadius: "8px" }}
                                    loading={submitting}
                                >
                                    Submit Topic
                                </Button>
                                
                            </Space>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
}

export default StudentTopic;