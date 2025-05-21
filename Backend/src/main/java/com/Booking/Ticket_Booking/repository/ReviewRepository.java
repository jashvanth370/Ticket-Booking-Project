package com.Booking.Ticket_Booking.repository;

import com.Booking.Ticket_Booking.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review ,Long> {

}
