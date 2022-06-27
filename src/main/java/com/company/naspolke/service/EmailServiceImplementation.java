package com.company.naspolke.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Properties;

@Service
public class EmailServiceImplementation implements EmailService {

    private JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImplementation(@Lazy JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("naspolke.organizacja@gmail.com");
        mailSender.setPassword("tlwpqmlwyqvgnvzh");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

    @Override
    public void sendEmail(String user, String text, String topic) throws MailException, IOException {

        String line;
        StringBuilder emailBody = new StringBuilder();

        BufferedReader br = new BufferedReader(new FileReader(text));
        while ((line = br.readLine()) != null) {
            emailBody.append(line);
        }

        SimpleMailMessage emailMessage = new SimpleMailMessage();
        emailMessage.setFrom("naspolke.organizacja@gmail.com");
        emailMessage.setTo(user);
        emailMessage.setSubject(topic);
        emailMessage.setText(emailBody.toString());
        javaMailSender.send(emailMessage);
        System.out.println("Email send successfully");
    }
}
