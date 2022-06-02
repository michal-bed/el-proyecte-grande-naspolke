package com.company.naspolke.model.auth;

import com.company.naspolke.model.Role;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

public class AuthenticationResponse implements Serializable {

    private final String accessToken;
    private final Collection<String> roles = new ArrayList<>();

    public AuthenticationResponse(String jwt, Collection<Role> authorities) {
        this.accessToken = jwt;

        for(Role authority : authorities)
        {
            this.roles.add(authority.getName());
        }

    }

    public String getAccessToken() {
        return accessToken;
    }

    public Collection<String> getRoles() {
        return roles;
    }
}
