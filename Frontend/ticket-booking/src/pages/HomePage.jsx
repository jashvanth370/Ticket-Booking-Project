import '../styles/HomePage.css'
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Eventify</h1>
          <p>Your one-stop platform for booking the best events in town</p>
          <button className="cta-button" onClick={() => navigate("/events")}>
            Explore Events
          </button>
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
            <img src="/images/music_concert.jpg" alt="Concert" />
            <div className="event-info">
              <h4>Live Music Concert</h4>
              <p>Feel the vibe of electrifying live music!</p>
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
            <img src="/images/drama.jpg" alt="Theatre" />
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
