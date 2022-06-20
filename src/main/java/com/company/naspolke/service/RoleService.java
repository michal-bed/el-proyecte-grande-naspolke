package com.company.naspolke.service;

import com.company.naspolke.model.Role;
import com.company.naspolke.model.types.RoleType;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findRoleByRoleType(RoleType roleType);
}
