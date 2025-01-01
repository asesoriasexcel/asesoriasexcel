import React from 'react';
import './Categorias.css';
import { AiOutlineProduct } from "react-icons/ai";
import { Button } from 'antd'; // Importa el componente Button de Ant Design
import categorias from '../../data/categorias'; // Importar los datos

const Categorias = () => {
  return (
    <section className="categoria-grid-section seccion">
      <div className="centered-content"> 

        <div className="seccion-encabezado-izq">
          <div className="header-izq">
            <AiOutlineProduct className="categoria-icon" /> 
            <h2>Categorías de Productos</h2>
          </div>
        </div>

        <div className="contenido categoria-grid">
          {categorias.map((categoria) => (
            <div className="categoria-card" key={categoria.id}>
              <div className="icon">{categoria.icono}</div>
              <h3>{categoria.titulo}</h3>
              <p>{categoria.descripcion}</p>
              <div className="ver-mas-btn">
                <Button type="primary" className="btn-naranjo">Ver más</Button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Categorias;
