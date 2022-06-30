package com.company.naspolke.model.auth;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

public class AuthenticationResponse implements Serializable {

    private final String accessToken;
    private final String email;
    private final Collection<String> roles = new ArrayList<>();

    public AuthenticationResponse(String jwt, Collection<String> authorities, String email) {
        this.accessToken = jwt;
        this.email = email;
        this.roles.addAll(authorities);
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getEmail() {
        return email;
    }

    public Collection<String> getRoles() {
        return roles;
    }
}
