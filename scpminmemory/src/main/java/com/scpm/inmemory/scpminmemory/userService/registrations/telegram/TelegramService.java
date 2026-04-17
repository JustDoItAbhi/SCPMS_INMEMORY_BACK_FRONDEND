package com.scpm.inmemory.scpminmemory.userService.registrations.telegram;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@Service
public class TelegramService {

//    @Value("${spring.telegram.token}")
    private String token;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Get all pending updates from Telegram
     */
    public List<TelegramUpdateDto> getTelegramUpdates() {
        String url = "https://api.telegram.org/bot" + token + "/getUpdates";

        ResponseEntity<TelegramResponseDto> response = restTemplate.getForEntity(url, TelegramResponseDto.class);
        TelegramResponseDto dto = response.getBody();

        if (dto != null && dto.isOk() && dto.getResult() != null) {
            return dto.getResult();
        }

        return List.of();
    }

    /**
     * Get the latest message from a specific user by username
     */
    public TelegramMessageDto getLatestMessageByUsername(String username) {
        List<TelegramUpdateDto> updates = getTelegramUpdates();

        // Process in reverse to get latest first
        for (int i = updates.size() - 1; i >= 0; i--) {
            TelegramUpdateDto update = updates.get(i);
            if (update.getMessage() != null &&
                    update.getMessage().getFrom() != null &&
                    username.equals(update.getMessage().getFrom().getUsername())) {
                return update.getMessage();
            }
        }

        return null;
    }

    /**
     * Get chat ID by username
     */
    public Long getChatIdByUsername(String username) {
        TelegramMessageDto message = getLatestMessageByUsername(username);
        if (message != null && message.getChat() != null) {
            return message.getChat().getId();
        }
        return null;
    }

    /**
     * Send message to Telegram user
     */
    public void sendMessage(String chatId, String message) {
        try {
            String encodedMessage = URLEncoder.encode(message, StandardCharsets.UTF_8.toString());
            String url = "https://api.telegram.org/bot" + token +
                    "/sendMessage?chat_id=" + chatId +
                    "&text=" + encodedMessage;

            log.info("Sending Telegram message to chatId: {}", chatId);
            restTemplate.getForObject(url, String.class);

        } catch (UnsupportedEncodingException e) {
            log.error("Error encoding message", e);
            throw new RuntimeException("Failed to send Telegram message", e);
        }
    }

    /**
     * Send OTP to user by their Telegram username
     */
    public boolean sendOtpByUsername(String username, String otp) {
        Long chatId = getChatIdByUsername(username);

        if (chatId == null) {
            log.warn("No chat found for username: {}", username);
            return false;
        }

        String message = String.format(
                "🔐 *Your OTP Code* 🔐\n\n" +
                        "Your OTP is: `%s`\n\n" +
                        "This code will expire in 5 minutes.\n" +
                        "Do not share this code with anyone.",
                otp
        );

        sendMessage(String.valueOf(chatId), message);
        return true;
    }
}