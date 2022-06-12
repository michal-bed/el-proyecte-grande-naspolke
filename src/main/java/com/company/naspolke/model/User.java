package com.company.naspolke.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "user_table", uniqueConstraints = { @UniqueConstraint(columnNames = {"user_email"}) })
public class User {

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
    @ElementCollection
    private Set<SimpleGrantedAuthority> roles = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return userId != null && Objects.equals(userId, user.userId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
