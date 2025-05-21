package com.Booking.Ticket_Booking.controller;

import com.Booking.Ticket_Booking.DTO.WishlistRequest;
import com.Booking.Ticket_Booking.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/createWishlist")
    public ResponseEntity<?> createWishlist(@RequestBody WishlistRequest wishlistRequest){
        return wishlistService.createWishlist(wishlistRequest);
    }

    @DeleteMapping("/removeWishlist/{wishlistId}")
    public ResponseEntity<?> removeWishlist(@PathVariable Long wishlistId){
        return wishlistService.removeWishlist(wishlistId);
    }

    @GetMapping("/getAllWishlist")
    public ResponseEntity<?> getAllWishlist(){
        return wishlistService.getAllWishlist();
    }
}
