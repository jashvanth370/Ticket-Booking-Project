import React, { useState } from 'react';
import '../styles/ContactPage.css';

const FORMSPREE_URL = 'https://formspree.io/f/yourformid'; // <-- Replace with your actual Formspree form ID URL

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' }); // reset form
      } else {
        const data = await response.json();
        if (data.errors) {
          setError(data.errors.map(err => err.message).join(', '));
        } else {
          setError('Failed to send message. Please try again.');
        }
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any questions you might have.</p>
      </section>

      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={submitted}>Send Message</button>

          {submitted && <p className="success-msg">Thank you! We'll get back to you soon.</p>}
          {error && <p className="error-msg">{error}</p>}
        </form>

        <div className="contact-info">
          <h2>Contact Info</h2>
          <p><strong>Email:</strong> support@eventhub.lk</p>
          <p><strong>Phone:</strong> +94 77 123 4567</p>
          <p><strong>Address:</strong> 123 Event Street, Colombo, Sri Lanka</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
