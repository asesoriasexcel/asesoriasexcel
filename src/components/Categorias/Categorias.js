// Categorias.js
import React from 'react';
import './Categorias.css';
import { AiOutlineProduct } from "react-icons/ai";
import categorias from '../../data/categorias'; // Importar los datos

const Categorias = () => {
  return (
    <section className="categoria-grid-section">
      <div className="categoria-header">
        <h1>
          <AiOutlineProduct className="categoria-icon" /> Categorías de Productos
        </h1>
        <p>Escoge una categoría y conoce todos nuestros productos.</p>
      </div>
      <div className="categoria-grid">
        {categorias.map((categoria) => (
          <div className="categoria-card" key={categoria.id}>
            <div className="icon">{categoria.icono}</div> {/* Aquí renderizamos el icono directamente */}
            <h3>{categoria.titulo}</h3>
            <p>{categoria.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categorias;
