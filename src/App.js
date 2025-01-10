import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Páginas
import LandingPage from './pages/LandingPage';
import TiendaPage from './pages/TiendaPage';
import CarritoPage from './pages/CarritoPage';
import ContactoPage from './pages/ContactoPage';
import DisenoPage from './pages/DisenoPage';
import TerminosCondicionesPage from './pages/TerminosCondicionesPage';

// Layouts
import MainLayout from './layouts/MainLayout';
import TiendaLayout from './layouts/TiendaLayout';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Rutas */}
        <Routes>
          {/* Rutas con elementos comunes para el exterior del sitio */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/terminoscondiciones" element={<TerminosCondicionesPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/diseno" element={<DisenoPage />} />
            <Route path="/terminoscondiciones" element={<TerminosCondicionesPage />} />
          </Route>

          {/* Rutas con elementos comunes para el interior del sitio */}
          <Route element={<TiendaLayout />}>
            <Route path="/tienda" element={<TiendaPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
          </Route>

          {/* Redirección 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
