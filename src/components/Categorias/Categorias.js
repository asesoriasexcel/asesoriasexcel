// Categorias.js
import React from 'react';
import './Categorias.css';
import { AiOutlineProduct } from "react-icons/ai";
import categorias from '../../data/categorias'; // Importar los datos

const Categorias = () => {
  return (
    <section className="categoria-grid-section seccion">
      <div className="centered-content"> 

        <div className="seccion-encabezado-izq">
          <div className="header-izq">
            <h2>
              <AiOutlineProduct className="categoria-icon" /> 
              <span>Categorías de Productos</span>
            </h2>
            <p>Escoge una categoría y conoce todos nuestros productos.</p>
          </div>
        </div>

        <div className="contenido categoria-grid">
        {categorias.map((categoria) => (
          <div className="categoria-card" key={categoria.id}>
            <div className="icon">{categoria.icono}</div> {/* Aquí renderizamos el icono directamente */}
            <h3>{categoria.titulo}</h3>
            <p>{categoria.descripcion}</p>
          </div>
        ))}
      </div>

      </div>
    </section>
  );
};

export default Categorias;
