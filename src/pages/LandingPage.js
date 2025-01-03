import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar componentes de LandingPage
import Header from '../components/Header/Header';
import InfoSection from '../components/InfoSection/InfoSection';
import ProductoDestacado from '../components/ProductoDestacado/ProductoDestacado';
import Categorias from '../components/Categorias/Categorias';
import DisenoComponent from '../components/Diseno/Diseno';
import Referencias from '../components/Referencias/Referencias';
import PreguntasFrecuentes from '../components/PreguntasFrecuentes/PreguntasFrecuentes';
import Footer from '../components/Footer/Footer';
import FloatingButtons from '../components/FloatingButtons/FloatingButtons';
import TopMenu from '../components/Header/TopMenu';

// Importar páginas
import TiendaPage from '../components/TiendaPage/TiendaPage';
import CarritoPage from '../components/CarritoPage/CarritoPage';
import ConfirmaCompraPage from '../components/ConfirmaCompraPage/ConfirmaCompraPage';
import ContactoPage from '../components/ContactoPage/ContactoPage';
import DisenoPage from '../components/DisenoPage/DisenoPage';
import ProductoPage from '../components/ProductoPage/ProductoPage';
import TerminosCondicionesPage from '../components/TerminosCondicionesPage/TerminosCondicionesPage';

import './paleta4.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Componente fijo */}
        <TopMenu />

        {/* Definir rutas */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <InfoSection />
                <ProductoDestacado />
                <Categorias />
                <DisenoComponent />
                <Referencias />
                <PreguntasFrecuentes />
                <FloatingButtons />
              </>
            }
          />
          <Route path="/tienda" element={<TiendaPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/confirmar-compra" element={<ConfirmaCompraPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/diseno" element={<DisenoPage />} />
          <Route path="/producto" element={<ProductoPage />} />
          <Route path="/terminos-condiciones" element={<TerminosCondicionesPage />} />
          {/* Ruta para manejar errores 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Componente fijo */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
