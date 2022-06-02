package com.company.naspolke.repository;

import com.company.naspolke.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends JpaRepository<AppUser, UUID>
{

    AppUser findByEmail(String email);

    AppUser findByLogin(String username);
}
