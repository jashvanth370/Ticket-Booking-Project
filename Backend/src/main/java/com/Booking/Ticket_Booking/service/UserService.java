package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.DTO.UserRequest;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<?> createUser(UserRequest request) {
        try {
            Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }

            User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .role(request.getRole())
                    .password(encoder.encode(request.getPassword()))
                    .created_at(LocalDateTime.now())
                    .build();

            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User successfully registered");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> updateUser(UserRequest request, Long id) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            User user = optionalUser.get();

            if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
                Optional<User> emailCheck = userRepository.findByEmail(request.getEmail());
                if (emailCheck.isPresent()) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
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
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> deleteUser(Long id) {
        try {
            Optional<User> existingUser = userRepository.findById(id);
            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    public ResponseEntity<Response<?>> getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(new Response<>(200, "User found", user.get()));
        } else {
            return ResponseEntity.status(404).body(new Response<>(404, "User not found", null));
        }
    }


}
