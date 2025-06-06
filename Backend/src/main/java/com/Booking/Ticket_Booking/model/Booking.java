package com.Booking.Ticket_Booking.model;

import com.Booking.Ticket_Booking.model.enums.BookingStatus;
import com.Booking.Ticket_Booking.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Table(name = "booking")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private double totalAmount;

    private PaymentStatus paymentStatus;
    private BookingStatus bookingStatus;
    private LocalDateTime setPaymentTime;
    private String paymentIntentId;
    private String paymentMethod;


    @ManyToOne
    private User user;

    @ManyToOne
    private Event event;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payment;


    public void setPaymentTime(LocalDateTime now) {
    }
}
