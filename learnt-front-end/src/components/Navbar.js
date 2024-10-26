// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ user, handleSignIn, handleSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
        Learn't
      </Link>
      <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
      {isMenuOpen && (
        <div className={`menu ${isMenuOpen ? 'show' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>My Study Dashboard</Link>
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
