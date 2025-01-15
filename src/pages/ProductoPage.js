import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Tag, Image } from 'antd';
import { Carousel } from 'primereact/carousel';  // Importa el componente Carousel
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import tiendaImagenes from '../data/tiendaImagenes'; // Importa la data de imágenes
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Estilo para PrimeReact
import 'primereact/resources/primereact.min.css';  // Estilo principal
import 'primeicons/primeicons.css';  // Íconos de PrimeReact
import './ProductoPage.css';

const { Title, Paragraph, Text } = Typography;

const ProductoPage = () => {
  const { id } = useParams(); // Extrae el parámetro dinámico ":id" de la URL
  const producto = tiendaProductos.find(
    (p) => p.id_articulo === parseInt(id, 10)
  ); // Busca el producto correspondiente

  // Estado para la imagen actualmente seleccionada
  const [imagenSeleccionada, setImagenSeleccionada] = useState(
    producto?.imagen || ''
  );

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

  // Obtén el nombre de la categoría y subcategoría
  const categoria = tiendaCategorias.find(
    (cat) => cat.id_categoria === producto.id
  )?.nombre;

  const subcategoria = tiendaSubcategorias.find(
    (subcat) => subcat.id_subcategoria === producto.id
  )?.nombre;

  // Filtra las imágenes asociadas al producto
  const imagenes = tiendaImagenes.filter(
    (img) => img.id_producto === producto.id
  );

  // Función de "item" para el carrusel
  const itemTemplate = (img) => {
    return (
      <div key={img.id_imagen}>
        <Image
          alt={producto.nombre}
          src={img.url}
          className="producto-imagen"
          preview={false}
        />
      </div>
    );
  };

  return (
    <div className="producto-container">
      {/* Enlace para volver a la tienda */}
      <div className="volver-tienda">
        <Link to="/tienda" className="volver-tienda-link">
          &larr; Volver a la tienda
        </Link>
      </div>

      {/* Contenedor principal del producto */}
      <div className="producto-card">
        {/* Sección superior (imagen y detalles del producto) */}
        <div className="p-info1">
          {/* Imagen principal */}
          <div className="p-galeria-imagen">
            {/* Tira de imágenes */}
            <div className="p-tira-imagenes">
              {imagenes.map((img) => (
                <Image
                  key={img.id_imagen}
                  src={img.url}
                  alt={`Miniatura de ${producto.nombre}`}
                  className="miniatura-imagen"
                  preview={false}
                  onClick={() => setImagenSeleccionada(img.url)} // Actualiza la imagen principal
                />
              ))}
            </div>
            <div className="p-imagen">
              <Image
                alt={producto.nombre}
                src={imagenSeleccionada}
                className="producto-imagen"
                preview={false}
              />
            </div>
            {/* Carrusel de imágenes al final */}
            <div className="p-carrousel">
              <Carousel
                value={imagenes}
                itemTemplate={itemTemplate}
                numVisible={1}
                circular
                autoplayInterval={3000} // Intervalo entre cada imagen
              />
            </div>
          </div>

          {/* Detalles del producto */}
          <div className="p-info">
            <div className="p-tag">
              <Tag color="blue">{producto.grado}</Tag>
            </div>
            <div className="p-nombre">
              <Title level={3}>{producto.nombre}</Title>
            </div>
            <div className="p-descripcion_larga">
              <Paragraph>{producto.descripcion_larga}</Paragraph>
            </div>
            <div className="p-categoria">
              <Text>
                <strong>Categoría:</strong> {categoria || 'Desconocida'}
              </Text>
              <br />
              <Text>
                <strong>Subcategoría:</strong> {subcategoria || 'Desconocida'}
              </Text>
            </div>
            <div className="p-botones">
              <Button
                type="primary"
                disabled={producto.disponible !== 'si'}
                className="btn-azul"
              >
                {producto.disponible === 'si' ? 'Comprar' : 'No disponible'}
              </Button>
            </div>
          </div>
        </div>

        {/* Sección inferior (video) */}
        <div className="p-info2">
          {producto.video_si === 'si' && producto.video_link && (
            <div className="video">
              <iframe
                width="100%"
                height="315"
                src={producto.video_link}
                title="Video demostrativo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductoPage;
