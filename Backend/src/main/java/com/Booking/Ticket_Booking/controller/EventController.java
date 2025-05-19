package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.EventRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.enums.EventStatus;
import com.Booking.Ticket_Booking.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping("/create")
    public Response<?> createEvent(@RequestBody EventRequest eventRequest){
        return eventService.createEvent(eventRequest);
    }

    @PutMapping("/update/{id}")
    public Response<?> updateEvent(@RequestBody EventRequest eventRequest,
                                   @PathVariable Long id){
        return eventService.updateEvent(eventRequest,id);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) EventStatus status,
            @RequestParam(required = false) String title
    ) {
        List<Event> events = eventService.filterEvents(category, location, status, title);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/category")
    public Response<?> findByCategory(@RequestParam String category){
        return eventService.getEventByCategory(category);
    }

}
