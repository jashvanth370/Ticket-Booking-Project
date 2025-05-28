import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/LoginPage.css';
import useAuthStore from '../store/AuthStore';
import { triggerNotification } from '../components/triggerNotification';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login} = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });

      const { token, userId, role } = response.data;
      login({ userId, token, role });
      triggerNotification("Login successfully!", "success");

      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  

  return (
    <div className="login-container">
      <h2 className='home-title'>Login</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <div className=''>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Login</button>
        
      </form>
    </div>
  );
};

export default LoginPage;
