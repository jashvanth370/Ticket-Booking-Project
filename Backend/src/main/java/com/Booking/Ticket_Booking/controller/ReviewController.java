package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.ReviewRequest;
import com.Booking.Ticket_Booking.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/createReview")
    public ResponseEntity<?> createReview(@RequestBody ReviewRequest reviewRequest){
        return reviewService.createReview(reviewRequest);
    }

    @GetMapping("/getAllReview")
    public ResponseEntity<?> getAllReview(){
        return reviewService.getAllReview();
    }
}
