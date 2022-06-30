package com.company.naspolke.service;

import com.company.naspolke.model.Message;
import com.company.naspolke.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class MessageServiceImplementation implements MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageServiceImplementation(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public Message saveAndReturnNewMessage(Long krsNumber, String emailSender, String messageBody, boolean membershipRequest) {
        Message newMessage = new Message();
        newMessage.setKrsNumber(krsNumber);
        newMessage.setEmailSender(emailSender);
        newMessage.setMessageText(messageBody);
        newMessage.setMessageDate(LocalDateTime.now());
        newMessage.setHasRead(false);
        newMessage.setMembershipRequest(membershipRequest);
        return messageRepository.saveAndFlush(newMessage);
    }

    @Override
    @Transactional
    public void deleteMessageByMessageId(UUID messageId) {
        messageRepository.deleteById(messageId);
    }

    @Override
    @Transactional
    public void changeMessageStatus(UUID messageId, boolean hasRead) {
        messageRepository.changeMessageStatus(messageId, hasRead);
    }
}
