import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, Tag, Image, Alert, Badge } from 'antd';  // Importamos Image de Ant Design
import { Carousel } from 'primereact/carousel';
import { RiFileExcel2Line } from "react-icons/ri";
import { FaYoutube } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineSearch } from "react-icons/hi";
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import tiendaImagenes from '../data/tiendaImagenes'; 
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import './ProductoPage.css';

const { Title, Text } = Typography;

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

const ProductoPage = () => {
  const { id } = useParams();
  const producto = tiendaProductos.find(
    (p) => p.id_articulo === parseInt(id, 10)
  );

  const imagenes = tiendaImagenes.filter(
    (img) => img.id_producto === producto?.id_articulo
  );

  const [imagenSeleccionada, setImagenSeleccionada] = useState(
    imagenes.length > 0 ? imagenes[0].url : ''
  );
  
  const carritoCount = (JSON.parse(localStorage.getItem('ae-carrito')) || []).length;

  if (!producto) {
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

  const categoria = tiendaCategorias.find(
    (cat) => cat.id_categoria === producto.id
  )?.nombre;

  const subcategoria = tiendaSubcategorias.find(
    (subcat) => subcat.id_subcategoria === producto.id
  )?.nombre;

  const itemTemplate = (img) => (
    <div key={img.id_imagen} className="carousel-item">
      <Image
        alt={producto.nombre}
        src={img.url}
        className="producto-imagen"
        preview={{ src: img.url }}
      />
    </div>
  );
  

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(precio);
  };

  const convertirEnlaceEmbed = (link) => {
    if (link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return link;
  };

  return (
    <div className="producto-container">
      <div className="volver-tienda">
        <Link to="/tienda" className="volver-tienda-link">
          &larr; Volver a la tienda
        </Link>
        <Link to="/carrito" className="carrito-link">
          <Badge
            count={carritoCount}
            overflowCount={99}
            style={{ backgroundColor: 'var(--especial)' }}
          >
            <FiShoppingCart
              style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            />
          </Badge>
        </Link>
      </div>

      <div className="producto-card">
        <div className="p-nombre titulo-cabezal">
          <RiFileExcel2Line />
          <h2>Planilla {producto.nombre}</h2>
        </div>

        <Alert
          message="Este producto cuenta con 2 licencias de uso para diferentes equipos."
          type="warning"
          showIcon
          style={{ marginBottom: '20px' }}
        />

        <div className="p-info1">
          <div className="p-galeria-imagen">
            <div className="p-tira-imagenes">
              {imagenes.map((img) => (
                <Image
                  key={img.id_imagen}
                  src={img.url}
                  alt={`Miniatura de ${producto.nombre}`}
                  className="miniatura-imagen"
                  preview={false}
                  onClick={() => setImagenSeleccionada(img.url)}
                />
              ))}
            </div>
            <div className="p-imagen">
              <Image
                alt={producto.nombre}
                src={imagenSeleccionada}
                className="producto-imagen"
                preview={{ src: imagenSeleccionada }}
              />
            </div>
            <div className="p-carrousel">
              <Carousel
                value={imagenes}
                itemTemplate={itemTemplate}
                numVisible={1}
                circular
                autoplayInterval={3000}
              />
            </div>
          </div>

          <div className="p-info">
            <div className="p-tag">
              <div className="p-tag1">
                <span>Versión:</span>
                <Tag color={obtenerColorPorGrado(producto.grado)} style={{ marginLeft: '8px' }}>
                  {producto.grado}
                </Tag>
              </div>
              <div className="p-tag2">
                  <button
                    className={`btn-primary btn-youtube ${
                      producto.video_si === 'no' ? 'disabled' : ''
                    }`}
                    disabled={producto.video_si === 'no'}
                    onClick={() => {
                      const demoSection = document.getElementById('p-info2');
                      if (demoSection) {
                        demoSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Demo
                  </button>
                </div>
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

        <div id="p-info2" className="p-info2">
          <hr />
          <div className="p-titulovideo">
            <FaYoutube /><h2>Video demostrativo</h2>
          </div>
          {producto.video_si === 'si' && producto.video_link && (
            <div className="p-video">
              <iframe
                width="100%"
                height="600"
                src={convertirEnlaceEmbed(producto.video_link)}
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
