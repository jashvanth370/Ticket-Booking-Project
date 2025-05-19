package com.Booking.Ticket_Booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response<T> {
    private int statusCode;
    private String message;
    private T data;
}
