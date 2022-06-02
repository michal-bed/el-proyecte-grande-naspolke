package com.company.naspolke.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;

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
//    @Enumerated(EnumType.STRING)
//    @Column
//    UserRole role;
    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    @ToString.Exclude
    private Collection<Role> roles;
    @Column
    private String nip;
    @Column
    private String companyName;
    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "user_company_role",
            joinColumns = { @JoinColumn(name = "app_user_id") },
            inverseJoinColumns = { @JoinColumn(name = "associated_company_role_id") }
    )
    @ToString.Exclude
    private Set<AssociatedCompanyRole> associatedCompaniesRoles = new HashSet<>();

    @Column
    private boolean enabled;
    @Column
    private boolean tokenExpired;

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
}
