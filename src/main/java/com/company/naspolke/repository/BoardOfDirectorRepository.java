package com.company.naspolke.repository;

import com.company.naspolke.model.company.companyBodies.BoardOfDirector;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BoardOfDirectorRepository extends JpaRepository<BoardOfDirector, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE BoardOfDirector bd SET bd.firstName = ?1 WHERE bd.boardOfDirectorId = ?2")
    void updateBoardOfDirectorFirstName(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE BoardOfDirector bd SET bd.secondName = ?1 WHERE bd.boardOfDirectorId = ?2")
    void updateBoardOfDirectorSecondName(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE BoardOfDirector bd SET bd.lastNameI = ?1 WHERE bd.boardOfDirectorId = ?2")
    void updateBoardOfDirectorLastNameI(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE BoardOfDirector bd SET bd.lastNameII = ?1 WHERE bd.boardOfDirectorId = ?2")
    void updateBoardOfDirectorLastNameII(String fieldToChange, Long memberId);
}
