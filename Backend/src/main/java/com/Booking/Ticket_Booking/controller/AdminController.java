package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.AuthRequest;
import com.Booking.Ticket_Booking.DTO.AuthResponse;
import com.Booking.Ticket_Booking.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login/admin")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

}
