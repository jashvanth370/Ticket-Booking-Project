import React, { useEffect, useState } from 'react';
import { getEventsByUserId } from '../api/eventApi';
import '../styles/MyEventsPage.css';
import { updateEvent } from '../api/eventApi';

const MyEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const response = await getEventsByUserId();
                setEvents(response.data);
            } catch (err) {
                console.error("Failed to fetch your events:", err);
                setError("Unable to load your events.");
            }
        };

        fetchMyEvents();
    }, []);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEvent(selectedEvent.id, formData);
            alert("Event updated successfully!");

            const response = await getEventsByUserId();
            setEvents(response.data);
            setSelectedEvent(null);
        } catch (err) {
            console.error("Failed to update event:", err);
            alert("Error updating event.");
        }
    };

    const handleEditClick = (event) => {
        setSelectedEvent(event);
        setFormData(event); 
    };

    return (
        <div className="my-events-container">
            <h2>🎟️ My Created Events</h2>
            {error && <p className="error">{error}</p>}
            {events.length === 0 ? (
                <p>You haven’t created any events yet.</p>
            ) : (
                <table className="my-events-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Total Tickets</th>
                            <th>Available</th>
                            <th>Created At</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.title}</td>
                                <td>{event.location}</td>
                                <td>{event.category}</td>
                                <td>{event.status}</td>
                                <td>{event.total_tickets}</td>
                                <td>{event.available_tickets}</td>
                                <td>{new Date(event.created_at).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleEditClick(event)}>Edit</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedEvent && (
                <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Edit Event</h3>
                        <form onSubmit={handleUpdateSubmit}>
                            <input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Title"
                            />
                            <input
                                type="text"
                                value={formData.description || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Description"
                            />
                            <input
                                type="text"
                                value={formData.location || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                placeholder="Location"
                            />
                            <input
                                type="number"
                                value={formData.price || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                placeholder="Price"
                            />
                            <input
                                type="number"
                                value={formData.total_tickets || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, total_tickets: e.target.value }))}
                                placeholder="Total Tickets"
                            />
                            <input
                                type="number"
                                value={formData.available_tickets || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, available_tickets: e.target.value }))}
                                placeholder="Available Tickets"
                            />
                            <input
                                type="text"
                                value={formData.category || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                placeholder="Category"
                            />
                            <input
                                type="text"
                                value={formData.status || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                placeholder="Status"
                            />
                            <div className="modal-actions">
                                <button type="submit">Update Event</button>
                                <button type="button" onClick={() => setSelectedEvent(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </div>
    );
};

export default MyEventsPage;
