import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/eventApi';
import '../styles/EventDetailsPage.css';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        setEvent(response.data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Failed to load event details.');
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <div className="event-details-container">
      <h2>📅 Event Details</h2>
      {error && <p className="error">{error}</p>}
      {!event ? (
        <p>Loading...</p>
      ) : (
        <>
          {event.imageFilename && (
            <div className="event-image-container">
              <img
                src={`http://localhost:8081/uploads/${event.imageFilename}`}
                alt={event.title}
                className="event-image"
              />
            </div>
          )}
          <table className="event-details-table">
            <tbody>
              <tr><th>ID</th><td>{event.id}</td></tr>
              <tr><th>Title</th><td>{event.title}</td></tr>
              <tr><th>Description</th><td>{event.description}</td></tr>
              <tr><th>Location</th><td>{event.location}</td></tr>
              <tr><th>Category</th><td>{event.category}</td></tr>
              <tr><th>Status</th><td>{event.status}</td></tr>
              <tr><th>Price</th><td>{event.price}</td></tr>
              <tr><th>Total Tickets</th><td>{event.total_tickets}</td></tr>
              <tr><th>Available Tickets</th><td>{event.available_tickets}</td></tr>
              <tr><th>Happening At</th><td>{event.happening_date}</td></tr>
            </tbody>
          </table>
        </>
      )}

    </div>
  );
};

export default EventDetailsPage;
