// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteWithLoader from './router/RouteWithLoader';
import LoginPage from './Admin pages/LoginPage';
import Dashboard from './Admin pages/Admin Dashboard';




const App = () => {
  return (
    
    <Routes>

      <Route path="/" element={<RouteWithLoader element={LoginPage} />} />
      <Route path="/dashboard" element={<RouteWithLoader element={Dashboard} />} />

    </Routes>
  );
};

export default App;
