package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.EventRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

}
