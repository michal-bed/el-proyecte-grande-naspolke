package com.company.naspolke.model.auth;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest implements Serializable {

    private String userEmail;
    private String password;
}
