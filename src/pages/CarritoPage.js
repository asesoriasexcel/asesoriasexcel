import React, { useState, useEffect } from 'react';
import { List, Card, Image, Tag, Typography } from 'antd';
import tiendaProductos from '../data/tiendaProductos';
import tiendaCategorias from '../data/tiendaCategorias';
import tiendaSubcategorias from '../data/tiendaSubcategorias';

import './CarritoPage.css';

const { Title, Text } = Typography;

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

  return (
    <div className="carrito-container">
      <Title level={2} className="carrito-title">
        ...
      </Title>

      {productosCarrito.length === 0 ? (
        <Text className="carrito-empty-text">
          No tienes productos en tu carrito.
        </Text>
      ) : (
        <List
          className="carrito-list"
          grid={{ gutter: 16, column: 1 }}
          dataSource={productosCarrito}
          renderItem={(producto) => {
            const categoria = tiendaCategorias.find(
              cat => cat.id === parseInt(producto.id_categoria, 10)
            )?.nombre || 'Sin categoría';

            const subcategoria = tiendaSubcategorias.find(
              sub => sub.id=== parseInt(producto.id_subcategoria, 10)
            )?.nombre || 'Sin subcategoría';

            return (
              <List.Item className="carrito-list-item">
                <Card className="carrito-card" bordered hoverable>
                  <h4 className="carrito-categoria">
                    Categoría {categoria}
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
                        Planilla {producto.nombre}
                      </p>
                      <div className="carrito-detalles">
                        <span>
                          CLP ${producto.precio}
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
      )}
    </div>
  );
};

export default CarritoPage;
