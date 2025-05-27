package com.Booking.Ticket_Booking.model;

import com.Booking.Ticket_Booking.model.enums.EventStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
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
    private String category;
    @Enumerated(EnumType.STRING)
    private EventStatus status;
    private LocalDateTime created_at;

    private String imageFilename;

    @Lob
    private byte[] imageData;



    private LocalDateTime happening_date;

    @ManyToOne
    private User createdBy;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private List<Booking> bookings;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private List<Review> reviews;
}
