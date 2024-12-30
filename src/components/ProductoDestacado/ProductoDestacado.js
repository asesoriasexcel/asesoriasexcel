import React from 'react';
import { Tag } from 'antd';
import './ProductoDestacado.css'; // Aquí importamos los estilos para el componente Productos
import { PiMedalLight } from "react-icons/pi";
import productosDestacados from '../../data/productosDestacados'; // Archivo de datos

const ProductoDestacado = () => {
  return (
    <section className="productos">
      <div className="productos-header">
          <h1>
            <PiMedalLight className="productos-icon" /> Productos Destacados
          </h1>
        </div>

      <div className="productos-sheet">
        {/* Bucle para renderizar productos */}
        {productosDestacados.map((producto) => (
          <div className="productos-content" key={producto.id}>
            <div className="productos-column">
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              
              <div className="button-group">
                <button className="action-button btn-primary">Comprar</button>
                <p className="precio">Valor: ${producto.precio.toLocaleString('es-CL')} CLP</p>
              </div>
            </div>
            <div className="productos-column">
              <Tag color="blue" className="tag-label">Video Explicativo</Tag>
              <img 
                src={producto.imagen} 
                alt={`Imagen de ${producto.nombre}`} 
                className="productos-image" 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductoDestacado;
