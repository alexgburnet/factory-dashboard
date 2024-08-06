import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './PasswordProtect.css';

const PasswordProtect = ({ children, onPasswordCorrect }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const correctPassword = 'your-password'; // temporary!

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      onPasswordCorrect(); // Call the callback to set authentication
      navigate('/controlpanel'); // Redirect to the intended protected route
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="password-protect-container">
      <h2>Enter Password</h2>
      <form className="password-protect-form" onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default PasswordProtect;
