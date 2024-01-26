import React, { Component } from "react";
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  render() {
    return (
      <div className="app">
        <div className="card">
          <h1>Simple todo</h1>
          <p>This is a beginers project TODO built with MERN</p>
          <div className="buttons">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
