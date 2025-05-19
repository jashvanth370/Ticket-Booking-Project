package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.EventRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Response<?> createEvent(EventRequest request){
        try{
            Event event = Event.builder()
                    .title(request.getTitle())
                    .description(request.getDescription())
                    .location(request.getLocation())
                    .created_at(LocalDateTime.now())
                    .price(request.getPrice())
                    .available_tickets(request.getAvailableTickets())
                    .total_tickets(request.getTotalTickets())
                    .category(request.getCategory())
                    .status(request.getStatus())
                    .build();
            eventRepository.save(event);
            return new Response<>(200,"Event create successfully",event);
        }
        catch (Exception e){
            e.printStackTrace();
            return new Response<>(500,"Internal server error",null);
        }
    }
}
