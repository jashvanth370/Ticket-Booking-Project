package com.Booking.Ticket_Booking.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class WishlistRequest {
    @NotNull(message = "Event id not null")
    private Long eventId;
    @NotNull(message = "User Id not null")
    private Long userId;
}
