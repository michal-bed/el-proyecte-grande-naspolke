package com.company.naspolke.service;

import com.company.naspolke.model.Message;

import java.util.UUID;

public interface MessageService {
    Message saveAndReturnNewMessage(Long krsNumber, String emailSender, String messageBody, boolean membershipRequest);
    void deleteMessageByMessageId(UUID messageId);
    void changeMessageStatus(UUID messageId, boolean hasRead);
}
