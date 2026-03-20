package com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.controller;


import com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.dto.ConversationPreview;
import com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.dto.MessageRequestDto;
import com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.entity.Message;
import com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/messages")
@CrossOrigin(origins = "${spring.backend.url}", allowCredentials = "true")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody MessageRequestDto request) {
        Message message = messageService.sendMessage(
                request.getSenderId(),
                request.getReceiverId(),
                request.getContent()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversation/{userId1}/{userId2}")
    public ResponseEntity<List<Message>> getConversation(
            @PathVariable Long userId1,
            @PathVariable Long userId2) {
        return ResponseEntity.ok(messageService.getConversation(userId1, userId2));
    }

    @PutMapping("/mark-read/{receiverId}")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable Long receiverId) {
        int count = messageService.markMessagesAsRead(receiverId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("markedCount", count);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/unread/{userId}")
    public ResponseEntity<Map<String, Object>> getUnreadCount(@PathVariable Long userId) {
        long count = messageService.getUnreadCount(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("unreadCount", count);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/conversations/{userId}")
    public ResponseEntity<List<ConversationPreview>> getUserConversations(
            @PathVariable Long userId) {
        return ResponseEntity.ok(messageService.getUserConversations(userId));
    }

    @DeleteMapping("/{messageId}/{userId}")
    public ResponseEntity<Map<String, Object>> deleteMessage(
            @PathVariable Long messageId,
            @PathVariable Long userId) {
        boolean deleted = messageService.deleteMessage(messageId, userId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", deleted);
        return ResponseEntity.ok(response);
    }

}