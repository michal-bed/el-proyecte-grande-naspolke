package com.company.naspolke.service;

import com.company.naspolke.model.Event;
import com.company.naspolke.model.company.Company;

import java.util.Optional;
import java.util.UUID;

public interface EventService {
    Event saveAndReturnNewEvent(String eventDate, String eventType, Company company);
    Optional<Event> findEventByEventId(UUID eventId);
    void deleteEvent(Event event);
}
