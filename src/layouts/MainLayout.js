import React from 'react';
import { Outlet } from 'react-router-dom';
import TopMenu from '../components/Header/TopMenu';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <TopMenu />
      <main>
        <Outlet /> {/* Aquí se renderizarán LandingPage, TerminosCondicionesPage, etc. */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

