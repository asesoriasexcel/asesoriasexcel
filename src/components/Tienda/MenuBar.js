import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { FiShoppingCart } from 'react-icons/fi';
import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

// Importar la imagen usando require
const logo = require('../../images/logo/logo4.png');

const MenuBar = ({ onMenuClick }) => {
  const navigate = useNavigate(); // Hook de navegación

  // Obtener la cantidad de productos en el carrito
  const carritoCount = (JSON.parse(localStorage.getItem('carrito')) || []).length;

  return (
    <div className="menu-bar">
      <div className="menu-bar-item" onClick={onMenuClick}>
        <MenuOutlined className="menu-icon" />
      </div>
      <div className="menu-bar-item">
        {/* Mostrar la imagen importada */}
        <img src={logo} alt="Logo" style={{ height: '35px', width: 'auto' }} />
      </div>
      <div className="menu-bar-item">
        <Badge
          count={carritoCount} // Total de productos en el carrito
          overflowCount={99} // Límite para mostrar "99+"
          style={{ backgroundColor: 'var(--especial)' }} // Color personalizado del badge
        >
          <FiShoppingCart
            className="menu-icon"
            style={{
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/carrito')} // Navega al carrito al hacer clic
          />
        </Badge>
      </div>
    </div>
  );
};

export default MenuBar;
