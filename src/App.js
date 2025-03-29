// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';

function App() {
  return (
    // REMOVE EXTRA ROUTER HERE
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/userlist" element={<UserList />} />
    </Routes>
  );
}

export default App;
