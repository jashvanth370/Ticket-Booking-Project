package com.Booking.Ticket_Booking.model;

import com.Booking.Ticket_Booking.model.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String paymentIntentId;
    private String method;
    private double amount;
    private String currency;

    private PaymentStatus status;
    private LocalDateTime paymentTime;

    @OneToOne
    private Booking booking;
}
