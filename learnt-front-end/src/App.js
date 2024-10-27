import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, googleProvider } from './firebaseConfig';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import './styles/App.css';
import Dashboard from './components/Dashboard.js';
import Navbar from './components/Navbar.js';
import Form from './components/Form'; 
import SubmissionReviews from './components/SubmissionReviews'; 

function App() {
  const [user, setUser] = useState(null);
  const [titleVisible, setTitleVisible] = useState(false); // State to manage title visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleVisible(true); // Set titleVisible to true after 100ms to trigger the animation
    }, 100); // Delay to ensure animation triggers after component mounts

    return () => clearTimeout(timer); // Cleanup the timer on unmount
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
      <Navbar user={user} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <div className="home-page">
                <h1 className={`welcome-title ${titleVisible ? 'fade-in' : ''}`}>
                  Welcome to Learn't
                </h1>
                <button className="sign-in-button" onClick={handleSignIn}>
                  Sign in with Google
                </button>
              </div>
            )
          }
        />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/submission-review" element={<SubmissionReviews />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
