package com.Booking.Ticket_Booking.DTO;

import com.Booking.Ticket_Booking.model.enums.EventStatus;
import lombok.Data;

@Data
public class EventRequest {
    private String title;
    private String description;
    private String location;
    private double price;
    private Long availableTickets;
    private Long totalTickets;
    private String category;
    private EventStatus status;
}

