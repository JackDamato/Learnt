// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the new CSS file

function Navbar({ user, handleSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1>Learn't</h1>
      <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
      {isMenuOpen && (
        <div className={`menu ${isMenuOpen ? 'show' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {user && (
            <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <button onClick={handleSignOut}>Sign Out</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
