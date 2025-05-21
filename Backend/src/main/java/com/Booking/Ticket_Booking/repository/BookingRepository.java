package com.Booking.Ticket_Booking.repository;

import com.Booking.Ticket_Booking.model.Booking;
import com.Booking.Ticket_Booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findByUser(User user);
}
