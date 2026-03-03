import { useEffect, useState } from "react";
import { getStudentByID, GetStudentDetailById, GetSubjectAndStudentAllDetailsById} from "../apis";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

function StudentsSignup() {
    const [student, setStudent] = useState(null);
    const [basicForm] = Form.useForm(); // Fixed typo: basicFrom -> basicForm
    const navigate = useNavigate();

    const userDetails = localStorage.getItem("userId");




    const getData = async (values) => { // Changed parameter name to 'values'
        try {
            if (!userDetails) {
                console.log("ERROR user id not defined", userDetails);
                message.error("User ID not found");
                return;
            }
            
            const findStudent = await getStudentByID(userDetails, values);
            console.log("STUDENT RESPONSE ", findStudent.data);
            
            if (findStudent && findStudent.data) {
                console.log("STUDENT FOUND ", findStudent.data);
                const studentData = findStudent.data; 
                setStudent(studentData);


                console.log("STUDENT ID ", studentData.studentId);
                localStorage.setItem("studentId",studentData.studentId);
 


                if (studentData.passportNumber && studentData.studentIdCardNumber) {
                    message.success("Student profile completed successfully!");
                    navigate("/Student-dashboard")
                } else {
                    message.warning("Some fields may not have been saved correctly");
                }
                if (studentData.error) {
                    navigate("/DELETESTUDENT");
                } else if (
                    !studentData.currentYear || 
                    !studentData.groupNumber || 
                    !studentData.subGroupNumber || 
                    !studentData.monitorName || 
                    !studentData.studentIdCardNumber || 
                    !studentData.passportNumber
                ) {
                    message.warning("Please complete all student information");
                } else {
                    message.success("Student profile completed successfully!");
                }
            }

        } catch (err) {
            console.log(err.message);
            message.error("Failed to save student data");
        }
    }

    const fetchStudentData = async () => {
        console.log("student data ",userDetails)
        if (userDetails) {
            try {
                const getStudent=await GetStudentDetailById(userDetails);
              if(getStudent){
                console.log("STUDENT DETAILS ",getStudent);

                localStorage.setItem("studentId",getStudent.studentId);

                navigate("/Student-dashboard")
            }
                // setStudent(existingData.data);
                console.log("Student ID available:", userDetails);
            } catch (err) {
                console.log("Error fetching student data:", err.message);
            }
        } else {
            console.log("UNABLE TO FETCH STUDENT DATA - No user ID");
            message.error("Please complete user registration first");
        }
    }

    useEffect(() => {
        if (userDetails) {
            fetchStudentData();
        } else {
            console.log("❌ No user ID found in localStorage");
            message.error("Please complete user registration first");
        }
    }, [userDetails]);

    return (
              <div style={{ background:"content-box radial-gradient(rgba(173, 153, 157, 1), rgba(110, 114, 119, 1))"}}>
             
            <Form
                form={basicForm} // Fixed: basicFrom -> basicForm
                name="studentSignup"
                onFinish={getData}
                layout="vertical"
                style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}
            >
                   <h1>ENTER YOU DETAILS</h1>
                <Form.Item
                    label="YOUR PASSPORT NUMBER"
                    name="passportNumber"
                    rules={[{ required: true, message: "Please enter your PASSPORT NUMBER" }]}
                >
                    <Input type="text" placeholder="Enter your PASSPORT NUMBER (e.g., A123456)" />
                </Form.Item>
                
                <Form.Item
                    label="YOUR STUDENT ID NUMBER"
                    name="studentIdCardNumber"
                    rules={[{ required: true, message: "Please enter your STUDENT ID NUMBER" }]}
                >
                    <Input type="text" placeholder="Enter your STUDENT ID NUMBER (e.g., AO21345)" />
                </Form.Item>

                <Form.Item
                    label="YOUR CURRENT YEAR OF STUDY"
                    name="currentYear"
                    rules={[{ required: true, message: "Please enter your YEAR" }]}
                >
                    <Input type="text" placeholder="Enter your YEAR (e.g., 4TH,5TH,6TH)" />
                </Form.Item>

                <Form.Item
                    label="YOUR CURRENTLY IN GROUP NUMBER"
                    name="groupNumber"
                    rules={[{ required: true, message: "Please enter your GROUP NUMBER" }]}
                >
                    <Input type="text" placeholder="Enter your GROUP NUMBER (e.g., 1,2,3)" />
                </Form.Item>

                <Form.Item
                    label="YOUR CURRENTLY IN SUBGROUP NUMBER"
                    name="subGroupNumber"
                    rules={[{ required: true, message: "Please enter your SUBGROUP NUMBER" }]}
                >
                    <Input type="text" placeholder="Enter your SUBGROUP NUMBER (e.g., 1,2,3)" />
                </Form.Item>

                <Form.Item
                    label="YOUR GROUP MONITOR NAME"
                    name="monitorName"
                    rules={[{ required: true, message: "Please enter your GROUP MONITOR NAME" }]}
                >
                    <Input type="text" placeholder="Enter your GROUP MONITOR NAME (e.g., JOHN)" />
                </Form.Item>
                
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={fetchStudentData}
                        style={{
                            background: '#adb3b8ff',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                    >
                        COMPLETE STUDENTS SIGNUP
                    </Button>
                    <br/>
                       <br/>
                        <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            background: '#adb3b8ff',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                    >
                        IF ALREADY REGISTERED ? <Link to="/Student-dashboard"> Click Here</Link>
                    </Button>
                </Form.Item>
            </Form>
            
            {student && (
                <div style={{
                    marginTop: 20,
                    padding: 10,
                    background: '#1d1a1aff',
                    maxWidth: 400,
                    margin: '20px auto'
                }}>
                    <h3>Student Profile Completed Successfully!</h3>
                    <p><strong>ID:</strong> {student.id}</p>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>Passport Number:</strong> {student.passportNumber || 'Not provided'}</p>
                    <p><strong>Student ID:</strong> {student.studentIdCardNumber || 'Not provided'}</p>
                    <p><strong>Current Year:</strong> {student.currentYear || 'Not provided'}</p>
                    <p><strong>Group Number:</strong> {student.groupNumber || 'Not provided'}</p>
                    <p><strong>Subgroup Number:</strong> {student.subGroupNumber || 'Not provided'}</p>
                    <p><strong>Monitor Name:</strong> {student.monitorName || 'Not provided'}</p>
                    <p><strong>Roles:</strong> {student.rolesList?.map(role => 
                        typeof role === 'object' ? role.roles : role
                    ).join(', ')}</p>
                </div>
            )}
            
            <div style={{ 
                marginTop: 20, 
                padding: 10, 
                background: '#fff3cd',
                maxWidth: 400,
                margin: '20px auto',
                fontSize: '12px'
            }}>
                <h4>YOUR DETAIL:</h4>
                <p><strong>User ID from localStorage:</strong> {userDetails || 'Not found'}</p>
                <p><strong>Student data loaded:</strong> {student ? 'Yes' : 'No'}</p>
                {student && <p><strong>Student ID:</strong> {student.id}</p>}
            </div>
        </div>
    )
}

export default StudentsSignup;