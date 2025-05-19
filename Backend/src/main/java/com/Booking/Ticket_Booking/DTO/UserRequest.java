package com.Booking.Ticket_Booking.DTO;

import com.Booking.Ticket_Booking.model.enums.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String name;
    private String email;
    private String password;
    private UserRole role;
}

