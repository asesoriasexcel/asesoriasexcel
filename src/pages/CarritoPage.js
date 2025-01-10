import React, { useState, useEffect } from 'react';
import { List, Card, Image, Tag, Typography } from 'antd'; // Importamos componentes de Ant Design
import tiendaProductos from '../data/tiendaProductos'; // Importamos los productos

const { Title, Text } = Typography;

const CarritoPage = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);

  useEffect(() => {
    // Obtener el carrito desde el localStorage
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];

    // Buscar los productos completos usando los id_articulo de los artículos en el carrito
    const productos = carrito.map((item) => {
      const producto = tiendaProductos.find(p => p.id_articulo === item.id_articulo);
      return { ...producto, cantidad: item.cantidad }; // Añadir la cantidad del carrito
    });

    setProductosCarrito(productos); // Establecer los productos encontrados en el estado
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Carrito de Compras
      </Title>

      {productosCarrito.length === 0 ? (
        <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
          No tienes productos en tu carrito.
        </Text>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }} // Grid con una columna por fila
          dataSource={productosCarrito}
          renderItem={(producto) => (
            <List.Item>
              <Card bordered hoverable>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Imagen del producto */}
                  <div style={{ flex: '0 0 100px', marginRight: '16px' }}>
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                      preview={false} // Desactiva el modal de preview
                    />
                  </div>

                  {/* Información del producto */}
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ margin: 0 }}>
                      {producto.nombre}
                    </Title>
                    <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                      {/* Mostrar el grado en un Tag */}
                      <Tag color="blue">{producto.grado}</Tag>

                      {/* Mostrar el Tag "Video" si tiene video */}
                      {producto.video_si === 'si' && (
                        <Tag color="red" style={{ marginLeft: '8px' }}>Video</Tag>
                      )}
                    </div>
                    <Text strong>Precio:</Text> ${producto.precio}
                    <br />
                    <Text strong>Cantidad:</Text> {producto.cantidad}
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default CarritoPage;
