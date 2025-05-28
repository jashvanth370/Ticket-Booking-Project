package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.EventRequest;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.model.enums.EventStatus;
import com.Booking.Ticket_Booking.repository.UserRepository;
import com.Booking.Ticket_Booking.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/create/{userId}" ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createEvent(@PathVariable Long userId,
                                         @RequestParam("request") EventRequest eventRequest,
                                         @RequestParam("image") MultipartFile image) {
        System.out.println("ccccc");
        return eventService.createEvent(eventRequest,userId,image);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEvent(@RequestBody EventRequest eventRequest,
                                         @PathVariable Long id) {
        return eventService.updateEvent(eventRequest, id);
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

    @GetMapping("/getEventsByCategory/{category}")
    public ResponseEntity<?> findByCategory(@PathVariable String category) {
        return eventService.getEventByCategory(category);
    }

    @GetMapping("/getEventsByLocation/{location}")
    public ResponseEntity<?> findByLocation(@PathVariable String location) {
        return eventService.getEventsByLocation(location);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        return eventService.deleteEvent(id);
    }

    @GetMapping("/getAllEvents")
    public ResponseEntity<?> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/getEventById/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @GetMapping("/my-events")
    public ResponseEntity<?> getMyEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Event> events = eventService.getEventsByUserId(user.getId());
        return ResponseEntity.ok(events);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategory(){
        return eventService.getAllCategory();
    }
}
