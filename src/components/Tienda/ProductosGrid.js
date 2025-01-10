import React from 'react';
import { Tag } from 'antd';
import { FaYoutube } from 'react-icons/fa';


const obtenerColorPorGrado = (grado) => {
  switch (grado) {
    case 'Básico':
      return 'green';
    case 'Avanzado':
      return 'blue';
    case 'Maestro':
      return 'purple';
    case 'Legendario':
      return 'gold';
    default:
      return 'gray';
  }
};

const ProductosGrid = ({ productos, onAddToCart, onOpenModal }) => {
  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <div key={producto.id_articulo} className="producto-card">
          <div className="cardproducto-imagen">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
          </div>
          <div className="cardproducto-contenido">
            <Tag
              color={obtenerColorPorGrado(producto.grado)}
              className="producto-grado"
            >
              {producto.grado}
            </Tag>
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-descripcion-corta">
              {producto.descripcion.slice(0, 90)}...
            </p>
            <p className="producto-precio">CLP ${producto.precio}</p>
            <div className="producto-botones">
              <button
                className="btn-primary btn-azul"
                onClick={() => onAddToCart(producto)}
              >
                Añadir al carrito
              </button>
              <button
                className={`btn-primary btn-youtube ${producto.video_si === 'no' ? 'disabled' : ''}`}
                onClick={() =>
                  producto.video_si === 'si' && onOpenModal(producto.video_link)
                }
                disabled={producto.video_si === 'no'}
              >
                <FaYoutube className="youtube-icon" /> Demo
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosGrid;
