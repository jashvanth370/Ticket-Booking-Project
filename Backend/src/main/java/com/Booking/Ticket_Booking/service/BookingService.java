package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.BookingRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.model.Booking;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.model.enums.BookingStatus;
import com.Booking.Ticket_Booking.model.enums.PaymentStatus;
import com.Booking.Ticket_Booking.repository.BookingRepository;
import com.Booking.Ticket_Booking.repository.EventRepository;
import com.Booking.Ticket_Booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    public BookingRepository bookingRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public EventRepository eventRepository;

    public ResponseEntity<?> createBooking(BookingRequest bookingRequest, Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Event event = eventRepository.findById(bookingRequest.getEventId())
                    .orElseThrow(() -> new IllegalArgumentException("Event not found"));

            int requestedQuantity = bookingRequest.getQuantity();
            if (requestedQuantity <= 0) {
                return ResponseEntity
                        .badRequest()
                        .body("Quantity must be greater than 0");
            }

            if (requestedQuantity > event.getAvailable_tickets()) {
                return ResponseEntity
                        .badRequest()
                        .body("Not enough tickets available");
            }

            // Calculate total amount
            double totalAmount = requestedQuantity * event.getPrice();

            Booking booking = Booking.builder()
                    .user(user)
                    .event(event)
                    .quantity(requestedQuantity)
                    .totalAmount(totalAmount)
                    .bookingStatus(BookingStatus.PENDING)
                    .paymentStatus(PaymentStatus.PENDING)
                    .bookingTime(LocalDateTime.now())
                    .build();


            event.setAvailable_tickets(event.getAvailable_tickets() - requestedQuantity);

            // Save to DB
            eventRepository.save(event);
            bookingRepository.save(booking);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(booking);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong while processing your booking.");
        }
    }

    public ResponseEntity<?> getAllBooking(){
        try{
            List<Booking> bookingList = bookingRepository.findAll();
            if(bookingList.isEmpty()){
                return ResponseEntity.status(404).body("No bookings available");
            }
            return ResponseEntity.ok(bookingList);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    public ResponseEntity<?> getBookingByUser(Long userId){
        try{
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            List<Booking> bookingList = bookingRepository.findByUser(user);
            return  ResponseEntity.ok(bookingList);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

}
