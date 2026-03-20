package com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.entity;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class Message extends BaseModels {
    private Long senderId;
    private String senderEmail;
    private String senderName;
    private Long receiverId;
    private String receiverEmail;
    private String receiverName;
    private String content;
    private boolean isRead;
    private LocalDateTime sentAt;
    private LocalDateTime readAt;
    private String conversationId;

}