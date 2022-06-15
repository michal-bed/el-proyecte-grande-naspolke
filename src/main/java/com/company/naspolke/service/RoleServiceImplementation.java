package com.company.naspolke.service;

import com.company.naspolke.model.Company;
import com.company.naspolke.model.Role;
import com.company.naspolke.model.types.RoleType;
import com.company.naspolke.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImplementation implements RoleService {

    private RoleRepository roleRepository;

    @Autowired
    public RoleServiceImplementation(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Optional<Role> findRoleByRoleType(RoleType roleType) {
        return Optional.ofNullable(roleRepository.findByRoleType(roleType));
    }
}
