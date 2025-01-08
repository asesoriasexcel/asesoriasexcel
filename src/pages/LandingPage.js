import React from 'react';

// Componentes de la LandingPage
import Header from '../components/Header/Header';
import InfoSection from '../components/InfoSection/InfoSection';
import ProductoDestacado from '../components/ProductoDestacado/ProductoDestacado';
import Categorias from '../components/Categorias/Categorias';
import DisenoComponent from '../components/Diseno/Diseno';
import Referencias from '../components/Referencias/Referencias';
import PreguntasFrecuentes from '../components/PreguntasFrecuentes/PreguntasFrecuentes';
import FloatingButtons from '../components/FloatingButtons/FloatingButtons';

import './LandingPage.css';
import './paleta4.css';

const LandingPage = () => {
  return (
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
  );
};

export default LandingPage;
