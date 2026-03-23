package com.scpm.inmemory.scpminmemory.userService.registrations.telegram;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TelegramMessageDto {
    @JsonProperty("message_id")
    private int messageId;

    @JsonProperty("from")
    private TelegramUserDto from;

    @JsonProperty("chat")
    private TelegramChatDto chat;

    @JsonProperty("date")
    private long date;

    @JsonProperty("text")
    private String text;
}
