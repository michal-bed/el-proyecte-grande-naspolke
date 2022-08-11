package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Message;
import com.company.naspolke.model.company.Company;

import java.util.UUID;

public interface MessageService {
    Message saveAndReturnNewMessage(String krsNumber, String emailSender, String messageBody,
                                    boolean membershipRequest, boolean membershipInvitation);
    void deleteMessageByMessageId(UUID messageId);
    void changeMessageStatus(UUID messageId, boolean hasRead);
    boolean utilDecisionMessageService(String decision, Company company, AppUser loggedUser,
                                       AppUser companyOwner, String messageText);
}
