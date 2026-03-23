package com.scpm.inmemory.scpminmemory.userService.registrations.telegram;



import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TelegramChatDto {
    @JsonProperty("id")
    private long id;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("username")
    private String username;

    @JsonProperty("type")
    private String type;
}