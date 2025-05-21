package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.WishlistRequest;
import com.Booking.Ticket_Booking.model.Booking;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.model.Wishlist;
import com.Booking.Ticket_Booking.repository.EventRepository;
import com.Booking.Ticket_Booking.repository.UserRepository;
import com.Booking.Ticket_Booking.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public ResponseEntity<?> createWishlist(WishlistRequest wishlistRequest) {
        try {
            User user = userRepository.findById(wishlistRequest.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Event event = eventRepository.findById(wishlistRequest.getEventId())
                    .orElseThrow(() -> new IllegalArgumentException("Event not found"));

            Optional<Wishlist> existingWishlist = wishlistRepository
                    .findByUserAndEvent(user, event);

            if (existingWishlist.isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Event already exists in user's wishlist.");
            }

            Wishlist wishlist = Wishlist.builder()
                    .user(user)
                    .event(event)
                    .addedAt(LocalDateTime.now())
                    .build();

            eventRepository.save(event);
            userRepository.save(user);

            wishlistRepository.save(wishlist);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(wishlist);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong while processing your wishlist.");
        }
    }

    public ResponseEntity<?> removeWishlist(Long wishlistId){
        try{
            Optional<Wishlist> wishlist = wishlistRepository.findById(wishlistId);
            if(wishlist.isEmpty()){
                return ResponseEntity.status(400).body("No wishlist found");
            }
            Wishlist wishlist1 = wishlist.get();
            wishlistRepository.delete(wishlist1);

            return ResponseEntity.status(200).body("Successfully Remove");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> getAllWishlist(){
        try{
            List<Wishlist> wishlistList = wishlistRepository.findAll();
            if(wishlistList.isEmpty()){
                return ResponseEntity.status(404).body("No wishlist available");
            }
            return ResponseEntity.ok(wishlistList);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    public ResponseEntity<?> getWishlistByUserId(Long userId) {
        try {
            System.out.println("userId");
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            List<Wishlist> wishlistItems = wishlistRepository.findByUserId(userId);

            return ResponseEntity.ok(wishlistItems);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
}
