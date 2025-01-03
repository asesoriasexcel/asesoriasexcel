// src/components/Header.js
import React from 'react';
import './Header.css';

// PrimeReact styles
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'antd/dist/reset.css';

const Header = () => {

  return (
    <header id="lp-header" className="header">
      <div className="header-sheet">
        
        
        <div className="header-content">
          <div className="column">
            <h1>Aló! AsesoriasExcel: Soluciones en Excel y Otras Tecnologías</h1>
            <div className="button-group">
              <button className="action-button btn-primary btn-naranjo">Ver productos</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
