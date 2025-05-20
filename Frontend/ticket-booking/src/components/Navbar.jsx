import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaBoxOpen, FaProductHunt, FaWeightHanging, FaThinkPeaks } from 'react-icons/fa';
import { FaBoltLightning, FaPerson, FaPersonBooth, FaPersonHiking } from 'react-icons/fa6';
// import '../styles/Navbar.css';
// import useAuthStore from '../store/AuthStore';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const closeMenu = () => {
        setMobileMenuOpen(false);
    };
    return (
        <nav>
            <div> Ticket Booking </div>
            <div className="hamburger" onClick={toggleMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <li>
                    <Link to="/" onClick={closeMenu}><HomePage /></Link>
                </li>
                <li>
                    <Link to="/login" onClick={closeMenu}><LoginPage /></Link>
                </li>
                <li>
                    <Link to="/register" onClick={closeMenu}>Register</Link>
                </li>
                <li>
                    <Link to="/bookings" onClick={closeMenu}>Bookings</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar
