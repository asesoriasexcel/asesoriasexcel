import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Tree, Drawer, Button, Tag } from 'antd'; // Asegúrate de incluir 'Tag'
import { FolderOutlined, FolderOpenOutlined, MenuOutlined } from '@ant-design/icons';
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import './TiendaPage.css';


// Función para construir el treeData dinámicamente
const construirTreeData = () => {
  return tiendaCategorias.map((categoria) => {
    const subcategorias = tiendaSubcategorias.filter(
      (subcat) => subcat.id_categoria === categoria.id
    );

    const cantidadArticulosCategoria = tiendaProductos.filter(
      (producto) => producto.id_categoria === String(categoria.id) // id_categoria como string
    ).length;

    const children = subcategorias.map((subcat) => {
      const cantidadArticulosSubcategoria = tiendaProductos.filter(
        (producto) => producto.id_subcategoria === String(subcat.id_subcategoria)
      ).length;

      return {
        title: `${subcat.nombre} (${cantidadArticulosSubcategoria})`,
        key: `subcategoria-${subcat.id_subcategoria}`,
        isLeaf: true, // Las subcategorías son nodos hoja
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

  // Estado para el Drawer (menú hamburguesa)
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

  const productosFiltrados = tiendaProductos.filter((producto) => {
    if (subcategoriaSeleccionada) {
      return producto.id_subcategoria === subcategoriaSeleccionada;
    } else if (categoriaSeleccionada) {
      return producto.id_categoria === categoriaSeleccionada;
    }
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

  return (
    <div className="cuerpo-page-container" style={{ display: 'flex' }}>
      {/* Menú hamburguesa visible solo en pantallas pequeñas */}
      <Button
        icon={<MenuOutlined />}
        className="menu-hamburguesa"
        onClick={() => setIsDrawerVisible(true)}
      >
        Menú
      </Button>

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

      {/* Menú de categorías a la izquierda */}
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

      {/* Contenido principal a la derecha */}
      <div className="tiendapage-contenido">
        <div className="tiendapage-contenido-canvas">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/tienda">Tienda</Link>
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
                  <Tag color="blue" className="producto-grado">
                    {producto.grado}
                  </Tag>
                  <h3 className="producto-nombre">{producto.nombre}</h3>
                  <p className="producto-descripcion-corta">
                    {producto.descripcion.slice(0, 90)}...
                  </p>
                  <p className="producto-precio">CLP ${producto.precio}</p>
                  <div className="producto-botones">
                    <button className="btn-primary btn-azul">Comprar ahora</button>
                    <button className="btn-primary btn-naranjo-claro">Agregar al carrito</button>
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
