package com.company.naspolke.model.auth;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AuthenticationRequest implements Serializable {

    private String username;
    private String password;

    public AuthenticationRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }
}
