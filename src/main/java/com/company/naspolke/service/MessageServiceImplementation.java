package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Message;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.repository.AppUserRepository;
import com.company.naspolke.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class MessageServiceImplementation implements MessageService {

    private final MessageRepository messageRepository;
    private final AppUserRepository appUserRepository;

    @Autowired
    public MessageServiceImplementation(MessageRepository messageRepository, AppUserRepository appUserRepository) {
        this.messageRepository = messageRepository;
        this.appUserRepository = appUserRepository;
    }

    @Override
    public Message saveAndReturnNewMessage(Long krsNumber, String emailSender, String messageBody,
                                           boolean membershipRequest, boolean membershipInvitation) {
        Message newMessage = new Message();
        newMessage.setKrsNumber(krsNumber);
        newMessage.setEmailSender(emailSender);
        newMessage.setMessageText(messageBody);
        newMessage.setMessageDate(LocalDateTime.now());
        newMessage.setHasRead(false);
        newMessage.setMembershipRequest(membershipRequest);
        newMessage.setMembershipInvitation(membershipInvitation);
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

    @Override
    public boolean utilDecisionMessageService(String decision, Company company, AppUser loggedUser,
                                           AppUser companyOwner, String messageText) {
        Message message = saveAndReturnNewMessage(company.getKrsNumber(), loggedUser.getUserEmail(),
                messageText, false, false);
        companyOwner.addMessage(message);
        appUserRepository.saveAndFlush(companyOwner);
        if (decision.equals("accept")) {
            return true;
        } else {
            return false;
        }
    }
}
