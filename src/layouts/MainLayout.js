import React from 'react';
import { Outlet } from 'react-router-dom';
import TopMenu from '../components/Header/TopMenu';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <TopMenu />
      <>
        <Outlet /> {/* Aquí se renderizarán LandingPage, TerminosCondicionesPage, etc. */}
      </>
      <Footer />
    </>
  );
};

export default MainLayout;

