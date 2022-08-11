package com.company.naspolke.repository;

import com.company.naspolke.model.company.companyBodies.BoardMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BoardMemberRepository extends JpaRepository<BoardMember, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE BoardMember bm SET bm.firstName = ?1 WHERE bm.boardMemberId = ?2")
    void updateBoardMemberFirstName(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE BoardMember bm SET bm.secondName = ?1 WHERE bm.boardMemberId = ?2")
    void updateBoardMemberSecondName(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE BoardMember bm SET bm.lastNameI = ?1 WHERE bm.boardMemberId = ?2")
    void updateBoardMemberLastNameI(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE BoardMember bm SET bm.lastNameII = ?1 WHERE bm.boardMemberId = ?2")
    void updateBoardMemberLastNameII(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE BoardMember bm SET bm.function = ?1 WHERE bm.boardMemberId = ?2")
    void updateBoardMemberFunction(String fieldToChange, Long memberId);
}
