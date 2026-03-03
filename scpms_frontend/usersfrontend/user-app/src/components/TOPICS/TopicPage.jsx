import { Modal } from "antd";
import { DeleteAllTeachersTopicByTeacherId, GetALLTopicsByTeacherid } from "../apis";
import { useEffect, useState } from "react";

const TopicPage = ({
    isDeletedModalOpen,
    setDeletedModalOpen,
    selectedTopic,
    setSelectedTopic,
    getTopics,
    getTopicId
}) => {
    const teacherId = localStorage.getItem("teacherId");
    const [isLoading, setIsLoading] = useState(false);

    const id=52

    const handleOk = async () => {
        setIsLoading(true);
        try {
            const result = await DeleteAllTeachersTopicByTeacherId(id);
            console.log("deleted TOPICS ", result);
        
            if (result.success) {
                console.log("Topics deleted successfully");
                await getTopics(); // Only call once if successful
            }
            setSelectedTopic(null);
            setDeletedModalOpen(false);
        } catch (err) {
            console.error("ERROR: UNABLE TO DELETE", err);
            setSelectedTopic(null);
            setDeletedModalOpen(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setDeletedModalOpen(false);
        setSelectedTopic(null);
    };

    return (
        <Modal
            title="DELETE TOPICS?"
            open={isDeletedModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={isLoading} 
            okText="Delete"
            cancelText="Cancel"
        >
            <p style={{ fontSize: "16px" }}>
                Are you sure you want to delete all topics?
            </p>
            <p style={{ fontSize: "16px" }}>
                This action cannot be undone and you will lose all topics data.
            </p>
        </Modal>
    );
}

export default TopicPage;