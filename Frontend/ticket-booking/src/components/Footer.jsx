import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-about">
                    <h3>Tickets Booking System</h3>
                    <p>Simplifying event access by connecting users with their favorite events in just a few clicks.
                        Secure and fast ticket bookings for concerts, sports, conferences, and more.
                        Empowering event organizers to manage and promote their events efficiently.
                        Seamless user experience from event discovery to payment and ticket confirmation.
                        Real-time availability tracking to ensure users always get updated event information.</p>
                </div>

                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p>Email: support@globalgateway.com</p>
                    <p>Phone: +94 77 123 4567</p>
                    <p>Location: Colombo, Sri Lanka</p>

                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Click2Event. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
