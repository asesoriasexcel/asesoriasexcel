import React from 'react';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

import './ProductoGrid.css';

const obtenerColorPorGrado = (grado) => {
  switch (grado) {
    case 'Estándar':
      return 'green';
    case 'Avanzado':
      return 'blue';
    case 'Maestro':
      return 'red';
    default:
      return 'gray';
  }
};

const ProductosGrid = ({ productos, onAddToCart, onOpenModal }) => {
  const navigate = useNavigate();

  const handleComprar = (producto) => {
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];
    const existeEnCarrito = carrito.find((item) => item.id_articulo === producto.id_articulo);

    if (!existeEnCarrito) {
      const nuevoArticulo = {
        id_articulo: producto.id_articulo,
        cantidad: 1,
        timestamp: new Date().toISOString(),
      };
      carrito.push(nuevoArticulo);
      localStorage.setItem('ae-carrito', JSON.stringify(carrito));
    }

    // Redirigir al carrito
    navigate('/carrito');
  };

  const handleDescargar = (producto) => {
    // Lógica para descargar el producto
    console.log(`Descargando el producto: ${producto.nombre}`);
  };

  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <div
          key={producto.id_articulo}
          className="producto-card"
          onClick={() => {
            if (producto.liberado !== 'si') {
              navigate(`/producto/${producto.id_articulo}`);
            }
          }}
          style={{
            cursor: producto.liberado === 'si' ? 'default' : 'pointer', // Cambiar cursor según el estado
            pointerEvents: producto.liberado === 'si' ? 'none' : 'auto', // Desactivar clic si está liberado
          }}
        >

          <div className="cardproducto-imagen">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
          </div>
          <div className="cardproducto-contenido">
            <div className="cp-infotag">
              <div className="cp-tag">
                <span className="cp-tagversion">Versión:</span>
                <Tag
                  color={obtenerColorPorGrado(producto.grado)}
                  className="producto-grado"
                >
                  {producto.grado}
                </Tag>
              </div>
              {/* Ocultar botón Demo si el producto está liberado */}
              {producto.liberado !== 'si' && (
                <button
                  className={`btn-primary btn-youtube ${
                    producto.video_si === 'no' ? 'disabled' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el clic en este botón active la navegación
                    producto.video_si === 'si' && onOpenModal(producto.video_link);
                  }}
                  disabled={producto.video_si === 'no'}
                >
                  Demo
                </button>
              )}
            </div>
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-descripcion-corta">
              {producto.descripcion.slice(0, 90)}...
            </p>
            {/* Mostrar precio tachado si el producto está liberado */}
            {/* Mostrar el precio solo si el producto no está liberado */}
            {producto.liberado !== 'si' && (
              <p className="producto-precio">CLP ${producto.precio}</p>
            )}

            <div className="producto-botones">
            {producto.liberado === 'si' && (
            <div className="producto-liberado-banner">
              ¡Producto Liberado!
            </div>
          )}
              {/* Cambiar botones según el estado de liberado */}
              {producto.liberado === 'si' ? (
                <button
                  className="btn-primary btn-verde"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita navegación al hacer clic
                    handleDescargar(producto);
                  }}
                >
                  Descargar
                </button>
              ) : (
                <>
                  <button
                    className="btn-primary btn-azul"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita navegación al hacer clic
                      handleComprar(producto); // Llama a la nueva lógica para "Comprar"
                    }}
                  >
                    Comprar
                  </button>
                  <button
                    className="btn-primary btn-azulsecundario"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita navegación al hacer clic
                      onAddToCart(producto);
                    }}
                  >
                    Añadir al carrito
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosGrid;
