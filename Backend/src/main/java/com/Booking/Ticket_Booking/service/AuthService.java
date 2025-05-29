package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.AuthRequest;
import com.Booking.Ticket_Booking.DTO.AuthResponse;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.repository.UserRepository;
import com.Booking.Ticket_Booking.security.JwtService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    public AuthService(
            AuthenticationManager authManager,
            JwtService jwtService,
            @Qualifier("customUserDetailsService") UserDetailsService userDetailsService,
            UserRepository userRepository
    ) {
        this.authManager = authManager;
        this.jwtService=jwtService;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }


    public AuthResponse login(AuthRequest request) {
        // Authenticate user
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // Get user from DB
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Generate token using full user object
        String token = jwtService.generateToken(user); // Use your own method accepting `User`

        return new AuthResponse(token, user.getId(), user.getName(), user.getRole());
    }

}
