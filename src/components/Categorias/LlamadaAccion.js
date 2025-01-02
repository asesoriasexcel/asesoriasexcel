import React from 'react';
import { Button } from 'antd';
import './LlamadaAccion.css';

const LlamadaAccion = () => {
  return (
    <div className="llamada-accion">
      <h1 className="llamada-accion-titulo">Nuestros productos son únicos. Revisa nuestra tienda.</h1>
      <Button type="primary" className="btn-naranjo">Entrar</Button>
    </div>
  );
};

export default LlamadaAccion;
