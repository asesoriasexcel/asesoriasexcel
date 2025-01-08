import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Tree, Drawer, Button, Tag } from 'antd';
import { FolderOutlined, FolderOpenOutlined, MenuOutlined } from '@ant-design/icons';
import { FaYoutube } from 'react-icons/fa'; 
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
      return 'gray'; // Color por defecto si no coincide
  }
};

// Función para construir el treeData dinámicamente
const construirTreeData = () => {
  return tiendaCategorias.map((categoria) => {
    const subcategorias = tiendaSubcategorias.filter(
      (subcat) => subcat.id_categoria === categoria.id
    );

    const cantidadArticulosCategoria = tiendaProductos.filter(
      (producto) => producto.id_categoria === String(categoria.id)
    ).length;

    const children = subcategorias.map((subcat) => {
      const cantidadArticulosSubcategoria = tiendaProductos.filter(
        (producto) => producto.id_subcategoria === String(subcat.id_subcategoria)
      ).length;

      return {
        title: `${subcat.nombre} (${cantidadArticulosSubcategoria})`,
        key: `subcategoria-${subcat.id_subcategoria}`,
        isLeaf: true,
      };
    });

    return {
      title: `${categoria.nombre} (${cantidadArticulosCategoria})`,
      key: `categoria-${categoria.id}`,
      children,
    };
  });
};

const TiendaPage = () => {
  const treeData = construirTreeData();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

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

  // Función de filtrado de productos, mostrando todos si no hay filtros
  const productosFiltrados = tiendaProductos.filter((producto) => {
    if (subcategoriaSeleccionada) {
      return producto.id_subcategoria === subcategoriaSeleccionada;
    } else if (categoriaSeleccionada) {
      return producto.id_categoria === categoriaSeleccionada;
    }
    return true; // Si no hay filtros, mostrar todos los productos
  });

  const categoriaNombre = categoriaSeleccionada
    ? tiendaCategorias.find((cat) => String(cat.id) === categoriaSeleccionada)?.nombre
    : null;
  const subcategoriaNombre = subcategoriaSeleccionada
    ? tiendaSubcategorias.find(
        (subcat) => String(subcat.id_subcategoria) === subcategoriaSeleccionada
      )?.nombre
    : null;

  // Función para restablecer los filtros cuando se haga clic en "Tienda"
  const handleClickTienda = () => {
    setCategoriaSeleccionada(null);  // Restablecer la categoría seleccionada
    setSubcategoriaSeleccionada(null);  // Restablecer la subcategoría seleccionada
  };

  return (
    <div className="cuerpo-page-container" style={{ display: 'flex' }}>
      <div className="menu-bar">
        <div className="menu-bar-item" onClick={() => setIsDrawerVisible(true)}>
          <MenuOutlined className="menu-icon" />
        </div>
        <div className="menu-bar-item">Título</div>
        <div className="menu-bar-item">Carrito</div>
      </div>

      <Drawer
        title="Categorías"
        placement="left"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Tree
          defaultExpandAll
          onSelect={onSelect}
          treeData={treeData}
          showIcon={true}
          switcherIcon={(props) =>
            props.expanded ? (
              <FolderOpenOutlined />
            ) : (
              <FolderOutlined />
            )
          }
        />
      </Drawer>

      <div className="tiendapage-menu">
        <div className="tiendapage-menu-canvas">
          <Tree
            defaultExpandAll
            onSelect={onSelect}
            treeData={treeData}
            showIcon={true}
            switcherIcon={(props) =>
              props.expanded ? (
                <FolderOpenOutlined />
              ) : (
                <FolderOutlined />
              )
            }
          />
        </div>
      </div>

      <div className="tiendapage-contenido">
        <div className="tiendapage-contenido-canvas">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/tienda" onClick={handleClickTienda}>Tienda</Link>
            </Breadcrumb.Item>
            {categoriaNombre && (
              <Breadcrumb.Item>{categoriaNombre}</Breadcrumb.Item>
            )}
            {subcategoriaNombre && (
              <Breadcrumb.Item>{subcategoriaNombre}</Breadcrumb.Item>
            )}
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
                    <button className="btn-primary btn-azul">Comprar ahora</button>
                    <button className="btn-primary btn-youtube">
                      <FaYoutube className="youtube-icon" /> Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiendaPage;
