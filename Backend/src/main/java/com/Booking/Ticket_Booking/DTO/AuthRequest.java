package com.Booking.Ticket_Booking.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AuthRequest {
    @NotNull(message = "user email is required")
    private String email;
    @NotNull(message = "User password is required")
    private String password;
}
