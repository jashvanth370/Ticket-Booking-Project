package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.BookingRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.model.Booking;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.model.enums.BookingStatus;
import com.Booking.Ticket_Booking.model.enums.PaymentStatus;
import com.Booking.Ticket_Booking.repository.BookingRepository;
import com.Booking.Ticket_Booking.repository.EventRepository;
import com.Booking.Ticket_Booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    public BookingRepository bookingRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public EventRepository eventRepository;

    public Response<?> createBooking(BookingRequest bookingRequest,Long id) {
        try {
            Optional<User> existingUser = userRepository.findById(id);
            if(existingUser.isEmpty()){
                return new Response<>(400,"User not found",null);
            }

            User user = existingUser.get();

            Optional<Event> existingEvent = eventRepository.findById(bookingRequest.getEventId());
            if(existingEvent.isEmpty()){
                return new Response<>(400,"Event not found",null);
            }
            Event event = existingEvent.get();

            if (bookingRequest.getQuantity() > event.getAvailable_tickets()) {
                return new Response<>(400, "Not enough tickets available", null);
            }

            double totalAmount = bookingRequest.getQuantity() * event.getPrice();

            Booking booking = new Booking();
            booking.setUser(user);
            booking.setEvent(event);
            booking.setTotalAmount(totalAmount);
            booking.setQuantity(bookingRequest.getQuantity());
            booking.setBookingStatus(BookingStatus.PENDING);
            booking.setBookingTime(LocalDateTime.now());
            booking.setPaymentStatus(PaymentStatus.PENDING);

            event.setAvailable_tickets(event.getAvailable_tickets() - bookingRequest.getQuantity());
            eventRepository.save(event);

            bookingRepository.save(booking);

            return new Response<>(200, "Booking successfully", booking);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response<>(500, "Internal server error", null);
        }
    }
}
