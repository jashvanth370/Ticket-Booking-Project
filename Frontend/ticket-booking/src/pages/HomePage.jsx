import '../styles/HomePage.css'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/images/hom10.jpg",
  "/images/concert1.jpg",
  "/images/food.jpg",
  "/images/drama1.jpg",
  "/images/home1.jpg",
  "/images/home3.jpg",
  "/images/drama.jpg"
];

const HomePage = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [events, setEvents] = useState([]);

  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/events/categories");
        const data = await response.json();
        setCategories(data);
      }
      catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 6000); // time for fade-out before switch
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <div
          className={`hero-image ${fade ? "fade-in" : "fade-out"}`}
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Welcome to Eventify</h1>
              <p>Your one-stop platform for booking the best events in town</p>
              <div className="button-group">
                <button className="cta-button" onClick={() => navigate("/events")}>
                  Explore Events
                </button>
                <select onChange={(e) => { onCategoryChange(e.target.value); }} className="category-dropdown">
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="slide-indicators">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2>Why Book With Us?</h2>
        <div className="features">
          <div className="feature-box">
            <h3>🎫 Easy Booking</h3>
            <p>Secure your seat in seconds with our smooth booking process.</p>
          </div>
          <div className="feature-box">
            <h3>✅ Trusted Events</h3>
            <p>All events are verified for safety and quality entertainment.</p>
          </div>
          <div className="feature-box">
            <h3>📞 24/7 Support</h3>
            <p>We’re here around the clock to assist with your bookings.</p>
          </div>
        </div>
      </section>

      <section className="events-preview">
        <h2>Popular Events</h2>
        <div className="event-cards">
          <div className="event-card">
            <img src="/images/concert1.jpg" alt="Concert" />
            <div className="event-info">
              <h4>Live Music Concert</h4>
              <p>Feel the vibe of electrifying live music! music_concert</p>
            </div>
          </div>
          <div className="event-card">
            <img src="/images/food.jpg" alt="Festival" />
            <div className="event-info">
              <h4>Food & Culture Festival</h4>
              <p>Explore global tastes and cultural shows.</p>
            </div>
          </div>
          <div className="event-card">
            <img src="/images/drama1.jpg" alt="Theatre" />
            <div className="event-info">
              <h4>Drama Night</h4>
              <p>Experience the magic of live theatre performances.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
