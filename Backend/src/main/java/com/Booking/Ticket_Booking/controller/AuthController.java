package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.AuthRequest;
import com.Booking.Ticket_Booking.DTO.AuthResponse;
import com.Booking.Ticket_Booking.DTO.UserRequest;
import com.Booking.Ticket_Booking.service.AuthService;
import com.Booking.Ticket_Booking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ResponseEntity<?>> createUser(@RequestBody UserRequest request) {
        ResponseEntity<?> response = userService.createUser(request);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
