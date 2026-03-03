package com.scpm.inmemory.scpminmemory.userService.registrations.email.brevoemailservice;//package userService.registrations.email.brevoemailservice;
//
//import com.sendgrid.Method;
//import com.sendgrid.Request;
//import com.sendgrid.Response;
//import com.sendgrid.SendGrid;
//import com.sendgrid.helpers.mail.Mail;
//import com.sendgrid.helpers.mail.objects.Content;
//import com.sendgrid.helpers.mail.objects.Email;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Primary;
//import org.springframework.stereotype.Service;
//import userService.registrations.email.iEmailService;
//
//@Service
//@Primary
//public class SendGridEmailService implements iEmailService {
//
//    @Value("${sendgrid.api.key}")
//    private String apiKey;
//
//
//    @Override
//    public String sendOtp(String toEmail, String otp, String subject) {
//        try {
//            SendGrid sendGrid = new SendGrid(apiKey);
//
//            System.out.println("🚀 Using VERIFIED From: parthsethi29@gmail.com");
//            System.out.println("📨 Sending to: " + toEmail);
//
//            // Use ONLY the verified email - no Reply-To complications
//            Email from = new Email("parthsethi29@gmail.com", "parth");
//            Email to = new Email(toEmail);
//            Content content = new Content("text/html", buildOtpEmailTemplate(otp));
//
//            Mail mail = new Mail(from, subject != null ? subject : "Your OTP Code", to, content);
//
//            // NO Reply-To set - let SendGridEmailService use From address as default
//
//            Request request = new Request();
//            request.setMethod(Method.POST);
//            request.setEndpoint("mail/send");
//            request.setBody(mail.build());
//
//            Response response = sendGrid.api(request);
//
//            return handleResponse(response, toEmail);
//
//        } catch (Exception e) {
//            System.err.println("❌ SENDGRID EMAIL EXCEPTION: " + e.getMessage());
//            e.printStackTrace();
//            return "EMAIL_SENDING_FAILED: " + e.getMessage();
//        }
//    }
//
//    private String handleResponse(Response response, String toEmail) {
//        int statusCode = response.getStatusCode();
//
//        System.out.println("📊 SendGrid Response Status: " + statusCode);
//        System.out.println("📋 SendGrid Response Body: " + response.getBody());
//
//        if (statusCode == 202) {
//            System.out.println("✅ SENDGRID EMAIL SENT SUCCESSFULLY to: " + toEmail);
//            return "EMAIL_SENT_SUCCESSFULLY";
//        } else {
//            System.err.println("❌ SENDGRID EMAIL FAILED - Status: " + statusCode);
//
//            if (statusCode == 403) {
//                return "ISSUE_WITH_REPLY_TO - Remove abhi@mail.com from Reply-To in SendGrid sender settings";
//            } else {
//                return "EMAIL_SENDING_FAILED - HTTP " + statusCode;
//            }
//        }
//    }
//
//    private String buildOtpEmailTemplate(String otp) {
//        return "<!DOCTYPE html>" +
//                "<html>" +
//                "<head>" +
//                "<meta charset='UTF-8'>" +
//                "<style>" +
//                "body { font-family: Arial, sans-serif; background-color: #f6f9fc; margin: 0; padding: 20px; }" +
//                ".container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }" +
//                ".header { text-align: center; color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; }" +
//                ".otp-code { font-size: 42px; font-weight: bold; text-align: center; color: #2c5aa0; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; letter-spacing: 8px; border: 2px dashed #ddd; }" +
//                ".footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; padding-top: 20px; border-top: 1px solid #f0f0f0; }" +
//                "</style>" +
//                "</head>" +
//                "<body>" +
//                "<div class='container'>" +
//                "<div class='header'>" +
//                "<h2>🔐 Your Verification Code</h2>" +
//                "</div>" +
//                "<p>Hello,</p>" +
//                "<p>Please use the following One-Time Password (OTP) to complete your verification:</p>" +
//                "<div class='otp-code'>" + otp + "</div>" +
//                "<p><strong>⚠️ This code will expire in 10 minutes.</strong></p>" +
//                "<p>If you didn't request this code, please ignore this email.</p>" +
//                "<div class='footer'>" +
//                "<p>&copy; 2024 Your App. All rights reserved.</p>" +
//                "</div>" +
//                "</div>" +
//                "</body>" +
//                "</html>";
//    }
//}