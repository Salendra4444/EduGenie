import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Study from './components/Study';
import AboutUs from './components/AboutUs';
import MyNote from './components/MyNote';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/study" element={<Study />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/notes" element={<MyNote />} />
      </Routes>
    </Router>
  );
}

export default App;
