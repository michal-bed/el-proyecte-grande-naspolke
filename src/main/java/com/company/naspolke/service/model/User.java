package com.company.naspolke.service.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "user_table")
public class User {

    @Id
    private UUID userId;
    @Column(nullable = false, length = 20)
    private String userName;
    @Column(nullable = false, length = 20)
    private String userSurname;
    @Column(nullable = false, length = 45, unique = true)
    private String userEmail;
    @Column(nullable = false, length = 64)
    private String userPassword;

}
