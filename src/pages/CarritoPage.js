import React, { useState, useEffect } from 'react';
import { List, Card, Image, Tag, Typography, Button, Checkbox, Alert, Table } from 'antd';
import { Link } from 'react-router-dom';
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import './CarritoPage.css';

const { Text } = Typography;

const CarritoPage = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [terminosAceptados, setTerminosAceptados] = useState(false);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];

    const productos = carrito.map((item) => {
      const producto = tiendaProductos.find(p => p.id_articulo === item.id_articulo);
      return { ...producto, cantidad: item.cantidad };
    });

    setProductosCarrito(productos);
  }, []);

  const calcularResumen = () => {
    const cantidadTotal = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    const precioTotal = productosCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    return { cantidadTotal, precioTotal };
  };

  const resumen = calcularResumen();

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto);
  };

  const handleCheckboxChange = (e) => {
    setTerminosAceptados(e.target.checked);
  };

  // Configuración de la tabla del resumen
  const columns = [
    {
      title: 'Producto',
      dataIndex: 'producto',
      key: 'producto',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      align: 'right',
    },
  ];

  const dataSource = productosCarrito.map((producto) => ({
    key: producto.id_articulo,
    producto: `${producto.nombre} x ${producto.cantidad}`,
    subtotal: formatearMonto(producto.precio * producto.cantidad),
  }));

  return (
    <div className="carrito-container">
      <div className="volver-tienda">
        <Link to="/tienda" className="volver-tienda-link">
          &larr; Volver a la tienda
        </Link>
      </div>

      <h2 className="carrito-title">Carrito de compra</h2>

      {productosCarrito.length === 0 ? (
        <Text className="carrito-empty-text">No tienes productos en tu carrito.</Text>
      ) : (
        <div className="carritopage-contenido">
          <List
            className="carrito-list"
            grid={{ gutter: 16, column: 1 }}
            dataSource={productosCarrito}
            renderItem={(producto) => {
              const categoria = tiendaCategorias.find(
                cat => cat.id === parseInt(producto.id_categoria, 10)
              )?.nombre || 'Sin categoría';

              const subcategoria = tiendaSubcategorias.find(
                sub => sub.id === parseInt(producto.id_subcategoria, 10)
              )?.nombre || 'Sin subcategoría';

              return (
                <List.Item className="carrito-list-item">
                  <Card className="carrito-card" bordered hoverable>
                    <h4 className="carrito-categoria">
                      Categoría: {categoria}
                      <Tag color="blue">{producto.grado}</Tag>
                    </h4>

                    <div className="carrito-producto">
                      <div className="carrito-imagen-container">
                        <Image
                          className="carrito-imagen"
                          src={producto.imagen}
                          alt={producto.nombre}
                          preview={false}
                        />
                      </div>

                      <div className="carrito-info">
                        <h4 className="carrito-subcategoria">
                          {subcategoria}
                        </h4>
                        <p className="carrito-nombre">
                          Planilla: <span>{producto.nombre}</span>
                        </p>
                        <div className="carrito-detalles">
                          <span>
                            {formatearMonto(producto.precio)}
                          </span>
                          <p>
                            Cant. {producto.cantidad}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="carrito-acciones">
                      <p className="ver-info">Ver info</p>
                      <p className="eliminar">Eliminar</p>
                    </div>
                  </Card>
                </List.Item>
              );
            }}
          />
          {/* Resumen del carrito */}
          <div className="carrito-resumen">
            <div className="resumen-info">
              {/* Detalle de los productos con tabla */}
              <h4>Detalle de la compra</h4>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                className="carrito-resumen-tabla"
              />
              <hr />
              <div className="resumen-total" >
                <Text>Total: </Text>
                <Text>{formatearMonto(resumen.precioTotal)}</Text>
              </div>

              {/* Checkbox para aceptar los términos */}
              <div className="terminos-condiciones">
                <Checkbox onChange={handleCheckboxChange}>
                  He leído y acepto los{' '}
                  <Link to="/terminoscondiciones" target="_blank">
                    términos y condiciones
                  </Link>.
                </Checkbox>
                {!terminosAceptados && (
                  <Alert
                    message="Debes aceptar los términos y condiciones para continuar."
                    type="warning"
                    showIcon
                    style={{ marginTop: '10px' }}
                  />
                )}
              </div>

              {/* Botón para redirigir a la página de confirmación */}
              <Link to="/confirmacompra">
                <Button
                  type="primary"
                  className="btn-azul"
                  disabled={!terminosAceptados}
                >
                  Comprar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarritoPage;
