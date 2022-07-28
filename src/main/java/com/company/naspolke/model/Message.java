package com.company.naspolke.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID messageId;
    private Long krsNumber;
    private String emailSender;
    private String messageText;
    private LocalDateTime messageDate;
    private boolean hasRead;
    private boolean membershipRequest;
    private boolean membershipInvitation;
    @ManyToOne
    private AppUser appUser;

    @Temporal(TemporalType.DATE)
    public void setMessageDate(LocalDateTime messageDate) {
        this.messageDate = messageDate;
    }
}
