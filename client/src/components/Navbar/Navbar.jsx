import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const userImage = '/home.jpeg'; // Replace with actual image path or URL

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Welcome</h2>
      </div>
      <div className="navbar-links">
        {/* User Profile Picture */}
        <div className="nav-profile">
          <img src={userImage} alt="User Profile" className="nav-profile-img" />
          <Link to="/profile" className="nav-link">User Profile</Link>
        </div>
        <Link to="/" className="nav-link">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
