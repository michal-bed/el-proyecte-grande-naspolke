package com.company.naspolke.service;

import java.io.IOException;

public interface EmailService {
    void sendEmail(String user, String text, String topic) throws IOException;
}
