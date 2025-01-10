import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { AiOutlineAppstore, AiOutlineHome } from "react-icons/ai";
import { PiCompassTool } from "react-icons/pi";

import './TopMenu.css';

const logo = require('../../images/logo/logo4.png');

const TopMenu = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Función para desplazar a la sección del footer
  const scrollToFooter = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
    }
  };

  // Lista de elementos del menú
  const items = [
    {
      label: (
        <Link to="/" className="menu-link">
          <AiOutlineHome className="icon-menuapp" /> Inicio
        </Link>
      )
    },
    {
      label: 'Tienda de productos',
      icon: <AiOutlineAppstore className="icon-menuapp" />,
      items: [
        {
          label: 'Components',
          command: () => alert('Components clicked')
        },
        {
          label: 'Blocks',
          command: () => alert('Blocks clicked')
        },
        {
          label: 'UI Kit',
          command: () => alert('UI Kit clicked')
        },
        {
          label: 'Templates',
          items: [
            {
              label: 'Apollo',
              command: () => alert('Apollo clicked')
            },
            {
              label: 'Ultima',
              command: () => alert('Ultima clicked')
            }
          ]
        }
      ]
    },
    {
      label: (
        <Link to="/diseno" className="menu-link">
          <PiCompassTool className="icon-menuapp" /> Diseño y Personalización
        </Link>
      )
    },
    {
      label: 'Contacto',
      icon: 'pi pi-envelope',
      command: scrollToFooter // Llamar a la función de desplazamiento
    }
  ];

  // Detectar el tamaño de la pantalla
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Consideramos móvil si la pantalla es menor o igual a 768px
  };

  // Usar el hook useEffect para escuchar el evento resize
  useEffect(() => {
    handleResize(); // Establece el estado inicial
    window.addEventListener('resize', handleResize); // Escuchar cambios en el tamaño de la pantalla

    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el evento al desmontar el componente
    };
  }, []);

  return (
    <>
      {/* Menú para móvil */}
      {isMobile && (
        <div className="movil-menu-container">
          <Menubar
            model={items}
            start={
              <div className="movil-menu-left"></div>
            }
            end={
              <div className="movil-menu-right">
                <Link to="/" className="movil-brand-name">
                  <img src={logo} alt="Logo" style={{ height: '40px', width: 'auto' }} />
                </Link>
                <Button
                  icon="pi pi-shopping-cart"
                  className="p-button-rounded p-button-text movil-cart-button"
                  onClick={() => alert('Carrito de compras clickeado')}
                />
              </div>
            }
          />
        </div>
      )}

      {/* Menú para escritorio */}
      {!isMobile && (
        <div className="desktop-menu-container">
          <Link to="/" className="desktop-brand-name">
            <img src={logo} alt="Logo" style={{ height: '40px', width: 'auto' }} />
          </Link>
          <Menubar model={items} />
          <Button
            icon="pi pi-shopping-cart"
            className="p-button-rounded p-button-text desktop-cart-button"
            onClick={() => alert('Carrito de compras clickeado')}
          />
        </div>
      )}
    </>
  );
};

export default TopMenu;
