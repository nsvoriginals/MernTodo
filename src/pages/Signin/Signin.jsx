import React, { useState } from 'react';

import './SignIn.css';


import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext"; 

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      const data = await response.json();
      setToken(data.token); // Set the token in the context

      navigate('/todo');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
          <h2>Please Sign In</h2>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          <button type="submit">Sign In</button>
          <p>&nbsp;</p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
