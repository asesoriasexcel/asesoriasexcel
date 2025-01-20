import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Header.css';

// PrimeReact styles
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'antd/dist/reset.css';

const Header = () => {
  // Inicializa el hook de navegación
  const navigate = useNavigate();

  // Función para redirigir a la página de la tienda
  const goToTienda = () => {
    navigate('/tienda'); // Redirige a la ruta '/tienda'
  };

  return (
    <header id="lp-header" className="header">
      <div className="header-sheet">
        <div className="header-content">
          <div className="column">
              <h1>
              <span className="header1">Aló! AsesoriasExcel</span>
              <span className="header2">Soluciones en Excel y Otras Tecnologías</span>
              </h1>
            <div className="button-group">
              {/* Botón de ver productos que redirige a la página de la tienda */}
              <button
                className="action-button btn-primary btn-verde btn-h1"
                onClick={goToTienda} // Llama a la función para redirigir
              >
                Ver productos
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
