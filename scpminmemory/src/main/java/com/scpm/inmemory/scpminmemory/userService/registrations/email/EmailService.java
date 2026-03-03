package com.scpm.inmemory.scpminmemory.userService.registrations.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Primary
public class EmailService implements iEmailService {

    @Autowired
    private JavaMailSender mailSender;
@Override
    public String  sendOtp(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("arvinderpalsingh2321@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
        return "EMAIL SENT BY JAVA MAIL";
    }
}
