package com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.service;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.UserExceptions;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.UserRepository;
import com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.dto.ConversationPreview;
import com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.entity.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService{


        private final UserRepository userRepository;

        // Main storage: messageId -> Message
        private final ConcurrentHashMap<Long, Message> messageStore = new ConcurrentHashMap<>();

        // Index: conversationId -> Set of messageIds
        private final ConcurrentHashMap<String, Set<Long>> conversationIndex = new ConcurrentHashMap<>();

        // Index: userId -> Set of conversationIds (for quick access)
        private final ConcurrentHashMap<Long, Set<String>> userConversations = new ConcurrentHashMap<>();

        // Index: receiverId -> Set of unread messageIds
        private final ConcurrentHashMap<Long, Set<Long>> unreadMessages = new ConcurrentHashMap<>();

    public MessageServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
         * Send a new message
         */
        public Message sendMessage(Long senderId, Long receiverId, String content) {
            // Validate users exist
            Users sender = userRepository.findById(senderId);
            if(sender==null) {
                throw new UnknownFormatConversionException("Sender not found");
            }
            Users receiver = userRepository.findById(receiverId);
            if(receiver==null) {
                throw new UnknownFormatConversionException("Receiver not found");
            }

            // Create message
            Message message = new Message();
            message.setSenderId(senderId);
            message.setSenderEmail(sender.getEmail());
            message.setSenderName(sender.getName());
            message.setReceiverId(receiverId);
            message.setReceiverEmail(receiver.getEmail());
            message.setReceiverName(receiver.getName());
            message.setContent(content);

            // Generate conversation ID (sorted user IDs for consistency)
            String conversationId = generateConversationId(senderId, receiverId);
            message.setConversationId(conversationId);

            // Store message
            messageStore.put(message.getId(), message);

            // Update conversation index
            conversationIndex.computeIfAbsent(conversationId, k -> ConcurrentHashMap.newKeySet())
                    .add(message.getId());

            // Update user conversations
            userConversations.computeIfAbsent(senderId, k -> ConcurrentHashMap.newKeySet())
                    .add(conversationId);
            userConversations.computeIfAbsent(receiverId, k -> ConcurrentHashMap.newKeySet())
                    .add(conversationId);

            // Mark as unread for receiver
            unreadMessages.computeIfAbsent(receiverId, k -> ConcurrentHashMap.newKeySet())
                    .add(message.getId());

            return message;
        }

        /**
         * Get all messages in a conversation between two users
         */
        public List<Message> getConversation(Long userId1, Long userId2) {
            String conversationId = generateConversationId(userId1, userId2);
            Set<Long> messageIds = conversationIndex.get(conversationId);

            if (messageIds == null || messageIds.isEmpty()) {
                return new ArrayList<>();
            }

            return messageIds.stream()
                    .map(messageStore::get)
                    .filter(Objects::nonNull)
                    .sorted(Comparator.comparing(Message::getSentAt))
                    .collect(Collectors.toList());
        }

        /**
         * Mark all messages as read for a receiver
         */
        public int markMessagesAsRead(Long receiverId) {
            Set<Long> unreadIds = unreadMessages.get(receiverId);
            if (unreadIds == null || unreadIds.isEmpty()) {
                return 0;
            }

            int count = 0;
            for (Long messageId : unreadIds) {
                Message message = messageStore.get(messageId);
                if (message != null && !message.isRead()) {
                    message.setRead(true);
                    message.setReadAt(LocalDateTime.now());
                    count++;
                }
            }

            // Clear unread messages for this receiver
            unreadMessages.remove(receiverId);
            return count;
        }

        /**
         * Get unread count for a user
         */
        public long getUnreadCount(Long userId) {
            Set<Long> unread = unreadMessages.get(userId);
            return unread != null ? unread.size() : 0;
        }

        /**
         * Get all conversations for a user with last message preview
         */
        public List<ConversationPreview> getUserConversations(Long userId) {
            Set<String> conversationIds = userConversations.get(userId);
            if (conversationIds == null || conversationIds.isEmpty()) {
                return new ArrayList<>();
            }

            List<ConversationPreview> previews = new ArrayList<>();
            for (String convId : conversationIds) {
                Set<Long> messageIds = conversationIndex.get(convId);
                if (messageIds != null && !messageIds.isEmpty()) {
                    // Get latest message
                    Message latest = messageIds.stream()
                            .map(messageStore::get)
                            .filter(Objects::nonNull)
                            .max(Comparator.comparing(Message::getSentAt))
                            .orElse(null);

                    if (latest != null) {
                        Long otherUserId = getOtherUserId(convId, userId);
                        Users otherUser = userRepository.findById(otherUserId);
                        if(otherUser==null) {
                            throw new UserExceptions("null");
                        }

                        ConversationPreview preview = new ConversationPreview();
                        preview.setConversationId(convId);
                        preview.setOtherUserId(otherUserId);
                        preview.setOtherUserName(otherUser != null ? otherUser.getName() : "Unknown");
                        preview.setOtherUserEmail(otherUser != null ? otherUser.getEmail() : "Unknown");
                        preview.setLastMessage(latest.getContent());
                        preview.setLastMessageTime(latest.getSentAt());
                        preview.setUnreadCount(getUnreadCountForConversation(userId, convId));

                        previews.add(preview);
                    }
                }
            }

            // Sort by last message time (most recent first)
            previews.sort((a, b) -> b.getLastMessageTime().compareTo(a.getLastMessageTime()));
            return previews;
        }

        /**
         * Get unread count for a specific conversation
         */
        private long getUnreadCountForConversation(Long userId, String conversationId) {
            Set<Long> unread = unreadMessages.get(userId);
            if (unread == null) return 0;

            return unread.stream()
                    .map(messageStore::get)
                    .filter(msg -> msg != null && msg.getConversationId().equals(conversationId))
                    .count();
        }

        /**
         * Get a single message by ID
         */
        public Message getMessage(Long messageId) {
            return messageStore.get(messageId);
        }

        /**
         * Delete a message (for error correction)
         */
        public boolean deleteMessage(Long messageId, Long userId) {
            Message message = messageStore.get(messageId);
            if (message != null && (message.getSenderId().equals(userId) || message.getReceiverId().equals(userId))) {
                // Remove from indexes
                String conversationId = message.getConversationId();
                Set<Long> convMessages = conversationIndex.get(conversationId);
                if (convMessages != null) {
                    convMessages.remove(messageId);
                }

                Set<Long> unread = unreadMessages.get(message.getReceiverId());
                if (unread != null) {
                    unread.remove(messageId);
                }

                // Remove the message
                messageStore.remove(messageId);
                return true;
            }
            return false;
        }

    @Override
    public String sendMessageToTeacherForThesisApproval(String studentEmail, String teacherEmail, String message) {
        // Get student and teacher
        Optional<Users> studentOpt = userRepository.findByEmail(studentEmail);
        if (studentOpt.isEmpty()) {
            throw new UserExceptions("EMAIL NOT EXISTS " + studentEmail);
        }
        Users student = studentOpt.get();

        Optional<Users> teacherOpt = userRepository.findByEmail(teacherEmail);
        if (teacherOpt.isEmpty()) {
            throw new UserExceptions("EMAIL NOT EXISTS " + teacherEmail);
        }
        Users teacher = teacherOpt.get();

        // Send message through messaging system
        Message sentMessage = sendMessage(
                student.getId(),
                teacher.getId(),
                "Topic Submission: " + message
        );

        return "Message sent to teacher. Conversation ID: " + sentMessage.getConversationId();
    }

    /**
         * Generate consistent conversation ID (always smaller ID first)
         */
        private String generateConversationId(Long userId1, Long userId2) {
            return userId1 < userId2 ? userId1 + "_" + userId2 : userId2 + "_" + userId1;
        }

        /**
         * Extract the other user ID from conversation ID
         */
        private Long getOtherUserId(String conversationId, Long currentUserId) {
            String[] parts = conversationId.split("_");
            Long id1 = Long.parseLong(parts[0]);
            Long id2 = Long.parseLong(parts[1]);
            return id1.equals(currentUserId) ? id2 : id1;
        }

}
