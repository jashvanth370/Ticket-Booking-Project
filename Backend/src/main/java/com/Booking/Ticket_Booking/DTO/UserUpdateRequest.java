package com.Booking.Ticket_Booking.DTO;

import com.Booking.Ticket_Booking.model.enums.UserRole;
import jakarta.validation.constraints.Email;
import lombok.*;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {
    private String name;
    @Email
    private String email;
    private String password;
    private UserRole role;
}

