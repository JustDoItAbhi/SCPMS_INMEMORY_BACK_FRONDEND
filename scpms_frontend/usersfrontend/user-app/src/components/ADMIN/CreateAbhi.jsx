import { useEffect } from "react";
import { CreateAdAbhi } from "../apis";
import { useEffect, useState } from "react";
import { AddSubjectIn_memory, CreateUser } from "../apis";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
function CreateAbhi(){
    const [user, setUser] = useState(null);
     const [basicForm] = Form.useForm();

const navigate=useNavigate();
    const signup = async (values) => {
        try {
            // Add rolesList as an array if it's provided as string
            const userData = {
                ...values,
                 rolesList: values.rolesList ? [values.rolesList] : ['ADMIN']
            };
            
            const signupUser = await CreateUser(userData);
            console.log("sign up ", signupUser.data);
            setUser(signupUser);
            message.success("User created successfully!");
            if(message.success){
            const userId=    localStorage.setItem("userId",signupUser.data.id);
                console.log("USERID ",userId)
                navigate("/mylogin")
            }
     
        } catch (err) {
            console.log(err.message);
            message.error("Failed to create user");
        }
    }

    return (
        <div style={{height:"100vh", background:"content-box radial-gradient(rgba(173, 153, 157, 1), rgba(40, 41, 42, 1))"}}>
            <Form
                form={basicForm} 
                name="basic"
                onFinish={signup}
                layout="vertical"
                style={{ maxWidth: 400, margin: '0 auto', padding: '20px', color:"white"}}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                    
   
                >
                    
                    <Input type="text" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: 'email', message: 'Please enter a valid email' }
                    ]}
                >
                    <Input type="email" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter your password" }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please enter your address" }]}
                >
                    <Input type="text" placeholder="Enter your address" />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="rolesList"
                    initialValue="STUDENT" 
                    rules={[{required:true,message:"Please select a role"}]}
                >
                    <Select placeholder ="Select a role">
                        <Select.Option value="STUDENT">ADMIN</Select.Option>
                        {/* <Select.Option value="TEACHER">TEACHER</Select.Option> */}
                
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        style={{ 
                            background: '#9385a5ff', 
                            color: 'white', 
                            border: '2px solid', 
                            padding: '8px 16px', 
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                    >
                        SIGN UP
                    </Button>                    
                </Form.Item>
            </Form>
            {
                user && (
                    <div style={{ 
                        marginTop: 20, 
                        padding: 10, 
                        background: '#f0f0f0',
                        maxWidth: 400,
                        margin: '20px auto'
                    }}>
                        <h3>User created Successfully</h3>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Address: {user.address}</p>
                        <p>Roles: {user.rolesList?.join(', ')}</p>
                    </div>
                )
            }
        </div>
    )
}
export default CreateAbhi;