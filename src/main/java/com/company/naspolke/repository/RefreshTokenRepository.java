package com.company.naspolke.repository;

import com.company.naspolke.model.User;
import com.company.naspolke.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByJwt(String jwt);
    RefreshToken findByUser(User user);
    @Modifying
    @Query("UPDATE RefreshToken rt SET rt.jwt = ?1 WHERE rt.user = ?2")
    void updateJwtByUser(String jwt, User user);
}
