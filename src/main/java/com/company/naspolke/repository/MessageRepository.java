package com.company.naspolke.repository;

import com.company.naspolke.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {

    @Modifying
    @Query("DELETE FROM Message m WHERE m.messageId = ?1")
    void deleteMessageById(UUID messageId);

    @Modifying
    @Query("UPDATE Message h SET h.messageId = ?1 WHERE h.hasRead = ?2")
    void changeMessageStatus(UUID messageId, boolean hasRead);
}
