package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.BookingRequest;
import com.Booking.Ticket_Booking.DTO.PaymentConfirmationRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.DTO.StripeSessionRequest;
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

    @PostMapping("/eventBooking/{userId}/{eventId}")
    public ResponseEntity<?> bookingEvent(@RequestBody BookingRequest bookingRequest,
                                       @PathVariable Long userId,
                                          @PathVariable Long eventId){
        return bookingService.createBooking(bookingRequest,userId,eventId);
    }


    @GetMapping("/getAllBooking")
    public ResponseEntity<?> getAllBookings(){
        return bookingService.getAllBooking();
    }

    @GetMapping("/getMyBooking/{userId}")
    public ResponseEntity<?> getBookingByUser(@PathVariable Long userId){
        return bookingService.getBookingByUser(userId);
    }

    @PutMapping("/bookings/{bookingId}/confirm-payment")
    public ResponseEntity<?> confirmBookingPayment(
            @PathVariable Long bookingId,
            @RequestBody PaymentConfirmationRequest request) {
        return confirmBookingPayment(bookingId, request);
    }

    @PutMapping("/api/bookings/{bookingId}/confirm-payment")
    public ResponseEntity<?> confirmPayment(@PathVariable Long bookingId, @RequestBody PaymentConfirmationRequest request) {
        return confirmPayment(bookingId, request);
    }

    @PostMapping("/api/payments/create-checkout-session")
    public ResponseEntity<?> createStripeSession(@RequestBody StripeSessionRequest request) {
        return createStripeSession(request);
    }



}
