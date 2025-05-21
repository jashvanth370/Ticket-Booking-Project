import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt ,FaChartBar, FaThLarge, FaClipboardList, FaDashcube, FaBookmark, FaStar, FaCartArrowDown, FaBorderStyle, FaUser, FaChartLine } from 'react-icons/fa';
import { FaBoltLightning, FaBorderAll, FaPerson} from 'react-icons/fa6';

import '../styles/Navbar.css';
import useAuthStore from '../store/AuthStore';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setMobileMenuOpen(false);
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    
    const user = localStorage.getItem('role')


    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo">🎟️ Ticket Booking</div>

            <div className="hamburger" onClick={toggleMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                {user === 'ADMIN' && (
                    <>

                        <li><NavLink to="/admin" onClick={closeMenu} className="text-blue-600 underline">
                            <FaUser size={24}/> 
                        </NavLink></li>

                        <li><NavLink onClick={() => { closeMenu(); handleLogout(); }} className="logout-button">
                            <FaSignOutAlt size={24}/>
                        </NavLink ></li>

                    </>
                )}

                {user === 'USER' && (
                    <>

                        <li><NavLink to="/userDashboard" onClick={closeMenu} className="text-blue-600 underline">
                            <FaUser size={28}/> 
                        </NavLink></li>

                        <li>
                            <NavLink to="/wishlist" onClick={closeMenu} className="" >
                            <FaCartArrowDown size={30}/>
                        </NavLink>
                        </li>

                        <li><NavLink onClick={() => { closeMenu(); handleLogout(); }} className="logout-button">
                            <FaSignOutAlt size={30}/>
                        </NavLink></li>

                    </>
                )}
                
            </ul>
        </nav>
    );
};

export default Navbar;
