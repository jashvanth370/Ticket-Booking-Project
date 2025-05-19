package com.Booking.Ticket_Booking.DTO;

import lombok.Data;

@Data
public class BookingRequest {
    private Long eventId;
    private int quantity;
}
