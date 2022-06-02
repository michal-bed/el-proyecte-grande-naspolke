package com.company.naspolke.repository;

import com.company.naspolke.model.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Set;
import java.util.UUID;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends JpaRepository<AppUser, UUID>
{
    AppUser findByEmail(String email);

    AppUser findByLogin(String username);

//    @Modifying
//    @Query("UPDATE AppUser u SET u.roles = ?1 WHERE u.id = ?2")
//    void updateRolesByUserId(Set<? extends GrantedAuthority> roles, UUID userId);
}
