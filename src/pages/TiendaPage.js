import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Tree } from 'antd';
import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Tag } from 'antd'; // Importa el componente Tag de Ant Design
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

  // Estado para la selección de categoría y subcategoría
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState(null);

  // Manejar la selección en el árbol
  const onSelect = (keys, info) => {
    const { node } = info;

    if (node.key.startsWith('categoria-')) {
      const idCategoria = node.key.split('-')[1];
      setCategoriaSeleccionada(idCategoria);
      setSubcategoriaSeleccionada(null); // Reinicia la subcategoría
    } else if (node.key.startsWith('subcategoria-')) {
      const idSubcategoria = node.key.split('-')[1];
      const idCategoria = tiendaSubcategorias.find(
        (subcat) => String(subcat.id_subcategoria) === idSubcategoria
      )?.id_categoria;

      setCategoriaSeleccionada(idCategoria);
      setSubcategoriaSeleccionada(idSubcategoria);
    }
  };

  // Filtrar los productos basados en las selecciones
  const productosFiltrados = tiendaProductos.filter((producto) => {
    if (subcategoriaSeleccionada) {
      return producto.id_subcategoria === subcategoriaSeleccionada;
    } else if (categoriaSeleccionada) {
      return producto.id_categoria === categoriaSeleccionada;
    }
    return true; // Si no hay selección, mostrar todos los productos
  });

  // Obtener los nombres para el breadcrumb
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
            {productosFiltrados.map((producto) => {
              const colorGrado = {
                Básico: 'blue',
                Avanzado: 'green',
                Maestro: 'magenta',
                Legendario: 'purple',
              }[producto.grado] || 'default';

              return (
                <div key={producto.id_articulo} className="producto-card">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="producto-imagen"
                  />
                  <h3 className="producto-nombre">{producto.nombre}</h3>
                  <Tag color={colorGrado} className="producto-grado">
                    {producto.grado}
                  </Tag>
                  <p className="producto-descripcion-corta">
                    {producto.descripcion.slice(0, 90)}...
                  </p>
                  <p className="producto-precio">CLP ${producto.precio}</p>
                  <div className="producto-botones">
                    <button className="btn-primary btn-azul">Comprar ahora</button>
                    <button className="btn-primary btn-naranjo">Agregar al carrito</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiendaPage;
