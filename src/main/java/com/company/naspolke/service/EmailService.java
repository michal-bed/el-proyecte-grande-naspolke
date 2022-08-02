package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    void sendEmail(String user, String text, String topic) throws IOException, MessagingException;
    void sendVerificationEmail(AppUser appUser) throws MessagingException, UnsupportedEncodingException;
}
