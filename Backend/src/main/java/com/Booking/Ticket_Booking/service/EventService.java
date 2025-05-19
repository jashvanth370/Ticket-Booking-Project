package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
}
