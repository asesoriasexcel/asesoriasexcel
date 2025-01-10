import React, { useState } from 'react';
import { Tree } from 'antd';
import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { AiOutlineHome } from "react-icons/ai";
import { TbFilter, TbFilterX } from "react-icons/tb";
import { Link } from 'react-router-dom'; // Importar Link de react-router-dom
import tiendaCategorias from '../../data/tiendaCategorias';
import tiendaSubcategorias from '../../data/tiendaSubcategorias';
import tiendaProductos from '../../data/tiendaProductos';

const logo = require('../../images/logo/logo4.png');

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

const TreeMenu = ({ onSelect, onMostrarTodo }) => {
  const [filtroAplicado, setFiltroAplicado] = useState(false); // Estado para rastrear el filtro
  const treeData = construirTreeData();

  // Manejar selección de elementos en el árbol
  const handleSelect = (selectedKeys, info) => {
    setFiltroAplicado(true); // Activar filtro cuando se selecciona un elemento
    if (onSelect) onSelect(selectedKeys, info);
  };

  // Manejar el clic en "Mostrar todo"
  const handleMostrarTodo = () => {
    setFiltroAplicado(false); // Desactivar filtro
    if (onMostrarTodo) onMostrarTodo();
  };

  return (
    <div className='TreeMenu-container'>
      <div className='TreeMenu-container-img'>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className='TreeMenu-container-volver'>
        <Link to="/"> {/* Usar Link para navegar al inicio */}
          <AiOutlineHome /> Volver al inicio
        </Link>
      </div>
      <div className="TreeMenu-container-mostrar">
        <span onClick={handleMostrarTodo}>
          {filtroAplicado ? (
            <TbFilterX /> // Icono para filtro activado
          ) : (
            <TbFilter /> // Icono para filtro desactivado
          )} 
          {filtroAplicado ? " Ocultar filtro" : " Mostrar todo"}
        </span>
      </div>
      <div className='TreeMenu-container-tree'>
        <Tree
          defaultExpandAll
          onSelect={handleSelect}
          treeData={treeData}
          showIcon={true}
          switcherIcon={(props) =>
            props.expanded ? <FolderOpenOutlined /> : <FolderOutlined />
          }
        />
      </div>
    </div>
  );
};

export default TreeMenu;
