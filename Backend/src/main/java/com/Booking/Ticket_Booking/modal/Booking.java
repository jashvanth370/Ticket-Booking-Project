package com.Booking.Ticket_Booking.modal;

import com.Booking.Ticket_Booking.modal.enums.BookingStatus;
import com.Booking.Ticket_Booking.modal.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Table(name = "booking")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private double totalAmount;

    private PaymentStatus paymentStatus;
    private BookingStatus bookingStatus;
    private LocalDateTime bookingTime;

    @ManyToOne
    private User user;

    @ManyToOne
    private Event event;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payment;
}
