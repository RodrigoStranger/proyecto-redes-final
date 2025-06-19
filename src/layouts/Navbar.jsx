import React from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../utils/Colors';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar" style={{ '--color-lasalle': Colors.color_lasalle }}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src="/ulasalle.webp" 
            alt="Logo ULaSalle" 
            className="logo-image"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;