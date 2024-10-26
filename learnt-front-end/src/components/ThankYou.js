import React from 'react';
import '../styles/General.css';

function ThankYou({ userInfo }) {
  return (
    <div className="thank-you">
      <h1>Thanks for signing up, {userInfo.name}!</h1>
      <p>We'll keep in touch through your {userInfo.email} email address.</p>
    </div>
  );
}

export default ThankYou;
