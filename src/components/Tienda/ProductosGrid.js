import React from 'react';
import { Tag } from 'antd';
import { FaYoutube } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="productos-grid">
      {productos.map((producto) => (
        <div
          key={producto.id_articulo}
          className="producto-card"
          onClick={() => navigate(`/producto/${producto.id_articulo}`)}
          style={{ cursor: 'pointer' }} // Cambia el cursor para que sea claro que es clicable
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
                <FaYoutube className="youtube-icon" /> Demo
              </button>
            </div>
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-descripcion-corta">
              {producto.descripcion.slice(0, 90)}...
            </p>
            <p className="producto-precio">CLP ${producto.precio}</p>
            <div className="producto-botones">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosGrid;
