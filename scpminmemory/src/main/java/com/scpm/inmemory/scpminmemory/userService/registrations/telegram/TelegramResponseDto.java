package com.scpm.inmemory.scpminmemory.userService.registrations.telegram;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class TelegramResponseDto {
    @JsonProperty("ok")
    private boolean ok;

    @JsonProperty("result")
    private List<TelegramUpdateDto> result;
}
