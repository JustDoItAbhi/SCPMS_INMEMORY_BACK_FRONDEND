import { Button, Checkbox, Form, Input, Select } from "antd";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ConfimeStudentOtp } from "./SignUpApis";
function CheckOtp() {
    const [otp, setOtp] = useState("");
        const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
              const userData = {
                ...values
            };
            const compareOtp = await ConfimeStudentOtp(userData);
            console.log("OTP REQUEST ",compareOtp);

            if (compareOtp) {
                navigate("/create");
            }

        } catch (err) {
            console.log(err.message);
        }
    }
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
                    Confirm OTP
                </h1>
                <p style={{
                    color: "rgba(245, 222, 179, 0.8)",
                    fontSize: "1.1rem",
                    margin: 0
                }}>
                    Enter the verification code sent to your email
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

                    {/* OTP Field */}
                    <Form.Item
                        label={
                            <span style={{
                                color: "wheat",
                                fontWeight: "500",
                                fontSize: "1rem"
                            }}>
                                OTP CODE
                            </span>
                        }
                        name="otp"
                        rules={[
                            { required: true, message: "Please enter your OTP" },
                            { len: 6, message: "OTP must be 6 characters" }
                        ]}
                    >
                        <Input 
                            type="text" 
                            placeholder="Enter your OTP"
                            maxLength={6}
                            style={{
                                height: "45px",
                                borderRadius: "10px",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                background: "rgba(255, 255, 255, 0.1)",
                                color: "white",
                                fontSize: "1.2rem",
                                fontWeight: "600",
                                textAlign: "center",
                                letterSpacing: "8px",
                                padding: "0 15px"
                            }}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '').toUpperCase();
                            }}
                        />
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
                            VERIFY OTP
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {/* Additional Options */}
            <div style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center"
            }}>
                <div style={{
                    color: "rgba(245, 222, 179, 0.6)",
                    fontSize: "0.9rem"
                }}>
                    Didn't receive the code?
                </div>
                <Button 
                    type="link" 
                    style={{
                        color: "wheat",
                        fontWeight: "500",
                        textDecoration: "underline"
                    }}
                    onClick={() => {/* Add resend OTP logic here */}}
                >
                    Resend OTP
                </Button>
            </div>
        </div>
    </div>
);
}
export default CheckOtp;