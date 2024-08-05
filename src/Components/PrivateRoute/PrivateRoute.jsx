import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import PasswordProtect from '../PasswordProtect/PasswordProtect';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, login } = useAuth();
  const [passwordVerified, setPasswordVerified] = useState(false);

  const handlePasswordCorrect = () => {
    login();
    setPasswordVerified(true);
  };

  return passwordVerified || isAuthenticated ? (
    element
  ) : (
    <PasswordProtect onPasswordCorrect={handlePasswordCorrect} />
  );
};

export default PrivateRoute;
