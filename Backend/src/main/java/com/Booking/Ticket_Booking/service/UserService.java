package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.DTO.UserRequest;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public Response<?> createUser(UserRequest request){
        try{
            Optional<User> existingUser =userRepository.findByEmail(request.getEmail());
            if(existingUser.isPresent()){
                return new Response<>(400,"Email already exist",null);
            }
            User user =User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .role(request.getRole())
                    .password(encoder.encode(request.getPassword()))
                    .created_at(LocalDateTime.now())
                    .build();
            userRepository.save(user);
            return new Response<>(200,"User successfully registered",null);

        }
        catch (Exception e){
            return new Response<>(500,"Internal Server Error",null);
        }
    }

    public Response<?> updateUser(UserRequest request, Long id) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);
            if (optionalUser.isEmpty()) {
                return new Response<>(400, "User not found", null);
            }
            User user = optionalUser.get();
            if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
                Optional<User> emailCheck = userRepository.findByEmail(request.getEmail());
                if (emailCheck.isPresent()) {
                    return new Response<>(400, "Email already exists", null);
                }
                user.setEmail(request.getEmail());
            }
            if (request.getName() != null) {
                user.setName(request.getName());
            }
            if (request.getRole() != null) {
                user.setRole(request.getRole());
            }
            if (request.getPassword() != null && !request.getPassword().isBlank()) {
                user.setPassword(encoder.encode(request.getPassword()));
            }
            userRepository.save(user);
            return new Response<>(200, "User updated successfully", user);

        } catch (Exception e) {
            e.printStackTrace();
            return new Response<>(500, "Internal server error", null);
        }
    }

    public Response<?> deleteUser(Long id){
        try{
            Optional<User> existingUser = userRepository.findById(id);
            if(existingUser.isEmpty()){
                return new Response<>(400,"User Not Found",null);
            }
            userRepository.deleteById(id);
            return new Response<>(200,"User Delete successfully",null);
        }
        catch(Exception e){
            return new Response<>(500,"Internal server error",null);
        }
    }

    public Response<?> getAllUsers(){
        try{
            List<User> userList = userRepository.findAll();
            return new Response<>(200,"Users Fetched successfully",userList);
        }
        catch(Exception e){
            return new Response<>(500,"Internal server error",null);
        }
    }



}
