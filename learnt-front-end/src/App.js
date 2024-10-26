import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, googleProvider } from './firebaseConfig';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import './styles/General.css';
import Dashboard from './components/Dashboard.js';
import Navbar from './components/Navbar.js';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <div className="home-page">
                <h1>Join Learn't</h1>
                <button onClick={handleSignIn}>Sign in with Google</button>
              </div>
            )
          }
        />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
