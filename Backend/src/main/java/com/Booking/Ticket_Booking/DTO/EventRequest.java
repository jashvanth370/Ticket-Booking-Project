package com.Booking.Ticket_Booking.DTO;

import com.Booking.Ticket_Booking.model.enums.EventStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EventRequest {
    @NotNull(message = "Event title is required")
    private String title;
    @NotNull(message = "Event description is required")
    private String description;
    @NotNull(message = "Event location is required")
    private String location;
    @NotNull(message = "Event price is required")
    private double price;
    @NotNull(message = "Event available tickets is required")
    private Long availableTickets;
    @NotNull(message = "Event total is required")
    private Long totalTickets;
    @NotNull(message = "Event category is required")
    private String category;
    @NotNull(message = "Event status is required")
    private EventStatus status;
    private Long userId;
}

