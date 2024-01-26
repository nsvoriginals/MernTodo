
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from './pages/Signin/signIn';
import SignUp from './pages/Signup/signUp.jsx';
import LandingPage from './pages/LandingPage/landingPage.jsx';
import Todo from './pages/Todos/todo.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
};

export default App;
