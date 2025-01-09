import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { FiShoppingCart } from 'react-icons/fi';

// Importar la imagen usando require
const logo = require('../images/logo/logo4.png');

const MenuBar = ({ onMenuClick }) => {
  return (
    <div className="menu-bar">
      <div className="menu-bar-item" onClick={onMenuClick}>
        <MenuOutlined className="menu-icon" />
      </div>
      <div className="menu-bar-item">
        {/* Mostrar la imagen importada */}
        <img src={logo} alt="Logo" style={{ height: '30px', width: 'auto' }} />
      </div>
      <div className="menu-bar-item">
        <FiShoppingCart className="menu-icon" />
      </div>
    </div>
  );
};

export default MenuBar;
