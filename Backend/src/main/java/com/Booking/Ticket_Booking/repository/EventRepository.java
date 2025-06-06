package com.Booking.Ticket_Booking.repository;

import com.Booking.Ticket_Booking.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    public Optional<Event> findByTitle(String title);

    public List<Event> findByCategoryIgnoreCase(String category);

    public List<Event> findByLocation(String location);

    public List<Event> findByCreatedById(Long userId);

    @Query("SELECT DISTINCT e.category FROM Event e")
    List<String> findDistinctCategories();
}
