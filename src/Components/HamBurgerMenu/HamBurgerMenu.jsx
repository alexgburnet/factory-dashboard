import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaCog, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../AuthContext';

import './HamBurgerMenu.css'; // Import your CSS file

const HamBurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  // Adjust the position of the dropdown menu based on viewport
  useEffect(() => {
    const menu = menuRef.current;
    const icon = iconRef.current;

    if (menu && icon) {
      const { right: iconRight } = icon.getBoundingClientRect();
      const { width: menuWidth } = menu.getBoundingClientRect();
      const { innerWidth: viewportWidth } = window;

      if (iconRight + menuWidth > viewportWidth) {
        menu.style.right = '0'; // Align menu to the right of the viewport
        menu.style.left = 'auto'; // Reset left alignment
      } else {
        menu.style.right = 'auto'; // Reset right alignment
        menu.style.left = '0'; // Align menu to the left of the hamburger icon
      }
    }
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toggleMenu(); // Optionally close the menu on logout
  }

  return (
    <div className="hamburger-menu" ref={iconRef}>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <FaBars size={30} />
      </div>
      {isOpen && (
        <div className="dropdown-menu" ref={menuRef}>
          <Link to="/" className="menu-item" onClick={toggleMenu}>
            <FaHome className="icon" size={25} /> Home
          </Link>
          <Link to="/controlpanel" className="menu-item" onClick={toggleMenu}>
            <FaCog className="icon" size={25} /> Control Panel
          </Link>
          {isAuthenticated && (
          <div className="menu-item" onClick={handleLogout}>
            <FaSignOutAlt className="icon" size={25} /> Log out
          </div>)}
        </div>
      )}
    </div>
  );
};

export default HamBurgerMenu;
