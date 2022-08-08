package com.company.naspolke.service;

import com.company.naspolke.model.Event;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
class EventServiceImplementation implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImplementation(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }


    @Override
    public Event saveAndReturnNewEvent(String eventDate, String eventType, Company company) {
        Event event = new Event();
        event.setEventDate(eventDate);
        event.setEventType(eventType);
        event.setCompany(company);
        return eventRepository.saveAndFlush(event);
    }

    @Override
    public Optional<Event> findEventByEventId(UUID eventId) {
        return eventRepository.findById(eventId);
    }

    @Override
    public void deleteEvent(Event event) {
        eventRepository.delete(event);
    }
}
