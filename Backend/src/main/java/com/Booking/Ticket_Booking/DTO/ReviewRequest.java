package com.Booking.Ticket_Booking.DTO;

import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewRequest {
    @NotNull(message = "Rating is null")
    private int rating;
    @NotNull(message = "comment is null")
    private String comment;
    private LocalDateTime reviewDate;
    @NotNull(message = "user is null")
    private Long userId;
    @NotNull(message = "event is null")
    private Long eventId;

}
