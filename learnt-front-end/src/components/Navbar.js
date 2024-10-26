// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ user, handleSignIn, handleSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
        <img 
            src="/logo2.png" 
            alt="Home" 
            className="navbar-logo-image"
          />
      </Link>
      <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
      {isMenuOpen && (
        <div className={`menu ${isMenuOpen ? 'show' : ''}`}>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <Link to="/submission-review" onClick={() => setIsMenuOpen(false)}>My Study Guide</Link>
              <button className="menu-button-item" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <button className="menu-button-item" onClick={handleSignIn}>Sign in with Google</button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
