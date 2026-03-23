package com.scpm.inmemory.scpminmemory.userService.registrations.telegram;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TelegramUpdateDto {
    @JsonProperty("update_id")
    private long updateId;

    @JsonProperty("message")
    private TelegramMessageDto message;
}
