import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";

import './TopMenu.css';

const TopMenu = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Lista de elementos del menú
  const items = [
    {
      label: 'Inicio',
      icon: <AiOutlineHome className="icon-menuapp" />,
      command: () => alert('Home clicked')
    },
    {
      label: 'Tienda de productos',
      icon: <AiOutlineAppstore className="icon-menuapp" />,
      command: () => alert('Features clicked')
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Components',
          icon: 'pi pi-bolt',
          command: () => alert('Components clicked')
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
          command: () => alert('Blocks clicked')
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
          command: () => alert('UI Kit clicked')
        },
        {
          label: 'Templates',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Apollo',
              icon: 'pi pi-palette',
              command: () => alert('Apollo clicked')
            },
            {
              label: 'Ultima',
              icon: 'pi pi-palette',
              command: () => alert('Ultima clicked')
            }
          ]
        }
      ]
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      command: () => alert('Contact clicked')
    }
  ];

  // Detectar el tamaño de la pantalla
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);  // Consideramos móvil si la pantalla es menor o igual a 768px
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
                  <span className="movil-brand-name">
                    <span className="asesoria">Asesorias</span>
                    <span className="excel">Excel</span>
                  </span>
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
          <Link to="/">
            <span className="desktop-brand-name">
              <span className="asesoria">Asesorias</span>
              <span className="excel">Excel</span>
            </span>
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
