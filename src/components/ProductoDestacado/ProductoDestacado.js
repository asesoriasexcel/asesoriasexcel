import React from 'react';
import { Tag } from 'antd';
import './ProductoDestacado.css'; // Aquí importamos los estilos para el componente Productos
import { PiMedalLight } from "react-icons/pi";
import productosDestacados from '../../data/productosDestacados'; // Archivo de datos

const ProductoDestacado = () => {
  return (
    <section className="productos-section seccion">
      <div className="centered-content">

        <div className="seccion-encabezado-izq">
          <div className="header-izq">
            <PiMedalLight className="productos-icon" /> 
            <h2>Productos Destacados</h2>
          </div>
        </div>

        <div className="contenido productos-sheet">
        {/* Bucle para renderizar productos */}
        {productosDestacados.map((producto, index) => (
          <div
            className={`productos-content ${
              index === productosDestacados.length - 1 ? 'ultimo-producto' : ''
            }`}
            key={producto.id}
          >
            <div className="productos-column">
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>

              <div className="button-group">
                <button className="action-button btn-primary">Comprar</button>
                <p className="precio">Valor: ${producto.precio.toLocaleString('es-CL')} CLP</p>
              </div>
            </div>
            <div className="productos-column">
              <div className="tag-container">
                <Tag color="blue" className="tag-label">Video Explicativo</Tag>
              </div>
              <img 
                src={producto.imagen} 
                alt={`Imagen de ${producto.nombre}`} 
                className="productos-image" 
              />
            </div>
          </div>
        ))}
      </div>


      </div>
    </section>
  );
};

export default ProductoDestacado;
