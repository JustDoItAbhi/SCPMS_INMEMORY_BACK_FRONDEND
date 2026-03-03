import { Button, Table, Tabs } from "antd";
import { DeleteAllTeachersTopicByTeacherId, GetALLTopicsByTeacherid} from "../apis";
import { useEffect, useState } from "react";
import TopicPage from "../TOPICS/TopicPage.jsx";
import { data } from "react-router-dom";


function DeleteAllTopics(){
const[topic,setTopic]=useState([]);
 const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [formType, setFormType] = useState("add");
    const[getTopicId,setTopicId]=useState([]);
    const [isDeletedModalOpen, setDeletedModalOpen] = useState(false);



const teacherId=localStorage.getItem("teacherId");
   const GetTopics=async()=>{
        try{
            const isTopic=await GetALLTopicsByTeacherid(teacherId);
            console.log(" ALL TOPICS ",isTopic);
           const ids = isTopic?.map(topic => topic.teacherTopicId).filter(Boolean);
           console.log("IDS ",ids)
          setTopicId(ids);
            setTopic(isTopic);

        }catch(err){
            console.log(err.message);
        }
    }
    
useEffect(()=>{
  GetTopics();
},[])

const ListForm=[
{
  title:"TOPICS",
  dataIndex:"teacherTopicId"
},
{
title:"STUDENT_SUBJECT_ID",
dataIndex:"studentSubjectId"
},
{
title:"TEACHER ID",
dataIndex:"teacherId"
},
{
title:"TOPIC ID",
dataIndex:"topicId"
},
{
title:"TOPIC STATUS",
dataIndex:"topicStatus"
},
{
  title:"Action",
  render:(text,data)=>{
    return(
      <div>
        <Button
        onClick={()=>{
          setDeletedModalOpen(true);
          setSelectedTopic(data);
        }}>
DELETE TOPIC
        </Button>
      </div>
    )
  }
}

]

    return(
<div>
            <Table columns={ListForm} dataSource={topic.map(m => ({ ...m, key: m.id }))} />
    {
                    isDeletedModalOpen && (
                        <TopicPage
                            isDeletedModalOpen={isDeletedModalOpen}
                            setDeletedModalOpen={setDeletedModalOpen}
                            selectedTopic={selectedTopic}
                            setSelectedTopic={setSelectedTopic}
                            getTopics={GetTopics}
                            getTopicId={getTopicId}
                        />
                    )
                }

</div>
    )
}
export default DeleteAllTopics;