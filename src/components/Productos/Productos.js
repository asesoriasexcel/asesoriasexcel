// Grid.js
import React from 'react';
import './Productos.css';
import { FaCogs } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";

const Productos = () => {
  return (
    <section className="product-grid-section">
      <div className="product-header">
        <h1>
          <AiOutlineProduct className="product-icon" /> Catálogo de Productos
        </h1>
        <p>Escoge una categoría y conoce todos nuestros productos.</p>
      </div>
      <div className="product-grid">
        {[...Array(6)].map((_, index) => (
          <div className="product-card" key={index}>
            <div className="icon"><FaCogs /></div>
            <h3>Título {index + 1}</h3>
            <p>Descripción de la tarjeta número {index + 1}.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Productos;
