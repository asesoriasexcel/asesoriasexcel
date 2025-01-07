import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Páginas
import LandingPage from './pages/LandingPage';
import TiendaPage from './pages/TiendaPage';


import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tienda" element={<TiendaPage />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirección 404 */}
        </Routes>


      </div>
    </Router>
  );
};

export default App;
