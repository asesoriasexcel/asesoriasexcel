import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb, Drawer, Modal, Button, Badge } from 'antd';
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; 
import { FiShoppingCart } from 'react-icons/fi';
import TreeMenu from '../components/Tienda/TreeMenu';
import MenuBar from '../components/Tienda/MenuBar';
import ProductosGrid from '../components/Tienda/ProductosGrid';
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import './TiendaPage.css';

const TiendaPage = () => {
  const navigate = useNavigate();
  const { id_categoria, id_subcategoria } = useParams();
  const location = useLocation(); // Para obtener la ruta actual

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(id_categoria || null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(id_subcategoria || null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVideoLink, setCurrentVideoLink] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id_categoria) {
      setCategoriaSeleccionada(id_categoria);
    }
    if (id_subcategoria) {
      setSubcategoriaSeleccionada(id_subcategoria);
    }
  }, [id_categoria, id_subcategoria]);

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
        (subcat) => String(subcat.id) === idSubcategoria
      )?.id_categoria;
      setCategoriaSeleccionada(idCategoria);
      setSubcategoriaSeleccionada(idSubcategoria);
    }
  };

  // Filtrar productos dependiendo de la ruta
  const productosFiltrados = tiendaProductos.filter((producto) => {
    if (location.pathname === '/tienda/liberados') {
      return producto.liberado === 'si'; // Filtrar solo los productos liberados
    }
    if (subcategoriaSeleccionada) return producto.id_subcategoria === subcategoriaSeleccionada;
    if (categoriaSeleccionada) return producto.id_categoria === categoriaSeleccionada;
    return true;
  });

  const categoriaNombre = categoriaSeleccionada
    ? tiendaCategorias.find((cat) => String(cat.id) === categoriaSeleccionada)?.nombre
    : null;

  const subcategoriaNombre = subcategoriaSeleccionada
    ? tiendaSubcategorias.find(
        (subcat) => String(subcat.id) === subcategoriaSeleccionada
      )?.nombre
    : null;

  const handleClickTienda = () => {
    setCategoriaSeleccionada(null);
    setSubcategoriaSeleccionada(null);
    navigate('/tienda'); // Esto redirige a la ruta "/tienda"
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
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];
    const existeEnCarrito = carrito.find((item) => item.id_articulo === producto.id_articulo);

    if (existeEnCarrito) {
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
    localStorage.setItem('ae-carrito', JSON.stringify(carrito));
    setAddedProductName(producto.nombre);
    setIsConfirmModalVisible(true);
  };

  const handleGoToCart = () => {
    navigate('/carrito');
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
        <TreeMenu onSelect={onSelect} onMostrarTodo={handleClickTienda} />
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
            {location.pathname === '/tienda/liberados' && <Breadcrumb.Item>Liberados</Breadcrumb.Item>}
          </Breadcrumb>

          <div className="tienda-cabezal">
            <h1 className="titulo-productos">{location.pathname === '/tienda/liberados' ? 'Productos Liberados' : 'Tienda de Productos'}</h1>
            <div className="tienda-cabezal-badge">
              <Link to="/carrito">
                <Badge
                  count={(JSON.parse(localStorage.getItem('ae-carrito')) || []).length}
                  overflowCount={99}
                  style={{ backgroundColor: 'var(--especial)' }}
                >
                  <FiShoppingCart className="icono-carrito" />
                </Badge>
              </Link>
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TiendaPage;
