import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Styling for the navbar

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/">IntersectionAll</Link>
        </div>

        {/* Links Section */}
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tutorial">Tutorial Page</Link></li>
          {user && user.role === 'AdminUser' && (
            <li><Link to="/admin-dashboard">Verifications</Link></li>
          )}
          {user && user.role === 'GeneralUser' && (
            <li><Link to="/submission-history">Submissions History</Link></li>
          )}
          {user ? (
            <li><Link to="/logout">Logout</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>

        {/* Button Section */}
        {user && (
          <button className="contribute-button">
            <Link to="/contribute">Contribute a Marker!</Link> {/* links to nothing, yet*/}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
