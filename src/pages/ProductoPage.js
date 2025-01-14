import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Button, Tag, Image } from 'antd';
import tiendaProductos from '../data/tiendaProductos';
import './ProductoPage.css';

const { Title, Text, Paragraph } = Typography;

const ProductoPage = () => {
  const { id } = useParams(); // Extrae el parámetro dinámico ":id" de la URL
  const producto = tiendaProductos.find(
    (p) => p.id_articulo === parseInt(id, 10)
  ); // Busca el producto correspondiente

  if (!producto) {
    // Renderiza un mensaje si no se encuentra el producto
    return (
      <div className="producto-container">
        <div className="volver-tienda">
          <Link to="/tienda" className="volver-tienda-link">
            &larr; Volver a la tienda
          </Link>
        </div>
        <Title level={2}>Producto no encontrado</Title>
      </div>
    );
  }

  return (
    <div className="producto-container">
      {/* Enlace para volver a la tienda */}
      <div className="volver-tienda">
        <Link to="/tienda" className="volver-tienda-link">
          &larr; Volver a la tienda
        </Link>
      </div>

      <div className="producto-card">
        <div className="p-info1">
            <div className="p-tira-imagenes"></div>
            <div className="p-imagen"></div>
            <div className="p-info">
                <div className="p-tag"></div>
                <div className="p-nombre"></div>
                <div className="p-descripcion_larga"></div>
                <div className="p-categoria"></div>
                <div className="p-botones"></div>
            </div>
        </div>
        <div className="p-info2">
            <div className="video"></div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductoPage;
