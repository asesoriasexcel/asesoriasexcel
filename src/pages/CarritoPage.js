import React, { useState, useEffect } from 'react';
import { List, Card, Image, Tag, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';
import './CarritoPage.css';

const { Text } = Typography;

const CarritoPage = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);

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

  // Función para formatear el monto a pesos chilenos (CLP)
  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto);
  };

  return (
    <div className="carrito-container">
      {/* Enlace para volver a la tienda */}
      <div className="volver-tienda">
        <Link to="/tienda" className="volver-tienda-link" >
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
              <div className="resumen-infodetalle">
                <p>Cantidad de productos: </p>
                <p>{resumen.cantidadTotal}</p>
              </div>
              <div className="resumen-infodetalle">
                <p>Total:</p>
                <p>{formatearMonto(resumen.precioTotal)}</p>
              </div>
              {/* Botón para redirigir a la página de confirmación */}
              <Link to="/confirmacompra">
                <Button type="primary" className="btn-azul">
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
