import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Card, Tag, Image } from 'antd';
import { Link } from 'react-router-dom';
import tiendaProductos from '../data/tiendaProductos'; // Asegúrate de importar los productos
import './ConfirmarCompraPage.css';

const { Text } = Typography;

const ConfirmarCompraPage = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Leer carrito desde el localStorage
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];

    // Crear un array con los productos obtenidos desde tiendaProductos
    const productos = carrito.map((item) => {
      const producto = tiendaProductos.find(p => p.id_articulo === item.id_articulo);
      if (producto) {
        return { ...producto, cantidad: item.cantidad };
      }
      return null; // En caso de que no se encuentre el producto, retornar null
    }).filter(item => item !== null); // Filtrar elementos nulos

    setProductosCarrito(productos);

    // Calcular el total
    const precioTotal = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(precioTotal);
  }, []);

  // Formatear el monto a CLP
  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto);
  };

  // Datos para la transferencia
  const datosTransferencia = [
    { label: 'Banco', value: 'Banco Ficticio' },
    { label: 'Tipo de cuenta', value: 'Cuenta corriente' },
    { label: 'Número de cuenta', value: '123456789' },
    { label: 'RUT', value: '12.345.678-9' },
    { label: 'A nombre de', value: 'Tienda Ficticia' },
    { label: 'Email', value: 'contacto@tiendaficticia.com' },
    { label: 'Monto', value: formatearMonto(total) },
  ];

  // Columnas para la tabla de transferencia
  const columns = [
    {
      title: 'Detalle',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Información',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  // URL del formulario de Google donde el usuario debe subir su comprobante
  const formularioGoogleUrl = "https://forms.gle/tu-enlace-de-formulario"; // Aquí va el enlace de tu formulario

  return (
    <div className="confirmarcompra-container">
      
        {/* Enlace para volver al carrito */}
        <div className="volver-tienda">
          <Link to="/carrito" className="volver-tienda-link">
            &larr; Volver al carrito
          </Link>
        </div>

        <h2 className="confirmarcompra-title">Confirmar Compra</h2>
      
      <div className="confirmacompra-contenido">
        <div className="instrucciones">
          <h3>Paso 1: Realizar Transferencia</h3>
          <Table
            dataSource={datosTransferencia}
            columns={columns}
            pagination={false}
            showHeader={false}
            rowKey="label"
          />

          <h3>Paso 2: Sube tu comprobante al siguiente formulario</h3>
          <p>Por favor, sube tu comprobante de transferencia al formulario de Google.</p>
          <Button
            type="primary"
            href={formularioGoogleUrl}
            target="_blank"
          >
            Ir al formulario
          </Button>

          <h3>Paso 3: Recibirás tu producto</h3>
          <p>
            En menos de 24 horas recibirás tu producto junto con las instrucciones de uso y un video demostrativo.
          </p>
        </div>

        {/* Resumen de los productos en el carrito */}
        <h3>Resumen de la compra</h3>
        {productosCarrito.length === 0 ? (
          <Text>No tienes productos en tu carrito.</Text>
        ) : (
          productosCarrito.map((producto) => (
            <Card key={producto.id_articulo} className="producto-resumen">
              <div className="producto-info">
                <Image src={producto.imagen} alt={producto.nombre} width={100} />
                <div className="producto-detalle">
                  <h4>{producto.nombre}</h4>
                  <p>Precio: {formatearMonto(producto.precio)}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                </div>
              </div>
              <Tag color="blue">{producto.grado}</Tag>
            </Card>
          ))
        )}

        <div className="total-compra">
          <h3>Total: {formatearMonto(total)}</h3>
        </div>

      </div>
    </div>
  );
};

export default ConfirmarCompraPage;
