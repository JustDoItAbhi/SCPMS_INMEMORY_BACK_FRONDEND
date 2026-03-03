import { Button, Form, Input, Select, message } from "antd";
import { ApproveTeacherProfile } from "../apis";
import { useState } from "react";

function ApproveTeacher() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const getData = async (values) => {
        console.log("VALUES ", values);
        setLoading(true);

        try {
            const teacher = await ApproveTeacherProfile(values);
            console.log("TEACHER DATA ", teacher);
            
            message.success("Teacher role approved successfully!");
            form.resetFields(); // Reset form after success
            
            return teacher;
        } catch (err) {
            console.error("Error in getData:", err);
            message.error(err.message || "Failed to approve teacher role");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "content-box radial-gradient(rgba(173, 153, 157, 1), rgba(40, 41, 42, 1))",
                textAlign: "center",
                padding: "20px"
            }}>
                {/* Header Section */}
                <div style={{
                    marginBottom: "40px",
                    textAlign: "center"
                }}>
                    <h1 style={{
                        color: "wheat",
                        fontSize: "2.5rem",
                        fontWeight: "600",
                        marginBottom: "10px",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                    }}>
                        TEACHER APPROVAL
                    </h1>
                </div>

                {/* Form Container */}
                <div style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "40px",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    maxWidth: "500px",
                    width: "100%"
                }}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={getData}
                        autoComplete="off"
                        layout="vertical"
                    >
                        {/* Email Field */}
                        <Form.Item
                            label={
                                <span style={{
                                    color: "wheat",
                                    fontWeight: "500",
                                    fontSize: "1rem"
                                }}>
                                    EMAIL
                                </span>
                            }
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email" },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                style={{
                                    height: "45px",
                                    borderRadius: "10px",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    background: "rgba(255, 255, 255, 0.1)",
                                    color: "white",
                                    fontSize: "1rem",
                                    padding: "0 15px"
                                }}
                            />
                        </Form.Item>

                        {/* Role Field */}
                        <Form.Item
                            label={
                                <span style={{
                                    color: "wheat",
                                    fontWeight: "500",
                                    fontSize: "1rem"
                                }}>
                                    ROLE
                                </span>
                            }
                            name="roles"
                            rules={[{ required: true, message: 'Please choose your role!' }]}
                        >
                            <Select
                                placeholder="Select a role"
                                style={{
                                    height: "45px",
                                    borderRadius: "10px",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    background: "rgba(255, 255, 255, 0.1)"
                                }}
                                dropdownStyle={{
                                    background: "rgba(40, 41, 42, 0.95)",
                                    borderRadius: "10px",
                                    border: "1px solid rgba(255, 255, 255, 0.2)"
                                }}
                            >
                                <Select.Option
                                    value="TEACHER"
                                    style={{
                                        color: "white",
                                        background: "transparent",
                                        padding: "10px"
                                    }}
                                >
                                    TEACHER
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item style={{ marginBottom: 0, marginTop: "30px" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    height: "50px",
                                    width: "100%",
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, rgba(245, 222, 179, 0.9), rgba(210, 180, 140, 0.9))",
                                    border: "none",
                                    color: "#2a2b2c",
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                                    transition: "all 0.3s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = "translateY(-2px)";
                                    e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = "translateY(0)";
                                    e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
                                }}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* Footer Note */}
                <div style={{
                    marginTop: "30px",
                    color: "rgba(245, 222, 179, 0.6)",
                    fontSize: "0.9rem"
                }}>
                    We verify your role
                </div>
            </div>
        </div>
    );
}

export default ApproveTeacher;