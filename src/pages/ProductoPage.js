import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Tag, Image, Alert } from 'antd'; // Importa el componente Alert
import { Carousel } from 'primereact/carousel'; // Importa el componente Carousel
import { RiFileExcel2Line } from "react-icons/ri";
import { FaYoutube } from 'react-icons/fa';
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import tiendaImagenes from '../data/tiendaImagenes'; // Importa la data de imágenes
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Estilo para PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilo principal
import 'primeicons/primeicons.css'; // Íconos de PrimeReact
import './ProductoPage.css';

const { Title, Paragraph, Text } = Typography;

const ProductoPage = () => {
  const { id } = useParams(); // Extrae el parámetro dinámico ":id" de la URL
  const producto = tiendaProductos.find(
    (p) => p.id_articulo === parseInt(id, 10)
  ); // Busca el producto correspondiente

  // Filtra las imágenes asociadas al producto
  const imagenes = tiendaImagenes.filter(
    (img) => img.id_producto === producto?.id
  );

  // Estado para la imagen actualmente seleccionada (inicializa con la primera imagen del producto)
  const [imagenSeleccionada, setImagenSeleccionada] = useState(
    imagenes.length > 0 ? imagenes[0].url : ''
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

  // Función de "item" para el carrusel
  const itemTemplate = (img) => (
    <div key={img.id_imagen}>
      <Image
        alt={producto.nombre}
        src={img.url}
        className="producto-imagen"
        preview={false}
      />
    </div>
  );

  // Función para formatear precio en formato CLP
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(precio);
  };

  // Función para convertir enlaces de YouTube al formato embebido
  const convertirEnlaceEmbed = (link) => {
    if (link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link; // Si no es un enlace estándar de YouTube, lo deja como está
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
        <div className="p-nombre titulo-cabezal">
          <RiFileExcel2Line />
          <h2>Planilla {producto.nombre}</h2>
        </div>

        {/* Mensaje de advertencia con el componente Alert */}
        <Alert
          message="Este producto cuenta con 2 licencias de uso para diferentes equipos."
          type="warning"
          showIcon
          style={{ marginBottom: '20px' }} // Estilo para agregar espacio debajo del mensaje
        />

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
              <span>Versión:</span><Tag color="blue" style={{ marginLeft:'8px' }} >{producto.grado}</Tag>
            </div>
            <div className="p-nombre titulo-central">
              <RiFileExcel2Line />
              <h2>Planilla {producto.nombre}</h2>
            </div>
            <div className="p-descripcion_larga">
              <p>{producto.descripcion_larga}</p>
            </div>
            <div className="p-precio">
              <p>{formatearPrecio(producto.precio)}</p>
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
              <Button
                type="primary"
                disabled={producto.disponible !== 'si'}
                className="btn-azulsecundario"
              >
                {producto.disponible === 'si' ? 'Añadir al carrito' : 'No disponible'}
              </Button>
            </div>
          </div>
        </div>

        {/* Sección inferior (video) */}
        <div className="p-info2">
          <hr></hr>
          <div className="p-titulovideo">
            <FaYoutube /><h2>Video demostrativo</h2>
          </div>
          {producto.video_si === 'si' && producto.video_link && (
            <div className="p-video">
              <iframe
                width="100%"
                height="600"
                src={convertirEnlaceEmbed(producto.video_link)} // Usamos la función para convertir el enlace
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
