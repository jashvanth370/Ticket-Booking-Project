package com.Booking.Ticket_Booking.DTO;

import com.Booking.Ticket_Booking.model.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {
    private String token;
    private Long userId;
    private String userName;
    private UserRole role;
    private int statusCode;
    private String message;

    public AuthResponse(String token, Long userId, String name, UserRole role) {
        this.token = token;
        this.userId = userId;
        this.userName = name;
        this.role = role;

    }
}
