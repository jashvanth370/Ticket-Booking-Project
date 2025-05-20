package com.Booking.Ticket_Booking.DTO;

import com.Booking.Ticket_Booking.model.enums.UserRole;
import jakarta.validation.constraints.Email;
import lombok.*;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    @NotNull(message = "User name is required")
    private String name;
    @NotNull(message = "User email is required")
    @Email
    private String email;
    @NotNull(message = "User password is required")
    private String password;
    @NotNull(message = "User role is required")
    private UserRole role;
}

