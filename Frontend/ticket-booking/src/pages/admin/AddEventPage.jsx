import React, { useState } from 'react';
import { createEvent } from '../../api/eventApi';
import '../../styles/AddEventPage.css';
import { useNavigate } from 'react-router-dom';
import { triggerNotification } from '../../components/triggerNotification';


const AddEventPage = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    happening_date: '',
    category: '',
    capacity: 0,
    price: 0,
    available_tickets: 0,
    total_tickets: 0,
    image: null, // Changed from imageData to image
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({ ...eventData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(eventData);
      triggerNotification("Event added successfully ");
      navigate('/events');
    } catch (err) {
      console.error(err);
      setError('Failed to create event');
    }
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  return (
    <div className="add-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="add-event-form">
        <label>Title:</label>
        <input type="text" name="title" value={eventData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={eventData.description} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={eventData.location} onChange={handleChange} required />

        <label>Date:</label>
        <input type="datetime-local" name="happening_date" value={formatDateForInput(eventData.happening_date)} onChange={handleChange} />

        <label>Category:</label>
        <input type="text" name="category" value={eventData.category} onChange={handleChange} required />

        <label>Capacity:</label>
        <input type="number" name="capacity" value={eventData.capacity} onChange={handleChange} required />

        <label>Total Tickets:</label>
        <input type="number" name="total_tickets" value={eventData.total_tickets} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />

        <label>Available Tickets:</label>
        <input type="number" name="available_tickets" value={eventData.available_tickets} onChange={handleChange} required />

        <label>Price (LKR):</label>
        <input type="number" name="price" value={eventData.price} onChange={handleChange} required />

        {error && <p className="error">{error}</p>}

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEventPage;
