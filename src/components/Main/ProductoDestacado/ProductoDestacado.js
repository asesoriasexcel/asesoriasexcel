import React from 'react';
import { Tag } from 'antd';
import './ProductoDestacado.css'; // Aquí importamos los estilos para el componente Productos
import { PiMedalLight } from "react-icons/pi";
import productosDestacados from '../../../data/productosDestacados'; // Archivo de datos

const ProductoDestacado = () => {
  // Función para convertir enlaces de YouTube al formato embebido
  const convertirEnlaceEmbed = (link) => {
    if (link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link; // Si no es un enlace estándar de YouTube, lo deja como está
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
            className={`productos-content ${
              index === productosDestacados.length - 1 ? 'ultimo-producto' : ''
            }`}
            key={producto.id}
          >
            <div className="productos-column">
              <h2>Planilla {producto.nombre}</h2>
              <p>{producto.descripcion}</p>

              <div className="button-group">
                <button className="action-button btn-primary btn-azul">Comprar</button>
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

export default ProductoDestacado;

