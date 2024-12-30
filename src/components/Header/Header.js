// src/components/Header.js
import React from 'react';
import TopMenu from './TopMenu';  // Importar el subcomponente TopMenu
import TextTrain from './TextTrain';
import './Header.css';

// PrimeReact styles
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'antd/dist/reset.css';

const Header = () => {
  const image1 = require('../../images/imagen1.png'); // Imagen cuadrada a mostrar

  return (
    <header className="header">
      <div className="header-sheet">
        
        <TopMenu />
        <div className="header-content">
          <div className="column">
            <h1>Your Key to Success in the Corporate World</h1>
            <p>Join us to transform groundbreaking ideas into reality and lead the next wave of innovation.</p>
            <div className="button-group">
              <button className="action-button btn-primary">Get Started</button>
              <button className="action-button btn-default">Explore</button>
            </div>
          </div>
          <div className="column">
            <img src={image1} alt="Imagen 1" className="column-image" />
          </div>
        </div>
      </div>

      {/* Usamos el componente TextTrain */}
      <TextTrain />
    </header>
  );
};

export default Header;
