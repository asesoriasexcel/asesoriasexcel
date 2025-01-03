import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importamos Router y Routes (en lugar de Switch)

// Importar componentes de LandingPage
import Header from '../components/Header/Header';
import InfoSection from '../components/InfoSection/InfoSection';
import ProductoDestacado from '../components/ProductoDestacado/ProductoDestacado';
import Categorias from '../components/Categorias/Categorias';
import DisenoComponent from '../components/Diseno/Diseno'; // Nota: renombramos porque ya hay un Diseno como página
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

        {/* Usamos Routes para definir las rutas */}
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route
            path="/"
            element={
              <div>
                <Header />
                <InfoSection />
                <ProductoDestacado />
                <Categorias />
                <DisenoComponent />
                <Referencias />
                <PreguntasFrecuentes />
                <FloatingButtons />
              </div>
            }
          />

          {/* Ruta para la página de tienda */}
          <Route path="/tienda" element={<TiendaPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/confirmar-compra" element={<ConfirmaCompraPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/diseno" element={<DisenoPage />} />
          <Route path="/producto" element={<ProductoPage />} />
          <Route path="/terminos-condiciones" element={<TerminosCondicionesPage />} />
        </Routes>

        {/* Componentes fijos en todas las páginas */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
