package com.company.naspolke.repository;

import com.company.naspolke.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<AppUser, UUID> {
    AppUser findByUserEmail(String userEmail);

    //    @Modifying
//    @Query("UPDATE AppUser u SET u.roles = ?1 WHERE u.id = ?2")
//    void updateRolesByUserId(Set<? extends GrantedAuthority> roles, UUID userId);
}