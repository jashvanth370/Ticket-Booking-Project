package com.Booking.Ticket_Booking.service;

import com.Booking.Ticket_Booking.DTO.EventRequest;
import com.Booking.Ticket_Booking.DTO.Response;
import com.Booking.Ticket_Booking.model.Event;
import com.Booking.Ticket_Booking.model.enums.EventStatus;
import com.Booking.Ticket_Booking.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Response<?> updateEvent(EventRequest request,Long id){
        try{
            Optional<Event> existingEvent = eventRepository.findById(id);
            if(existingEvent.isEmpty()){
                return new Response<>(400,"Event not found",null);
            }
            Event event = existingEvent.get();

            event.setCategory(request.getCategory());
            event.setDescription(request.getDescription());
            event.setLocation(request.getLocation());
            event.setPrice(request.getPrice());
            event.setAvailable_tickets(request.getAvailableTickets());
            event.setTotal_tickets(request.getTotalTickets());
            event.setStatus(request.getStatus());
            event.setTitle(request.getTitle());

            eventRepository.save(event);
            return new Response<>(200,"Event updated successfully",event);

        }catch (Exception e){
            e.printStackTrace();
            return new Response<>(500,"Internal server error",null);
        }
    }

    public List<Event> filterEvents(String category, String location, EventStatus status, String title) {
        return eventRepository.findAll().stream()
                .filter(event -> category == null || event.getCategory().equalsIgnoreCase(category))
                .filter(event -> location == null || event.getLocation().equalsIgnoreCase(location))
                .filter(event -> status == null || event.getStatus() == status)
                .filter(event -> title == null || event.getTitle().toLowerCase().contains(title.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Response<?> getEventByCategory(String category){
        List<Event> eventList=eventRepository.findByCategoryIgnoreCase(category);
        if(eventList.isEmpty()){
            return new Response<>(400,"events not there",null);
        }
        return new Response<>(200,"Filter by category",eventList);
    }

    public Response<?> getEventsByLocation(String location){
        List<Event> eventList = eventRepository.findByLocation(location);
        if(eventList.isEmpty()){
            return new Response<>(400,"Events not there",null);
        }
        return new Response<>(200,"filter by location",eventList);
    }

    public Response<?> deleteEvent(Long id){
        try{
            Optional<Event> existingEvent = eventRepository.findById(id);
            if(existingEvent.isEmpty()){
                return new Response<>(400,"event is not found",null);
            }
            Event event = existingEvent.get();
            eventRepository.delete(event);
            return new Response<>(200,"Event successfully delete",event);
        }
        catch (Exception e){
            e.printStackTrace();
            return new Response<>(500,"Internal server error",null);
        }
    }
}
