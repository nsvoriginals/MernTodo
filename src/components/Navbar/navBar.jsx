import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Your Logo</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link" activeClassName="active">Home</Link>
        <Link to="/login" className="nav-link" activeClassName="active">Login</Link>
        <Link to="/register" className="nav-link" activeClassName="active">Register</Link>
        <Link to="/todolist" className="nav-link" activeClassName="active">Todo List</Link>
      </div>
    </nav>
  );
};

export default Navbar;
