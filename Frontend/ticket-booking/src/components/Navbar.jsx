import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt ,FaChartBar, FaThLarge, FaClipboardList, FaDashcube, FaBookmark, FaStar, FaCartArrowDown, FaBorderStyle, FaUser, FaChartLine, FaUserAltSlash, FaSign, FaSignInAlt, FaCartPlus } from 'react-icons/fa';
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
        navigate('/home');
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={()=>navigate("/")}>🎟️ Click2Event</div>

            <div className="hamburger" onClick={toggleMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>

                {!user && <li><NavLink  to="/login" onClick={closeMenu}> <FaSignInAlt size={32}/></NavLink></li>}

                {user === 'ADMIN' && (
                    <>

                        <li><NavLink to="/admin-dashboard" onClick={closeMenu} className="text-blue-600 underline">
                            <FaUser size={32}/> 
                        </NavLink></li>

                        <li><NavLink to="/home" onClick={() => { closeMenu(); handleLogout(); }} className="logout-button">
                            <FaSignOutAlt size={34}/>
                        </NavLink ></li>

                    </>
                )}

                {user === 'USER' && (
                    <>

                        <li><NavLink to="/user-dashboard" onClick={closeMenu} className="text-blue-600 underline">
                            <FaUser size={30}/> 
                        </NavLink></li>

                        <li>
                            <NavLink to="/wishlist" onClick={closeMenu} className="" >
                            <FaCartPlus size={30}/>
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
