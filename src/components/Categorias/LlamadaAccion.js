import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para navegación
import { Button } from 'antd';
import './LlamadaAccion.css';

const LlamadaAccion = () => {
  return (
    <div className="llamada-accion">
      <h1 className="llamada-accion-titulo">Nuestros productos son únicos. Revisa nuestra tienda.</h1>
      {/* Usamos Link para la navegación */}
      <Link to="/tienda">
        <Button type="primary" className="btn-naranjo">Entrar</Button>
      </Link>
    </div>
  );
};

export default LlamadaAccion;
