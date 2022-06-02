package com.company.naspolke.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@ToString
//@RequiredArgsConstructor
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = {
        "login",
        "email" }) })
public class AppUser {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
//    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column(unique=true)
    private String login;
    @Column(unique=true, nullable = false)
    private String email;
    @Column
    private String password;
    @Column
    private String nip;
    @Column
    private String companyName;

    @Column
    private boolean enabled;
    @Column
    private boolean tokenExpired;
    @ElementCollection
    private Set<GrantedAuthority> roles;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AppUser appUser = (AppUser) o;
        return id != null && Objects.equals(id, appUser.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public void setRoles(Collection<? extends GrantedAuthority> roles) {
    }
}
