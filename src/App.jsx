import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
import KBLayout from './pages/KBLayout';
import Home from './pages/Home';
import NomppiKBPage from './components/NomppiKBPage';
import NomppiKBLoginPage from './components/NomppiKBLoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/KB" element={<KBLayout />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<NomppiKBPage />} />
        <Route path="/login" element={<NomppiKBLoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
