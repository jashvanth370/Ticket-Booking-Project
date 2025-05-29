import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaBars, FaTimes, FaSignOutAlt, FaUser, FaSignInAlt, FaCartPlus,
    FaUserPlus, FaRunning, FaCalendarPlus, FaTachometerAlt, FaUserCircle
} from 'react-icons/fa';

import '../styles/Navbar.css';
import useAuthStore from '../store/AuthStore';

// Inline Role Select Modal
const RoleSelectModal = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3>Login As</h3>
                <button onClick={() => onSelect('user')}>User</button>
                <button onClick={() => onSelect('admin')}>Admin</button>
                <button className="close-btn" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoverRegister, setHoverRegister] = useState(false);
    const [hoverLogin, setHoverLogin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setMobileMenuOpen(false);
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const user = localStorage.getItem('role');

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleRoleSelect = (role) => {
        setIsModalOpen(false);
        closeMenu();
        navigate(`/login/${role}`);
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate("/")}>Click2Event</div>

            <div className="hamburger" onClick={toggleMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                {!user && (
                    <>
                        <li>
                            <NavLink
                                to="/register"
                                onClick={closeMenu}
                                onMouseEnter={() => setHoverRegister(true)}
                                onMouseLeave={() => setHoverRegister(false)}
                            >
                                {hoverRegister ? <FaRunning size={36} /> : <FaUserPlus size={32} />}
                                Sign in
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="#"
                                onClick={handleLoginClick}
                                onMouseEnter={() => setHoverLogin(true)}
                                onMouseLeave={() => setHoverLogin(false)}
                            >
                                {hoverLogin ? <FaRunning size={36} /> : <FaSignInAlt size={32} />}
                                Login
                            </NavLink>
                        </li>
                    </>
                )}

                {user === 'ADMIN' && (
                    <>
                        <li><NavLink to="/user-profile" onClick={closeMenu}><FaUser size={32} /></NavLink></li>
                        <li><NavLink to="/addEvent" onClick={closeMenu}><FaCalendarPlus size={32} /></NavLink></li>
                        <li><NavLink to="/" onClick={() => { closeMenu(); handleLogout(); }}><FaSignOutAlt size={34} /></NavLink></li>
                    </>
                )}

                {user === 'USER' && (
                    <>
                        <li><NavLink to="/user-profile" onClick={closeMenu}><FaUserCircle size={30} /></NavLink></li>
                        <li><NavLink to="/wishlist" onClick={closeMenu}><FaCartPlus size={30} /></NavLink></li>
                        <li><NavLink to="/" onClick={() => { handleLogout(); }}><FaSignOutAlt size={30} /></NavLink></li>
                    </>
                )}
            </ul>

            {/* Role Select Modal */}
            <RoleSelectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleRoleSelect}
            />
        </nav>
    );
};

export default Navbar;
