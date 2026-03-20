package com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class ConversationPreview {
        private String conversationId;
        private Long otherUserId;
        private String otherUserName;
        private String otherUserEmail;
        private String lastMessage;
        private LocalDateTime lastMessageTime;
        private long unreadCount;
}
