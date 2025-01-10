import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Drawer, Modal, Button, Badge } from 'antd';  // Importamos Button de Ant Design
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Icono de carrito
import { FiShoppingCart } from 'react-icons/fi';
import TreeMenu from './TreeMenu';
import MenuBar from './MenuBar';
import ProductosGrid from './ProductosGrid'; // Importamos el nuevo componente
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import './TiendaPage.css';

const TiendaPage = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Estado para gestionar el modal y el video
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideoLink, setCurrentVideoLink] = useState(null);

  // Estado para el modal de confirmación de éxito
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  // Estado para el modal de error
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleOpenModal = (videoLink) => {
    setCurrentVideoLink(videoLink);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setCurrentVideoLink(null);
    setIsModalVisible(false);
  };

  const handleAddToCart = (producto) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existeEnCarrito = carrito.find((item) => item.id_articulo === producto.id_articulo);

    if (existeEnCarrito) {
      // Mostrar modal de error
      setErrorMessage('No se puede añadir más de una unidad del mismo artículo.');
      setIsErrorModalVisible(true);
      return;
    }

    const nuevoArticulo = {
      id_articulo: producto.id_articulo,
      cantidad: 1,
      timestamp: new Date().toISOString(),
    };

    carrito.push(nuevoArticulo);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    setAddedProductName(producto.nombre);
    setIsConfirmModalVisible(true);
  };

  // Función para redirigir al carrito
  const handleGoToCart = () => {
    // Redirigir al carrito
    window.location.href = "/carrito"; // Suponiendo que tienes una ruta de carrito configurada
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

          <div className="tienda-cabezal">
            <h1 className="titulo-productos">Tienda de Productos</h1>
            <div className="tienda-cabezal-badge">
              <Badge
                count={(JSON.parse(localStorage.getItem('carrito')) || []).length} // Obtiene el total de artículos del carrito
                overflowCount={99} // Límite para mostrar "99+"
                style={{ backgroundColor: 'var(--especial)' }} // Color personalizado del badge
              >
                <FiShoppingCart
                  className="icono-carrito"
                  onClick={handleGoToCart} // Redirige al carrito al hacer clic
                />
              </Badge>
            </div>
          </div>

          <ProductosGrid
            productos={productosFiltrados}
            onAddToCart={handleAddToCart}
            onOpenModal={handleOpenModal}
          />
        </div>
      </div>

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

      <Modal
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        footer={null}
        centered
      >
        <div className="confirmar-anadido">
          <FaCheckCircle />
          <p>¡Has añadido "{addedProductName}" al carrito exitosamente!</p>
          <div className="TiendaPage-modal-icons">
          <Button type="default" onClick={() => setIsConfirmModalVisible(false)}>
            Aceptar
          </Button>
          <Button className="btn-naranjoicon" icon={<FiShoppingCart className="btnnaranjoicon-icon" />} onClick={handleGoToCart}>
            Ir al carrito
          </Button>
          </div>
        </div>
      </Modal>

      <Modal
        visible={isErrorModalVisible}
        onCancel={() => setIsErrorModalVisible(false)}
        footer={null}
        centered
      >
        <div className="error-anadido">
          <FaExclamationCircle />
          <p>{errorMessage}</p>
          <div className="TiendaPage-modal-icons">
          <Button type="default" onClick={() => setIsErrorModalVisible(false)}>
            Aceptar
          </Button>
          <Button className="btn-naranjoicon" icon={<FiShoppingCart className="btnnaranjoicon-icon" />} onClick={handleGoToCart}>
            Ir al carrito
          </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TiendaPage;
