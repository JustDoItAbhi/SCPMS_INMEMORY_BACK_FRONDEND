import { Card, Row, Col, Typography, Button, Space, Divider, Tag } from "antd";
import { 
    MailOutlined, 
    PhoneOutlined, 
    EnvironmentOutlined, 
    ClockCircleOutlined,
    MessageOutlined,
    GlobalOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function ContactUs() {
    const contactInfo = {
        email: "arvinderpalsingh2321@gmail.com",
        phone: "+380123456789",
        address: "Uzhhorod National University, City Uzhhorod, State Zakarpattia, Country Ukraine",
        postalCode: "88000",
        workingHours: "Mon - Fri: 9:00 AM - 6:00 PM"
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${contactInfo.email}`;
    };

    const handlePhoneClick = () => {
        window.location.href = `tel:${contactInfo.phone}`;
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ maxWidth: "1000px", width: "100%" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <Title level={1} style={{ color: "white", marginBottom: "16px" }}>
                        Contact Us
                    </Title>
                    <Paragraph style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px" }}>
                        We're here to help! Get in touch with us through any of the following channels.
                    </Paragraph>
                </div>

                <Row gutter={[32, 32]} justify="center">
                    {/* Contact Information */}
                    <Col xs={24} md={12}>
                        <Card 
                            style={{
                                height: "100%",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                border: "none",
                                borderRadius: "12px"
                            }}
                        >
                            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                {/* Email */}
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                    <div style={{
                                        background: "#1890ff",
                                        borderRadius: "50%",
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <MailOutlined style={{ fontSize: "24px", color: "white" }} />
                                    </div>
                                    <div>
                                        <Text strong style={{ fontSize: "16px" }}>Email</Text>
                                        <Paragraph style={{ margin: "8px 0", fontSize: "16px" }}>
                                            {contactInfo.email}
                                        </Paragraph>
                                        <Button 
                                            type="primary" 
                                            icon={<MessageOutlined />}
                                            onClick={handleEmailClick}
                                            size="small"
                                        >
                                            Send Email
                                        </Button>
                                    </div>
                                </div>

                                <Divider />

                                {/* Phone */}
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                    <div style={{
                                        background: "#52c41a",
                                        borderRadius: "50%",
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <PhoneOutlined style={{ fontSize: "24px", color: "white" }} />
                                    </div>
                                    <div>
                                        <Text strong style={{ fontSize: "16px" }}>Phone</Text>
                                        <Paragraph style={{ margin: "8px 0", fontSize: "16px" }}>
                                            {contactInfo.phone}
                                        </Paragraph>
                                        <Button 
                                            type="default" 
                                            icon={<PhoneOutlined />}
                                            onClick={handlePhoneClick}
                                            size="small"
                                        >
                                            Call Now
                                        </Button>
                                    </div>
                                </div>

                                <Divider />

                                {/* Address */}
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                    <div style={{
                                        background: "#fa541c",
                                        borderRadius: "50%",
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <EnvironmentOutlined style={{ fontSize: "24px", color: "white" }} />
                                    </div>
                                    <div>
                                        <Text strong style={{ fontSize: "16px" }}>Address</Text>
                                        <Paragraph style={{ margin: "8px 0", fontSize: "16px" }}>
                                            {contactInfo.address}
                                        </Paragraph>
                                        <Tag color="blue" icon={<GlobalOutlined />}>
                                            Postal Code: {contactInfo.postalCode}
                                        </Tag>
                                    </div>
                                </div>

                                <Divider />

                                {/* Working Hours */}
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                    <div style={{
                                        background: "#722ed1",
                                        borderRadius: "50%",
                                        width: "50px",
                                        height: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        <ClockCircleOutlined style={{ fontSize: "24px", color: "white" }} />
                                    </div>
                                    <div>
                                        <Text strong style={{ fontSize: "16px" }}>Working Hours</Text>
                                        <Paragraph style={{ margin: "8px 0", fontSize: "16px" }}>
                                            {contactInfo.workingHours}
                                        </Paragraph>
                                        <Text type="secondary">Weekends: Closed</Text>
                                    </div>
                                </div>
                            </Space>
                        </Card>
                    </Col>

                    {/* Quick Response Info */}
                    <Col xs={24} md={10}>
                        <Card 
                            style={{
                                height: "100%",
                                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                color: "white",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                                border: "none",
                                borderRadius: "12px"
                            }}
                        >
                            <Space direction="vertical" size="large" style={{ width: "100%", textAlign: "center" }}>
                                <Title level={3} style={{ color: "white" }}>
                                    Quick Response
                                </Title>
                                
                                <div style={{ background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "8px" }}>
                                    <Text style={{ color: "white", fontSize: "16px" }}>
                                        We typically respond to emails within 24 hours and phone calls immediately during working hours.
                                    </Text>
                                </div>

                                <div style={{ background: "rgba(255,255,255,0.2)", padding: "20px", borderRadius: "8px" }}>
                                    <Text strong style={{ color: "white", fontSize: "16px", display: "block", marginBottom: "8px" }}>
                                        Preferred Contact Method
                                    </Text>
                                    <Text style={{ color: "white" }}>
                                        Email is the fastest way to reach us for non-urgent matters.
                                    </Text>
                                </div>

                                <Button 
                                    type="primary" 
                                    size="large"
                                    style={{
                                        background: "white",
                                        color: "#f5576c",
                                        border: "none",
                                        fontWeight: "bold"
                                    }}
                                    onClick={handleEmailClick}
                                    icon={<MailOutlined />}
                                >
                                    Send Us an Email
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>

                {/* Thank You Message */}
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                    <Card 
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                            border: "none",
                            borderRadius: "12px"
                        }}
                    >
                        <Title level={2} style={{ color: "white", marginBottom: "16px" }}>
                            Thank You for Contacting Us!
                        </Title>
                        <Paragraph style={{ color: "rgba(255,255,255,0.9)", fontSize: "16px" }}>
                            We appreciate you reaching out. Our team will get back to you as soon as possible.
                        </Paragraph>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;