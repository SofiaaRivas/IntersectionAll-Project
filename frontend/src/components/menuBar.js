import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import { useNavigate } from 'react-router-dom';
import '../menu.css';

const Menu = ({onHomeClick}) => {
  const [activeView, setActiveView] = useState(''); // Tracks the current view
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false); // Tracks if the password prompt is visible
  const [password, setPassword] = useState(''); // Stores the entered password
  const navigate = useNavigate(); 

  const handleMenuClick = (view) => {
    if (view === 'admin') {
      setShowPasswordPrompt(true); // Show the password prompt for Admin Side
      setActiveView((prevView) => (prevView === view ? '' : view));
    } else if (view === 'home') {
        setActiveView('');
        onHomeClick(); // Notify parent to reset map key
        navigate('/'); 
    } else {
      setShowPasswordPrompt(false); 
      setActiveView((prevView) => (prevView === view ? '' : view));
    }
  };

  const handlePasswordSubmit = () => {
    const correctPassword = 'cwruAccessibility'; 
    if (password === correctPassword) {
      navigate('/admin'); // Navigate to the admin UI page
      setShowPasswordPrompt(false);
    } else {
      alert('Incorrect password. Please try again.');
    }
    setPassword(''); 
  };

  return (
    <div>
      <nav className="menu-overlay">
        <ul>
          <li onClick={() => handleMenuClick('home')}>Home</li>
          <li onClick={() => handleMenuClick('feedback')}>Feedback Form</li>
          <li onClick={() => handleMenuClick('admin')}>Admin Side</li>
        </ul>
      </nav>

      <div className="menu-content">
        {activeView === 'feedback' && <FeedbackForm />}
      </div>

      {showPasswordPrompt && (
        <div className="password-prompt">
          <h3>Enter Admin Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button onClick={handlePasswordSubmit}>Submit</button>
          <button onClick={() => setShowPasswordPrompt(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Menu;

