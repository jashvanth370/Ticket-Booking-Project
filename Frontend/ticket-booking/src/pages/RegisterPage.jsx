import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterPage.css';
import { register } from '../api/authApi';
import { Navigate } from 'react-router-dom';
import { triggerNotification } from '../components/triggerNotification';


const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' ,role:''});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      setMessage(res.data);
      triggerNotification("User register successfully!", "success");
      Navigate('/login');
    } catch (err) {
      setMessage(err.response?.data);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
