import {getAllEvents} from "../api/eventApi";
import { useEffect, useState } from "react";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await getAllEvents();
            setEvents(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err)
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchEvents();
    }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
            <div>
            <h1>Events</h1>
            <ul>
                {events.map((event) => (
                <li key={event.id}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                    <p>{event.category}</p>
                    <p>{event.price}</p>
                    <p>{event.status}</p>
                    <p>{event.available_tickets}</p>
                    <p>{event.total_tickets}</p>
                    <p>{event.created_at}</p>
                </li>
                ))}
            </ul>
            </div>
        )}
    </div>
  )
}

export default EventPage
