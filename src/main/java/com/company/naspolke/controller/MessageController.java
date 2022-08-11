package com.company.naspolke.controller;

import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Message;
import com.company.naspolke.model.Role;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.types.RoleType;
import com.company.naspolke.service.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class MessageController {

    private final MessageService messageService;
    private final CompanyUserRoleService companyUserRoleService;
    private final JwtUtil jwtUtil;
    private final RoleService roleService;
    private final AppUserService appUserService;
    private final CompanyService companyService;
    private final EmailService emailService;

    @Autowired
    public MessageController(MessageService messageService, CompanyUserRoleService companyUserRoleService, JwtUtil jwtUtil,
                             RoleService roleService, AppUserService appUserService, CompanyService companyService,
                             EmailService emailService) {
        this.messageService = messageService;
        this.companyUserRoleService = companyUserRoleService;
        this.jwtUtil = jwtUtil;
        this.roleService = roleService;
        this.appUserService = appUserService;
        this.companyService = companyService;
        this.emailService = emailService;
    }

    @PostMapping(value = "/send-request-for-membership/{krsNumber}")
    public void sendRequestForMembershipToOwners(HttpServletRequest request, @PathVariable String krsNumber,
                                                 @RequestBody ObjectNode objectNode) {
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<AppUser> user = appUserService.findUserByUserId(loggedUserId);
        Message message = messageService.saveAndReturnNewMessage(krsNumber,
                user.get().getUserEmail(), objectNode.get("messageText").asText(), true, false);
        List<AppUser> companyOwners = appUserService.getCompanyOwners(krsNumber);
        if (companyOwners.size() > 0) {
            companyOwners.forEach(e -> e.addMessage(message));
            companyOwners.forEach(appUserService::updateAppUser);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or role");
        }
    }

    @GetMapping(value = "/get-request-notification")
    public List<Message> getAllAppUserNotification(HttpServletRequest request) {
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<List<Message>> appUserNotification = Optional.ofNullable(appUserService.findUserByUserId(loggedUserId)
                .get().getUserMessages());
        return appUserNotification.get().stream()
                    .sorted(Comparator.comparing(Message::getMessageDate).reversed())
                    .collect(Collectors.toList());
    }

    @PostMapping(value = "/send-decision-about-membership")
    public void sendOwnerMembershipDecision(HttpServletRequest request, @RequestBody ObjectNode objectNode) {
        Optional<Company> company = companyService.getCompanyByKrsNumber(objectNode.get("krsNumber").asText());
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(objectNode.get("emailSender").asText());
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.READER);
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<AppUser> user = appUserService.findUserByUserId(loggedUserId);
        messageService.changeMessageStatus(UUID.fromString(objectNode.get("messageId").asText()), true);
        List<AppUser> companyOwners = appUserService.getCompanyOwners(objectNode.get("krsNumber").asText());
        for (AppUser _appUser : companyOwners) {
            _appUser.getUserMessages().stream()
                    .filter(e -> e.getMessageId().equals(UUID.fromString(objectNode.get("messageId").asText())))
                    .forEach(m -> m.setHasRead(true));
        }
        companyOwners.forEach(appUserService::updateAppUser);
        if (company.isPresent() && appUser.isPresent()) {
            boolean acceptDecision = messageService.utilDecisionMessageService(objectNode.get("decision").asText(),
                    company.get(), user.get(), appUser.get(), objectNode.get("messageText").asText());
            if (acceptDecision && role.isPresent()) {
                companyUserRoleService.addNewMemberToCompany(company.get(), appUser.get(), role.get());
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't send notification message");
        }
    }

    @DeleteMapping(value = "/delete-message-from-notification/{messageId}")
    public void deleteReadMessage(HttpServletRequest request, @PathVariable String messageId) {
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<AppUser> appUser = appUserService.findUserByUserId(loggedUserId);
        if (appUser.isPresent()) {
            appUser.get().getUserMessages()
                    .removeIf(e -> e.getMessageId().equals(UUID.fromString(messageId)));
            appUserService.updateAppUser(appUser.get());
            messageService.deleteMessageByMessageId(UUID.fromString(messageId));
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't delete notification message");
        }
    }

    @PostMapping(value = "/send-invitation-to-company")
    public void sendInvitationForNewMember(HttpServletRequest request, @RequestBody ObjectNode objectNode) throws IOException, MessagingException {
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<AppUser> loggedUser = appUserService.findUserByUserId(loggedUserId);
        Optional<Company> company = companyService.getCompanyByCompanyId(UUID.fromString(objectNode.get("companyId").asText()));
        Message message = messageService.saveAndReturnNewMessage(company.get().getKrsNumber(),
                loggedUser.get().getUserEmail(), objectNode.get("messageText").asText(), false, true);
        Optional<AppUser> invitedUser = appUserService.findUserByUserEmail(objectNode.get("emailAddress").asText());
        if (invitedUser.isPresent()) {
            invitedUser.get().addMessage(message);
            appUserService.updateAppUser(invitedUser.get());
            emailService.sendEmail(invitedUser.get().getUserEmail(),
                    "./src/main/resources/email/invitation-to-company.txt",
                    invitedUser.get().getUserName() + ", otrzymałeś zaproszenie do spółki " + company.get().getCompanyName());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find user in database");
        }
    }

    @PostMapping(value = "/send-decision-about-invitation")
    public void sendAnswerAboutInvitation(HttpServletRequest request, @RequestBody ObjectNode objectNode) {
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<AppUser> loggedUser = appUserService.findUserByUserId(loggedUserId);
        Optional<Company> company = companyService.getCompanyByKrsNumber(objectNode.get("krsNumber").asText());
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.READER);
        Optional<AppUser> companyOwner = appUserService.findUserByUserEmail(objectNode.get("emailSender").asText());
        messageService.changeMessageStatus(UUID.fromString(objectNode.get("messageId").asText()), true);
        loggedUser.get().getUserMessages().stream()
                .filter(e -> e.getMessageId().equals(UUID.fromString(objectNode.get("messageId").asText())))
                .forEach(m -> m.setHasRead(true));
        appUserService.updateAppUser(loggedUser.get());
        if (company.isPresent() && companyOwner.isPresent()) {
            boolean acceptDecision = messageService.utilDecisionMessageService(objectNode.get("decision").asText(),
                    company.get(), loggedUser.get(), companyOwner.get(), objectNode.get("messageText").asText());
            if (acceptDecision && role.isPresent()) {
                companyUserRoleService.addNewMemberToCompany(company.get(), companyOwner.get(), role.get());
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't send notification message");
        }
    }
}
