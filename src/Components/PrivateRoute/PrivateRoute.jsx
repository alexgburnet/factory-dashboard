import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import PasswordProtect from '../PasswordProtect/PasswordProtect';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, login } = useAuth();
  const [passwordVerified, setPasswordVerified] = useState(false);
  const location = useLocation();

  const handlePasswordCorrect = () => {
    login();
    setPasswordVerified(true);
  };

  return passwordVerified || isAuthenticated ? (
    element
  ) : (
    <PasswordProtect onPasswordCorrect={handlePasswordCorrect} location={location} />
  );
};

export default PrivateRoute;
