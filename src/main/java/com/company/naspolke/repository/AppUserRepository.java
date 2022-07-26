package com.company.naspolke.repository;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, UUID> {
    AppUser findByUserEmail(String userEmail);
    AppUser findByUserId(UUID id);
    @Modifying
    @Query("UPDATE AppUser u SET u.applicationRoles = ?1 WHERE u.userId = ?2")
    void updateRolesByUserId(Set<? extends GrantedAuthority> roles, UUID userId);
}
