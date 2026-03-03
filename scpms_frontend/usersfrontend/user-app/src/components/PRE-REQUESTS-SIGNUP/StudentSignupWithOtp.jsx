import { Button, Checkbox, Form, Input, Select } from "antd";
import { useState } from "react"
import { StudentSendingOtpForSignUP } from "./SIGNUP-APIS/SignUpApis";
import { useNavigate } from "react-router-dom";


function StudentSignupWithOtp() {

    const naviagte = useNavigate();


    const onFinish = async (values) => {
        try {
            const signUpStudent = await StudentSendingOtpForSignUP(values);
            console.log(signUpStudent);

            if (signUpStudent==="STUDENTS") {
                naviagte("/CHECK-OTP-FOR-SIGNUP");
            }
            if(signUpStudent==="CREATE PROFILE"){
                naviagte("/create")
            }
            if(signUpStudent==="PLEASE WAIT"){
                naviagte("/TEACHER-WAIT")
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
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
                        FIRST SIGNUP FORM
                    </h1>
                    <p style={{
                        color: "rgba(245, 222, 179, 0.8)",
                        fontSize: "1.1rem",
                        margin: 0
                    }}>
                        Begin your journey with us
                    </p>
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
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
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
                                    value="STUDENT"
                                    style={{
                                        color: "white",
                                        background: "transparent",
                                        padding: "10px"
                                    }}
                                >
                                    STUDENT
                                </Select.Option>
                                <Select.Option
                                    value="APPLICANT_TEACHER"
                                    style={{
                                        color: "white",
                                        background: "transparent",
                                        padding: "10px"
                                    }}
                                >
                                    APPLICANT_TEACHER
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item style={{ marginBottom: 0, marginTop: "30px" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
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
                                Send Request
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
                    We'll send a verification code to your email
                </div>
            </div>
        </div>
    );
}
export default StudentSignupWithOtp;