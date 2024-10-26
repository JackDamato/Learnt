// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, googleProvider } from './firebaseConfig';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import './styles/App.css';
import Dashboard from './components/Dashboard.js';
import Navbar from './components/Navbar.js';
import Form from './components/Form'; // Import the Form component
import SubmissionReviews from './components/SubmissionReviews'; // Import the SubmissionReviews component


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
      <Navbar user={user} handleSignIn={handleSignIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} />
            ) : (
              <div className="home-page">
                <h1>Welcome to Learn't</h1>
                <p>Your learning journey begins here. Use the menu to sign in!</p>
              </div>
            )
          }
        />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/submission-review" element={<SubmissionReviews />}/>
        <Route path="/form" element={<Form />} /> {/* Ensure this route is defined */}
        <Route path="/submission-review" element={<SubmissionReviews />} /> {/* Route for SubmissionReviews */}

      </Routes>
    </Router>
  );
}

export default App;
