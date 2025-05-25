package com.Booking.Ticket_Booking.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookingRequest {
    @NotNull(message = "Event quantity is required")
    private int quantity;
}
