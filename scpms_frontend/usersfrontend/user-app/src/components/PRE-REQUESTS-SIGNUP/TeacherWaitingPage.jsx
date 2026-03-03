import { Button, Card, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const { Title, Paragraph, Text } = Typography;

function TeacherWaitingPage() {
    const navigate = useNavigate();
    const [bounce, setBounce] = useState(false);

    // Auto-bounce animation
    useEffect(() => {
        const interval = setInterval(() => {
            setBounce(true);
            setTimeout(() => setBounce(false), 600);
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    const handleGoHome = () => {
        navigate("/");
    };

    const handleContactSupport = () => {
        console.log("Contact support clicked");
        // navigate("/contact");
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
   background: "content-box radial-gradient(rgba(173, 153, 157, 1), rgba(40, 41, 42, 1))",
            padding: "20px"
        }}>
            <Card 
                style={{
                    maxWidth: "600px",
                    width: "100%",
                    textAlign: "center",
                    boxShadow: "0 8px 32px rgba(240, 224, 224, 0.1)",
                    // background:"rgba(253, 252, 252, 0.56)",
                    border: "none",
                    borderRadius: "12px",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Jumping Ball Animation */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px"
                }}>
                    <div style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "linear-gradient(45deg, #ff6b6b, #ffa826ff)",
                        boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
                        transform: bounce ? "translateY(-30px)" : "translateY(0)",
                        transition: "transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "white",
                        fontWeight: "bold"
                    }}>
                        ⏳
                    </div>
                </div>

                <Title level={2} style={{ color: "#1890ff", marginBottom: "16px" }}>
                    Registration Submitted
                </Title>

                <Paragraph style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}>
                    Thank you for registering with us! Your application is under review.
                </Paragraph>

                {/* Process Steps */}
                <div style={{ 
                    background: "#f8f9fa", 
                    padding: "20px", 
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                    marginBottom: "24px"
                }}>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Text strong>Application Review</Text>
                            <div style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                background: "#1890ff",
                                animation: "pulse 2s infinite"
                            }}></div>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Text type="secondary">Admin Approval</Text>
                            <div style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#ccc"
                            }}></div>
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Text type="secondary">Account Activation</Text>
                            <div style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#ccc"
                            }}></div>
                        </div>
                    </Space>
                </div>

                <Paragraph style={{ color: "#999", fontSize: "14px", marginBottom: "24px" }}>
                    You'll receive an email notification once approved. This usually takes 24-48 hours.
                </Paragraph>

                <Space direction="vertical" style={{ width: "100%" }} size="middle">
                    <Button 
                        type="primary" 
                        onClick={handleGoHome}
                        size="large"
                        style={{ width: "100%" }}
                    >
                        Go to Homepage
                    </Button>
                    {/* <Button 
                        onClick={handleContactSupport}
                        size="large"
                        style={{ width: "100%" }}
                    > */}
                       <Link to="/CONTACT-US" style={{width:"100vw"}}>Contact Us</Link>
                    {/* </Button> */}
                </Space>
            </Card>

            <style>
                {`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
                `}
            </style>
        </div>
    );
}

export default TeacherWaitingPage;