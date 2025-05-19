package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.DTO.UserRequest;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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


}
