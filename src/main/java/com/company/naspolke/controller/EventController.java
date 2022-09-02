package com.company.naspolke.controller;

import com.company.naspolke.model.Event;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.service.CompanyService;
import com.company.naspolke.service.EventService;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
public class EventController {

    private final EventService eventService;
    private final CompanyService companyService;

    public EventController(EventService eventService, CompanyService companyService) {
        this.eventService = eventService;
        this.companyService = companyService;
    }

    @GetMapping(value = "/get-company-events/{companyId}")
    public List<Event> getCompanyEvents(@PathVariable String companyId) {
        Optional<Company> company = companyService.getCompanyByCompanyId(UUID.fromString(companyId));
        if (company.isPresent()) {
            return company.get().getEventsList();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company");
        }
    }

    @PostMapping(value = "/add-new-event")
    public List<Event> addAndReturnEventFromCalendar(@RequestBody ObjectNode objectNode) {
        Optional<Company> company = companyService.getCompanyByCompanyId(UUID.fromString(objectNode.get("companyId").asText()));
        if (company.isPresent()) {
            Event newEvent = eventService.saveAndReturnNewEvent(
                    objectNode.get("formattedDate").asText(), objectNode.get("eventType").asText(), company.get());
            company.get().addNewEvent(newEvent);
            companyService.updateCompany(company.get());
            return company.get().getEventsList();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company");
        }
    }

    @DeleteMapping(value = "/delete-event/{companyId}/{eventId}")
    public void deleteEventInCompany(@PathVariable String companyId, @PathVariable String eventId) {
        Optional<Company> company = companyService.getCompanyByCompanyId(UUID.fromString(companyId));
        Optional<Event> event = eventService.findEventByEventId(UUID.fromString(eventId));
        if (company.isPresent() && event.isPresent()) {
            company.get().getEventsList().removeIf(e -> e.getEventId().equals(UUID.fromString(eventId)));
            companyService.updateCompany(company.get());
            eventService.deleteEvent(event.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or event");
        }
    }

}
