package com.scpm.inmemory.scpminmemory.userService.registrations.telegram;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendMessgeDto {
    private String chatId;
    private String textMessage;
}