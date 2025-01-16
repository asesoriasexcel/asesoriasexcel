import React, { useState } from 'react';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './ProductoDestacado.css'; // Aquí importamos los estilos para el componente Productos
import { PiMedalLight } from "react-icons/pi";
import productosDestacados from '../../../data/productosDestacados'; // Archivo de datos

const ProductoDestacado = () => {
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  // Función para convertir enlaces de YouTube al formato embebido
  const convertirEnlaceEmbed = (link) => {
    if (link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link; // Si no es un enlace estándar de YouTube, lo deja como está
  };

  // Función para manejar la redirección al hacer clic en el botón Comprar
  const manejarCompra = (id) => {
    navigate(`/producto/${id}`); // Redirigir al usuario al URL con el id del producto
  };

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
          {productosDestacados.map((producto, index) => (
            <div
              className={`productos-content ${index === productosDestacados.length - 1 ? 'ultimo-producto' : ''}`}
              key={producto.id_articulo}
            >
              <div className="productos-column">
                <h2><span style={{ color: 'rgb(230, 230, 230)', fontWeight: '500' }} >Planilla</span> {producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <p style={{ color: 'var(--happy)' }}>Este producto cuenta con 2 licencias de uso para diferentes equipos.</p>
                <DescripcionLarga descripcion_larga={producto.descripcion_larga} />
                <div className="button-group">
                  {/* Enlace del botón "Comprar" */}
                  <button 
                    className="action-button btn-primary btn-azul"
                    onClick={() => manejarCompra(producto.id_articulo)} // Llamar a la función manejarCompra
                  >
                    Comprar
                  </button>
                  <p className="precio">${producto.precio.toLocaleString('es-CL')} CLP</p>
                </div>
              </div>
              <div className="productos-column">
                <div className="tag-container">
                  {producto.video_si && (
                    <Tag color="blue" className="tag-label">Video Demostrativo</Tag>
                  )}
                </div>
                {producto.video_si ? (
                  <iframe
                    src={convertirEnlaceEmbed(producto.video_link)}
                    title={`Video de ${producto.nombre}`}
                    className="productos-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img 
                    src={producto.imagen} 
                    alt={`Imagen de ${producto.nombre}`} 
                    className="productos-image" 
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente para manejar la descripción larga
const DescripcionLarga = ({ descripcion_larga }) => {
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

  return (
    <div className="btn-vermas">
      {mostrarDescripcion && <p>{descripcion_larga}</p>}
      <button 
        onClick={() => setMostrarDescripcion(!mostrarDescripcion)} 
        className="ver-mas-btn"
      >
        {mostrarDescripcion ? "Ver menos" : "Leer más"}
      </button>
    </div>
  );
};

export default ProductoDestacado;
