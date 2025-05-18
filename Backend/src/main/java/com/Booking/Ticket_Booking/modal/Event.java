package com.Booking.Ticket_Booking.modal;

import com.Booking.Ticket_Booking.modal.enums.EventStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String location;
    private double price;
    private Long available_tickets;
    private Long total_tickets;
    private String image_url;
    private String category;
    @Enumerated(EnumType.STRING)
    private EventStatus status;
    private LocalDateTime created_at;

    @ManyToOne
    private User createdBy;

    @OneToMany(mappedBy = "event")
    private List<Booking> bookings;

    @OneToMany(mappedBy = "event")
    private List<Review> reviews;
}
