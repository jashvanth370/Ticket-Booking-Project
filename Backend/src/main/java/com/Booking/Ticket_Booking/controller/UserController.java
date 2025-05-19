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

    @PutMapping("/update/{id}")
    public Response<?> updateUser( @RequestBody UserRequest request,
                                   @PathVariable Long id){
        return userService.updateUser(request,id);
    }

    @DeleteMapping("/delete/{id}")
    public Response<?> deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }

    @GetMapping("/getAll")
    public Response<?> getAllUsers(){
        return userService.getAllUsers();
    }


}
