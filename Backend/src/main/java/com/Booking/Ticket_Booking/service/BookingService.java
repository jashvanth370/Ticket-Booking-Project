package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.BookingRequest;
import com.Booking.Ticket_Booking.DTO.PaymentConfirmationRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.DTO.StripeSessionRequest;
import com.Booking.Ticket_Booking.model.Booking;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.User;
import com.Booking.Ticket_Booking.model.enums.BookingStatus;
import com.Booking.Ticket_Booking.model.enums.PaymentStatus;
import com.Booking.Ticket_Booking.repository.BookingRepository;
import com.Booking.Ticket_Booking.repository.EventRepository;
import com.Booking.Ticket_Booking.repository.UserRepository;
import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;



import java.time.LocalDateTime;
import java.util.*;

@Service
public class BookingService {

    @Autowired
    public BookingRepository bookingRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public EventRepository eventRepository;


    public ResponseEntity<?> getAllBooking(){
        try{
            List<Booking> bookingList = bookingRepository.findAll();
            if(bookingList.isEmpty()){
                return ResponseEntity.status(404).body("No bookings available");
            }
            return ResponseEntity.ok(bookingList);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }

    public ResponseEntity<?> getBookingByUser(Long userId){
        try{
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            List<Booking> bookingList = bookingRepository.findByUser(user);
            return  ResponseEntity.ok(bookingList);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }





    public ResponseEntity<?> confirmBookingPayment(Long bookingId,PaymentConfirmationRequest request) {
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

            booking.setPaymentStatus(PaymentStatus.PAID);
            booking.setBookingStatus(BookingStatus.CONFIRMED);
            booking.setPaymentMethod(request.getPaymentMethod()); // e.g., "stripe"
            booking.setPaymentTime(LocalDateTime.now());

            bookingRepository.save(booking);

            return ResponseEntity.ok("Payment confirmed and booking completed.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to confirm payment.");
        }
    }

    public ResponseEntity<?> createBooking(BookingRequest bookingRequest, Long userId , Long eventId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Event event = eventRepository.findById(eventId)
                    .orElseThrow(() -> new IllegalArgumentException("Event not found"));

            int requestedQuantity = bookingRequest.getQuantity();
            if (requestedQuantity <= 0) {
                return ResponseEntity
                        .badRequest()
                        .body("Quantity must be greater than 0");
            }

            if (requestedQuantity > event.getAvailable_tickets()) {
                return ResponseEntity
                        .badRequest()
                        .body("Not enough tickets available");
            }

            // Calculate total amount
            double totalAmount = requestedQuantity * event.getPrice();

            // Create booking with PENDING status
            Booking booking = Booking.builder()
                    .user(user)
                    .event(event)
                    .quantity(requestedQuantity)
                    .totalAmount(totalAmount)
                    .bookingStatus(BookingStatus.PENDING)
                    .paymentStatus(PaymentStatus.PENDING)
                    .setPaymentTime(LocalDateTime.now())
                    .build();

            // Reduce available tickets
            event.setAvailable_tickets(event.getAvailable_tickets() - requestedQuantity);

            // Save to DB
            eventRepository.save(event);
            booking = bookingRepository.save(booking); // capture saved booking with ID

            // Return booking data for frontend to initiate payment
            Map<String, Object> response = new HashMap<>();
            response.put("bookingId", booking.getId());
            response.put("totalAmount", totalAmount);
            response.put("eventTitle", event.getTitle());
            response.put("quantity", requestedQuantity);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong while processing your booking.");
        }
    }


    public ResponseEntity<?> createStripeSession(StripeSessionRequest request) {
        try {
            Stripe.apiKey = "sk_test_YourStripeSecretKey"; // secret key

            Map<String, Object> params = new HashMap<>();
            params.put("payment_method_types", List.of("card"));
            params.put("mode", "payment");
            params.put("success_url", "http://localhost:5173/payment-success?bookingId=" + request.getBookingId());
            params.put("cancel_url", "http://localhost:5172/events");

            List<Object> lineItems = new ArrayList<>();
            Map<String, Object> item = new HashMap<>();
            item.put("price_data", Map.of(
                    "currency", "usd",
                    "unit_amount", (int)(request.getAmount() * 100), // cents
                    "product_data", Map.of("name", request.getEventName())
            ));
            item.put("quantity", 1);
            lineItems.add(item);

            params.put("line_items", lineItems);

            Session session = Session.create(params);

            return ResponseEntity.ok(Map.of("sessionId", session.getId()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create Stripe session.");
        }
    }


    public ResponseEntity<?> confirmPayment(Long bookingId,PaymentConfirmationRequest request) {
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

            booking.setPaymentStatus(PaymentStatus.PAID);
            booking.setBookingStatus(BookingStatus.CONFIRMED);
            booking.setPaymentMethod(request.getPaymentMethod()); // e.g., "stripe"
            booking.setPaymentTime(LocalDateTime.now());

            bookingRepository.save(booking);
            return ResponseEntity.ok("Payment confirmed and booking updated.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to confirm booking payment.");
        }
    }





}
