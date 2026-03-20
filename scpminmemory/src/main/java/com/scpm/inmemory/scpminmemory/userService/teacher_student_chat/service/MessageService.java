package com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.service;

import com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.dto.ConversationPreview;
import com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.entity.Message;

import java.util.List;

public interface MessageService {
    Message sendMessage(Long senderId, Long receiverId, String content);
    List<Message> getConversation(Long userId1, Long userId2);
    int markMessagesAsRead(Long receiverId);
    long getUnreadCount(Long userId);
    List<ConversationPreview> getUserConversations(Long userId);
    Message getMessage(Long messageId);
    boolean deleteMessage(Long messageId, Long userId);
    String sendMessageToTeacherForThesisApproval(String studentEmail, String teacherEmail, String message);
}
