package com.company.naspolke.model;

import com.company.naspolke.model.aggregate.CompanyUserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "User_Table", uniqueConstraints = { @UniqueConstraint(columnNames = {"user_email"}) })
public class AppUser {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "user_id")
    private UUID userId;
    @Column(name = "user_name", nullable = false, length = 20)
    private String userName;
    @Column(name = "user_surname", nullable = false, length = 20)
    private String userSurname;
    @Column(name = "user_email", nullable = false, length = 45, unique = true)
    private String userEmail;
    @Column(name = "user_password", nullable = false, length = 64)
    private String userPassword;
    @Column(name = "enabled")
    private boolean enabled;
    @Column(name = "token_expired")
    private boolean tokenExpired;
    @Column(name = "verification_code", length = 64)
    private String verificationCode;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Column(name = "user_messages")
    private List<Message> userMessages;
    @ElementCollection
    @Column(name = "application_roles")
    private Set<SimpleGrantedAuthority> applicationRoles = new HashSet<>();
    @JsonIgnore
    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @Column(name = "company_user_role")
    private Set<CompanyUserRole> companyUserRole = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AppUser appUser = (AppUser) o;
        return userId != null && Objects.equals(userId, appUser.userId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public void addCompanyUserRole(CompanyUserRole companyUserRole) {
        this.companyUserRole.add(companyUserRole);
    }

    public void addMessage(Message message) {
        this.userMessages.add(message);
    }
}
