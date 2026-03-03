import { useState } from "react"
import { DeleteFullUserDetails, DeleteStudentDataFrom, DeleteSubject } from "../apis";
import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";

function DeleteStudent(){
    const[deleteStudent,setDeleteStudent]=useState(null);
    const[basicForm]=useForm();
    const studentId=localStorage.getItem("studentId");
    console.log("user id",studentId);
const delData=async()=>{
    try{
        const deleteStudent=await DeleteStudentDataFrom(studentId);
        if(deleteStudent){
            console.log("STUDENT DELETED")
            localStorage.removeItem("studentId");
        }

    }catch(err){
        console.log(err.message);
    }
}
const deleteSubject=async()=>{
    try{
        const deleteStudent=await DeleteSubject(studentId);
        if(deleteStudent){
            console.log("STUDENT DELETED")
            localStorage.removeItem("studentId");
        }

    }catch(err){
        console.log(err.message);
    }
}
const deleteUser = async () => {
    try {
const userId= localStorage.getItem("userId");
      console.log("Deleting user with ID:", userId);
      if (!userId) {
        message.error("No user ID provided");
        return;
      }

      const response = await DeleteFullUserDetails(userId); 
      if(response){
      console.log("REMOVED ", response);
      }
    } catch (err) {
      console.log("Error deleting user:", err);
      message.error(err.message || "Failed to delete user");
    }
  };


    return(
        <div style={{ height:"100vh",background:"content-box radial-gradient(rgb(124, 108, 111), rgb(39, 40, 41))"}}>

        <Form
        form={basicForm}
        name="deleteStudentData"
        onFinish={delData}
        layout="vertical"
        style={{ maxWidth: 400, margin: '0 auto', padding: '20px'}}
>
    <Form.Item>
             <Button
             type="primery"
             htmlType="submit"
             style={{
                            background: '#1890ff',
                            color: 'white',
                            border: 'none',
                            padding: '40px 16px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            width: '100%',
                           marginLeft:"0vh",
                           marginRight:"0vh"

                        }}>
                               DELETE STUDENT  DATA
                </Button>
    </Form.Item>
    <br/>
        <Form.Item>
             <Button
             type="primery"
             htmlType="submit"
             onClick={deleteUser}
             style={{
                            background: '#1890ff',
                            color: 'white',
                            border: 'none',
                            padding: '40px 16px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            width: '100%',
                           marginLeft:"0vh",
                           marginRight:"0vh"

                        }}>
                               DELETE ALL USER  DATA
                </Button>

    </Form.Item>
    <br/>
            <Form.Item>
             <Button
             type="primery"
             htmlType="submit"
             onClick={deleteSubject}
             style={{
                            background: '#1890ff',
                            color: 'white',
                            border: 'none',
                            padding: '40px 16px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            width: '100%',
                           marginLeft:"0vh",
                           marginRight:"0vh"

                        }}>
                               DELETE SUBJECT  DATA
                </Button>

    </Form.Item>
   
</Form>
        </div>
    )
}
export default DeleteStudent;