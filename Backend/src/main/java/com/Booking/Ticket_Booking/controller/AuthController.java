package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.AuthRequest;
import com.Booking.Ticket_Booking.DTO.AuthResponse;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.DTO.UserRequest;
import com.Booking.Ticket_Booking.service.AuthService;
import com.Booking.Ticket_Booking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    private final AuthService authService;

    @PostMapping("/register")
    public Response<?> createUser(@RequestBody UserRequest request){
        return userService.createUser(request);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
