package com.company.naspolke.repository;

import com.company.naspolke.model.Role;
import com.company.naspolke.model.types.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findRoleByRoleType(RoleType roleType);
}