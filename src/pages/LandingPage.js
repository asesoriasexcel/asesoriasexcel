// LandingPage.js
import React from 'react';
import Header from '../components/Header/Header';
import InfoSection from '../components/InfoSection/InfoSection';
import ProductoDestacado from '../components/ProductoDestacado/ProductoDestacado';
import Productos from '../components/Productos/Productos';
import Diseno from '../components/Diseno/Diseno';
import Referencias from '../components/Referencias/Referencias';
import PreguntasFrecuentes from '../components/PreguntasFrecuentes/PreguntasFrecuentes';
import Footer from '../components/Footer/Footer';

import './paleta.css';

const LandingPage = () => {
  return (
    <div className='landing-container'>
      <Header />
      <InfoSection />
      <ProductoDestacado />
      <Productos />
      <Diseno />
      <Referencias />
      <PreguntasFrecuentes />
      <Footer />
    </div>
  );
};

export default LandingPage;
