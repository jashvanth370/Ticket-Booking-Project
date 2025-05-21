package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.ReviewRequest;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.Review;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.model.Wishlist;
import com.Booking.Ticket_Booking.repository.EventRepository;
import com.Booking.Ticket_Booking.repository.ReviewRepository;
import com.Booking.Ticket_Booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public ResponseEntity<?> createReview(ReviewRequest reviewRequest){
        try{
            User user = userRepository.findById(reviewRequest.getUserId())
                    .orElseThrow(()->new IllegalArgumentException("user not found"));

            Event event = eventRepository.findById(reviewRequest.getEventId())
                    .orElseThrow(()->new IllegalArgumentException("Event not found"));


            Review review = Review.builder()
                    .reviewDate(LocalDateTime.now())
                    .user(user)
                    .event(event)
                    .rating(reviewRequest.getRating())
                    .comment(reviewRequest.getComment())
                    .build();

            reviewRepository.save(review);
            return ResponseEntity.status(201).body("Successfully created review");
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    public ResponseEntity<?> getAllReview(){
        try{
            List<Review> reviewList = reviewRepository.findAll();
            if(reviewList.isEmpty()){
                return ResponseEntity.status(404).body("No wishlist available");
            }
            return ResponseEntity.ok(reviewList);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
