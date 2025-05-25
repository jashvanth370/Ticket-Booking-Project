package com.Booking.Ticket_Booking.DTO;

import lombok.Data;

@Data
public class StripeSessionRequest {
    private Long bookingId;
    private double amount;
    private String eventName;
}

