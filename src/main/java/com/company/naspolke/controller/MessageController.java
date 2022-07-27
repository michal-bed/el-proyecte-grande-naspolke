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

import javax.servlet.http.HttpServletRequest;
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

    @Autowired
    public MessageController(MessageService messageService, CompanyUserRoleService companyUserRoleService, JwtUtil jwtUtil,
                             RoleService roleService, AppUserService appUserService, CompanyService companyService) {
        this.messageService = messageService;
        this.companyUserRoleService = companyUserRoleService;
        this.jwtUtil = jwtUtil;
        this.roleService = roleService;
        this.appUserService = appUserService;
        this.companyService = companyService;
    }

    @PostMapping(value = "/send-request-for-membership/{krsNumber}")
    public void sendRequestForMembershipToOwners(HttpServletRequest request, @PathVariable String krsNumber,
                                                 @RequestBody ObjectNode objectNode) {
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<AppUser> user = appUserService.findUserByUserId(loggedUserId);
        Message message = messageService.saveAndReturnNewMessage(Long.valueOf(krsNumber),
                user.get().getUserEmail(), objectNode.get("messageText").asText(), true);
        List<AppUser> companyOwners = appUserService.getCompanyOwners(Long.valueOf(krsNumber));
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
        Optional<Company> company = companyService.getCompanyByKrsNumber(Long.valueOf(objectNode.get("krsNumber").asText()));
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(objectNode.get("emailSender").asText());
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.READER);
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<AppUser> user = appUserService.findUserByUserId(loggedUserId);
        messageService.changeMessageStatus(UUID.fromString(objectNode.get("messageId").asText()), true);
        List<AppUser> companyOwners = appUserService.getCompanyOwners(Long.valueOf(objectNode.get("krsNumber").asText()));
        for (AppUser _appUser : companyOwners) {
            _appUser.getUserMessages().stream()
                    .filter(e -> e.getMessageId().equals(UUID.fromString(objectNode.get("messageId").asText())))
                    .forEach(m -> m.setHasRead(true));
        }
        companyOwners.forEach(e -> e.getUserMessages().forEach(m -> System.out.println(m.isHasRead())));
        companyOwners.forEach(appUserService::updateAppUser);
        if (objectNode.get("decision").asText().equals("deny") && company.isPresent() && appUser.isPresent()) {
            Message message = messageService.saveAndReturnNewMessage(company.get().getKrsNumber(),
                    user.get().getUserEmail(), objectNode.get("messageText").asText(), false);
            appUser.get().addMessage(message);
            appUserService.updateAppUser(appUser.get());
        } else if (objectNode.get("decision").asText().equals("accept") &&
                company.isPresent() && appUser.isPresent() && role.isPresent()) {
            Message message = messageService.saveAndReturnNewMessage(company.get().getKrsNumber(),
                    user.get().getUserEmail(), objectNode.get("messageText").asText(), false);
            appUser.get().addMessage(message);
            appUserService.updateAppUser(appUser.get());
            companyUserRoleService.addNewMemberToCompany(company.get(), appUser.get(), role.get());
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
}
