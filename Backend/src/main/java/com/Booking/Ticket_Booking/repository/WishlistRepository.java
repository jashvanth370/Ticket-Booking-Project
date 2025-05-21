package com.Booking.Ticket_Booking.repository;

import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist,Long> {
    Optional<Wishlist> findByUserAndEvent(User user, Event event);

}
