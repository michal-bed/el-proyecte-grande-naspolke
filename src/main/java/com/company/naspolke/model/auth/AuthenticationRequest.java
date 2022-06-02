package com.company.naspolke.model.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
//@RequiredArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest implements Serializable {

    private String username;
    private String password;

    public AuthenticationRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }
}
