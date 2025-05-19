package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.BookingRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/eventBooking")
    public Response<?> bookingEvent(@RequestBody BookingRequest bookingRequest,
                                    Long id){
        return bookingService.createBooking(bookingRequest,id);
    }
}
