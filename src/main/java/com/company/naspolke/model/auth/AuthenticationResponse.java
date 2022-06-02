package com.company.naspolke.model.auth;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

public class AuthenticationResponse implements Serializable {

    private final String accessToken;
    private final Collection<String> roles = new ArrayList<>();

    public AuthenticationResponse(String jwt, Collection<String> authorities) {
        this.accessToken = jwt;

        this.roles.addAll(authorities);

    }

    public String getAccessToken() {
        return accessToken;
    }

    public Collection<String> getRoles() {
        return roles;
    }
}
