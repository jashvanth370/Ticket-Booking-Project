package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.EventRequest;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.model.enums.EventStatus;
import com.Booking.Ticket_Booking.repository.EventRepository;
import com.Booking.Ticket_Booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> createEvent(EventRequest request) {
        try {
            Optional<User> userOptional = userRepository.findById(request.getUserId());
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }

            User user = userOptional.get();

            Event event = Event.builder()
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .location(request.getLocation())
                    .created_at(LocalDateTime.now())
                    .price(request.getPrice())
                    .available_tickets(request.getAvailableTickets())
                    .total_tickets(request.getTotalTickets())
                    .category(request.getCategory())
                    .status(request.getStatus())
                    .createdBy(user)
                    .build();

            eventRepository.save(event);
            return ResponseEntity.ok(event);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    public ResponseEntity<?> updateEvent(EventRequest request, Long id) {
        try {
            Optional<Event> eventOpt = eventRepository.findById(id);
            if (eventOpt.isEmpty()) {
                return ResponseEntity.status(404).body("Event not found");
            }

            Event event = eventOpt.get();
            event.setTitle(request.getTitle());
            event.setDescription(request.getDescription());
            event.setLocation(request.getLocation());
            event.setCategory(request.getCategory());
            event.setPrice(request.getPrice());
            event.setAvailable_tickets(request.getAvailableTickets());
            event.setTotal_tickets(request.getTotalTickets());
            event.setStatus(request.getStatus());

            eventRepository.save(event);
            return ResponseEntity.ok(event);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    public List<Event> filterEvents(String category, String location, EventStatus status, String title) {
        return eventRepository.findAll().stream()
                .filter(e -> category == null || e.getCategory().equalsIgnoreCase(category))
                .filter(e -> location == null || e.getLocation().equalsIgnoreCase(location))
                .filter(e -> status == null || e.getStatus() == status)
                .filter(e -> title == null || e.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }

    public ResponseEntity<?> getEventByCategory(String category) {
        List<Event> events = eventRepository.findByCategoryIgnoreCase(category);
        if (events.isEmpty()) {
            return ResponseEntity.status(404).body("No events found for this category");
        }
        return ResponseEntity.ok(events);
    }

    public ResponseEntity<?> getEventsByLocation(String location) {
        List<Event> events = eventRepository.findByLocation(location);
        if (events.isEmpty()) {
            return ResponseEntity.status(404).body("No events found in this location");
        }
        return ResponseEntity.ok(events);
    }

    public ResponseEntity<?> deleteEvent(Long id) {
        try {
            Optional<Event> eventOpt = eventRepository.findById(id);
            if (eventOpt.isEmpty()) {
                return ResponseEntity.status(404).body("Event not found");
            }

            eventRepository.deleteById(id);
            return ResponseEntity.ok("Event deleted successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    public ResponseEntity<?> getAllEvents() {
        try {
            List<Event> events = eventRepository.findAll();
            if (events.isEmpty()) {
                return ResponseEntity.status(404).body("No events available");
            }
            return ResponseEntity.ok(events);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    public ResponseEntity<?> getEventById(Long id) {
        try {
            Optional<Event> eventOpt = eventRepository.findById(id);
            return eventOpt.<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(404).body("Event not found"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    public List<Event> getEventsByUserId(Long userId) {
        return eventRepository.findByCreatedById(userId);
    }
}
