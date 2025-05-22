import { getAllEvents } from "../api/eventApi";
import { useEffect, useState } from "react";
import "../styles/EventPage.css";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { createWishlistItem } from "../api/wishlistApi";
import ReviewPage from './ReviewPage';




const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [message, setMessage] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null);



  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        console.log("getAllEvents:", response);
        const data = response.data;

        let eventsArray = [];

        if (Array.isArray(data)) {
          eventsArray = data;
        } else if (data && Array.isArray(data.events)) {
          eventsArray = data.events;
        } else {
          for (const key in data) {
            if (Array.isArray(data[key])) {
              eventsArray = data[key];
              console.log(`Found array in key: ${key}`);
              break;
            }
          }
        }

        if (Array.isArray(eventsArray)) {
          setEvents(eventsArray);
          setFilteredEvents(eventsArray);
          console.log(eventsArray)
          localStorage.setItem("events", JSON.stringify(
            eventsArray.map(event => ({
              id: event.id,
              title: event.title
            }))
          ));
        } else {
          console.error("Expected an array, got:", data);
          setError(new Error("Invalid data format from server."));
        }

      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  const handleLogout = () => {
    logout();
    localStorage.removeItem('events', events);
    navigate('/login');
  };


  const handleAddToWishlist = async (eventId) => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const token = localStorage.getItem('token');

    const reviewData = {
      userId,
      eventId,
    };
    try {
      const res = await createWishlistItem(reviewData, token);
      setMessage('Added to wishlist!');
      alert("added wishlist", `${eventId}`)
    } catch (err) {
      console.error('Error adding to wishlist', err);
      setMessage('Already in wishlist or failed to add.');
    }
  };

  const handleAddToReviewSet = async (eventId) => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const token = localStorage.getItem('token');
    
    setSelectedEventId(eventId);
    navigate('/review');
  };

  useEffect(() => {
    let filtered = [...events];

    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    if (selectedLocation) {
      filtered = filtered.filter(event => event.location === selectedLocation);
    }
    if (selectedDate) {
      filtered = filtered.filter(event => event.date === selectedDate);
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, selectedLocation, selectedDate, events]);


  const uniqueCategories = Array.isArray(events)
    ? [...new Set(events.map(e => e.category))]
    : [];

  const uniqueLocations = Array.isArray(events)
    ? [...new Set(events.map(e => e.location))]
    : [];




  return (
    <div className="event-page">
      <h1>🎉 Upcoming Events</h1>

      <div className="filters">
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All Categories</option>
          {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select onChange={(e) => setSelectedLocation(e.target.value)} value={selectedLocation}>
          <option value="">All Locations</option>
          {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button onClick={() => {
          setSelectedCategory("");
          setSelectedLocation("");
          setSelectedDate("");
        }}>Reset Filters</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}

      {!loading && !error && (
        <div className="event-list">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="event-card" >
                <h2>{event.title}</h2>
                <p><strong>Date:</strong> {event.created_at}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Category:</strong> {event.category}</p>
                <p><strong>Price:</strong> ${event.price}</p>
                <p><strong>Status:</strong> {event.status}</p>
                <p><strong>Available Tickets:</strong> {event.available_tickets}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <button className="book-button" onClick={() => navigate('/bookings')}>Book Now</button><br></br>
                <button onClick={() => handleAddToWishlist(event.id)}>Add to Wishlist</button>
                <button onClick={() => handleAddToReviewSet(event.id)}> Review of Event </button>
                
              </div>
            ))
          ) : (
            <p>No events match your filters.</p>
          )}

        </div>

      )}
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EventPage;
