package com.scpm.inmemory.scpminmemory.userService.teacher_student_chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequestDto {
      long senderId;
      long receiverId;
      String content;
}
