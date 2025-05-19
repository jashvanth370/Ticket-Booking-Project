package com.Booking.Ticket_Booking.repository;

import com.Booking.Ticket_Booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking,Long> {

}
