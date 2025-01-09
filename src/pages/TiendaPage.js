import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Drawer, Tag, Modal, message } from 'antd';
import { FaYoutube } from 'react-icons/fa';
import { FaCheckCircle } from "react-icons/fa";
import TreeMenu from './TreeMenu';
import MenuBar from './MenuBar';
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import './TiendaPage.css';

// Función para asignar colores según el grado
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

const TiendaPage = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Estado para gestionar el modal y el video
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideoLink, setCurrentVideoLink] = useState(null);

  // Estado para el modal de confirmación
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  const onMenuClick = () => setIsDrawerVisible(true);

  const onSelect = (keys, info) => {
    const { node } = info;

    if (node.key.startsWith('categoria-')) {
      const idCategoria = node.key.split('-')[1];
      setCategoriaSeleccionada(idCategoria);
      setSubcategoriaSeleccionada(null);
    } else if (node.key.startsWith('subcategoria-')) {
      const idSubcategoria = node.key.split('-')[1];
      const idCategoria = tiendaSubcategorias.find(
        (subcat) => String(subcat.id_subcategoria) === idSubcategoria
      )?.id_categoria;

      setCategoriaSeleccionada(idCategoria);
      setSubcategoriaSeleccionada(idSubcategoria);
    }
  };

  const productosFiltrados = tiendaProductos.filter((producto) => {
    if (subcategoriaSeleccionada) return producto.id_subcategoria === subcategoriaSeleccionada;
    if (categoriaSeleccionada) return producto.id_categoria === categoriaSeleccionada;
    return true;
  });

  const categoriaNombre = categoriaSeleccionada
    ? tiendaCategorias.find((cat) => String(cat.id) === categoriaSeleccionada)?.nombre
    : null;

  const subcategoriaNombre = subcategoriaSeleccionada
    ? tiendaSubcategorias.find(
        (subcat) => String(subcat.id_subcategoria) === subcategoriaSeleccionada
      )?.nombre
    : null;

  const handleClickTienda = () => {
    setCategoriaSeleccionada(null);
    setSubcategoriaSeleccionada(null);
  };

  // Manejo del modal para el video de YouTube
  const handleOpenModal = (videoLink) => {
    setCurrentVideoLink(videoLink);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setCurrentVideoLink(null);
    setIsModalVisible(false);
  };

  // Función para añadir al carrito
  const handleAddToCart = (producto) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existeEnCarrito = carrito.find((item) => item.id_articulo === producto.id_articulo);

    if (existeEnCarrito) {
      // Mostrar mensaje de error si el artículo ya está en el carrito
      message.error('No se puede añadir más de una unidad del mismo artículo.');
      return;
    }

    // Añadir el producto al carrito
    const nuevoArticulo = {
      id_articulo: producto.id_articulo,
      cantidad: 1,
      timestamp: new Date().toISOString(),
    };

    carrito.push(nuevoArticulo);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar mensaje de confirmación
    setAddedProductName(producto.nombre);
    setIsConfirmModalVisible(true);
  };

  return (
    <div className="cuerpo-page-container" style={{ display: 'flex' }}>
      <MenuBar onMenuClick={onMenuClick} />

      <Drawer
        title="Categorías"
        placement="left"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <TreeMenu onSelect={onSelect} />
      </Drawer>

      <div className="tiendapage-menu">
        <div className="tiendapage-menu-canvas">
          <TreeMenu onSelect={onSelect} onMostrarTodo={handleClickTienda} />
        </div>
      </div>

      <div className="tiendapage-contenido">
        <div className="tiendapage-contenido-canvas">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/tienda" onClick={handleClickTienda}>
                Tienda
              </Link>
            </Breadcrumb.Item>
            {categoriaNombre && <Breadcrumb.Item>{categoriaNombre}</Breadcrumb.Item>}
            {subcategoriaNombre && <Breadcrumb.Item>{subcategoriaNombre}</Breadcrumb.Item>}
          </Breadcrumb>

          <h1 className="titulo-productos">Tienda de Productos</h1>

          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
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
                      onClick={() => handleAddToCart(producto)}
                    >
                      Añadir al carrito
                    </button>
                    <button
                      className={`btn-primary btn-youtube ${producto.video_si === 'no' ? 'disabled' : ''}`}
                      onClick={() =>
                        producto.video_si === 'si' && handleOpenModal(producto.video_link)
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
        </div>
      </div>

      {/* Modal para el video */}
      <Modal
        className="modal-tienda-grid-video" 
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width="80%"
        bodyStyle={{ padding: 0 }}
      >
        {currentVideoLink && (
          <iframe
            width="100%"
            height="500px"
            src={currentVideoLink}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video Demo"
          ></iframe>
        )}
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={null}
        centered
      >
        <div className="confirmar-anadido">
          <FaCheckCircle />
          <p>¡Has añadido "{addedProductName}" al carrito exitosamente!</p>
        </div>
      </Modal>
    </div>
  );
};

export default TiendaPage;
