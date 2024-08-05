import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

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
    <div>
      <h2>Enter Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default PasswordProtect;
