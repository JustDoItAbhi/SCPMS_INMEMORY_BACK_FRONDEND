package com.scpm.inmemory.scpminmemory.userService.registrations.telegram;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class TelegramUserDto {
    @JsonProperty("id")
    private long id;

    @JsonProperty("is_bot")
    private boolean isBot;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("username")
    private String username;

    @JsonProperty("language_code")
    private String languageCode;

    public String getFullName() {
        if (lastName != null) {
            return firstName + " " + lastName;
        }
        return firstName;
    }
}
