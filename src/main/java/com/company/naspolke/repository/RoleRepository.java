package com.company.naspolke.repository;

import com.company.naspolke.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer>
{

    Role findByName(String role_admin);
}
