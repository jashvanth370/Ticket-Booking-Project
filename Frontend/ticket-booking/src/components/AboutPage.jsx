import React from 'react';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Our Platform</h1>
        <p>Bringing unforgettable experiences to life through seamless event ticket booking.</p>
      </section>

      <section className="about-description">
        <h2>Our Mission</h2>
        <p>
          We aim to revolutionize the event experience by providing a user-friendly, reliable, and secure platform
          for booking tickets to events of all kinds – concerts, conferences, sports, and more.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Easy browsing and booking of events</li>
          <li>Secure payment integration using Stripe</li>
          <li>Real-time ticket availability tracking</li>
          <li>Wishlist and booking history management</li>
          <li>Admin dashboard for event management</li>
        </ul>
      </section>

      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="member">
            <img src="/images/Alex.jpg" alt="Team Member" />
            <h3>Jane Silva</h3>
            <p>Founder & Product Manager</p>
          </div>
          <div className="member">
            <img src="/images/nimal.webp" alt="Team Member" />
            <h3>Kavindu Perera</h3>
            <p>Lead Developer</p>
          </div>
          <div className="member">
            <img src="/images/sara.webp" alt="Team Member" />
            <h3>Rashmi Fernando</h3>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </section>

      <section className="about-timeline">
        <h2>Our Roadmap</h2>
        <ul>
          <li><strong>Q1 2025:</strong> Launch MVP with event listing, booking, and admin panel</li>
          <li><strong>Q2 2025:</strong> Integrate Stripe payments and wishlist features</li>
          <li><strong>Q3 2025:</strong> Add event reviews and user profiles</li>
          <li><strong>Q4 2025:</strong> Launch mobile app and organizer tools</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
