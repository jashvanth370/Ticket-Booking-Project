package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.DTO.UserRequest;
import com.Booking.Ticket_Booking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

}
