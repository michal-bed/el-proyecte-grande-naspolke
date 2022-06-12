package com.company.naspolke.repository;

import com.company.naspolke.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

//@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User findByUserEmail(String userEmail);

//    User findByLogin(String username);
}
//    @Modifying
//    @Query("UPDATE AppUser u SET u.roles = ?1 WHERE u.id = ?2")
//    void updateRolesByUserId(Set<? extends GrantedAuthority> roles, UUID userId);

