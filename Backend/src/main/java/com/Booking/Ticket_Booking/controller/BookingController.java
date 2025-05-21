package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.BookingRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/eventBooking/{userId}")
    public ResponseEntity<?> bookingEvent(@RequestBody BookingRequest bookingRequest,
                                       @PathVariable Long userId){
        return bookingService.createBooking(bookingRequest,userId);
    }

    @GetMapping("/getAllBooking")
    public ResponseEntity<?> getAllBookings(){
        return bookingService.getAllBooking();
    }
}
