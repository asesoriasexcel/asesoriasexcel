import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Card, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import tiendaProductos from '../data/tiendaProductos';
import './ConfirmarCompraPage.css';

const { Title, Text, Paragraph } = Typography;

const ConfirmarCompraPage = () => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('ae-carrito')) || [];

    const productos = carrito
      .map((item) => {
        const producto = tiendaProductos.find(p => p.id_articulo === item.id_articulo);
        if (producto) {
          return { ...producto, cantidad: item.cantidad };
        }
        return null;
      })
      .filter(item => item !== null);

    setProductosCarrito(productos);

    const precioTotal = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(precioTotal);
  }, []);

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(monto);
  };

  const datosTransferencia = [
    { label: 'Banco', value: 'Banco Ficticio' },
    { label: 'Tipo de cuenta', value: 'Cuenta corriente' },
    { label: 'Número de cuenta', value: '123456789' },
    { label: 'RUT', value: '12.345.678-9' },
    { label: 'A nombre de', value: 'Tienda Ficticia' },
    { label: 'Email', value: 'contacto@tiendaficticia.com' },
    { label: 'Monto', value: formatearMonto(total) },
  ];

  // Función para copiar al portapapeles
  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto)
      .then(() => {
        message.success('Copiado al portapapeles');
      })
      .catch(() => {
        message.error('Error al copiar al portapapeles');
      });
  };

  const columns = [
    {
      title: 'Detalle',
      dataIndex: 'label',
      key: 'label',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Información',
      dataIndex: 'value',
      key: 'value',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>{text}</Text>
          {['Número de cuenta', 'RUT', 'A nombre de', 'Email', 'Monto'].includes(record.label) && (
            <Button
              type="text"
              icon={<CopyOutlined />}
              onClick={() => copiarAlPortapapeles(text)}
            />
          )}
        </div>
      ),
    },
  ];

  const formularioGoogleUrl = "https://forms.gle/tu-enlace-de-formulario";

  return (
    <div className="confirmar-compra-container">
      {/* Enlace para volver al carrito */}
      <div className="volver-tienda">
        <Link to="/carrito" className="volver-tienda-link">
          &larr; Volver al carrito
        </Link>
      </div>

      {/* Título */}
      <h2 className="carrito-title">Confirmar Compra</h2>

      {/* Contenido principal */}
      <div className="confirmacompra-contenido">
        {/* Paso 1: Transferencia */}
        <Card className="confirmacompra-card" title="Paso 1: Realiza el pago" bordered>
          <Table
            dataSource={datosTransferencia}
            columns={columns}
            pagination={false}
            showHeader={false}
            rowKey="label"
          />
        </Card>

        {/* Paso 2: Subir comprobante */}
        <Card className="confirmacompra-card" title="Paso 2: Sube tu comprobante al formulario para recibir tu producto" bordered>
          <Paragraph>
            Por favor, sube tu comprobante de transferencia al formulario de Google para completar tu compra.
          </Paragraph>
          <Button
            type="primary"
            href={formularioGoogleUrl}
            target="_blank"
            className='confirmacompraform btn-azul'
            block
          >
            Ir al formulario
          </Button>
        </Card>

        {/* Paso 3: Confirmación */}
        <Card className="confirmacompra-card" title="Paso 3: Recibirás tu producto" bordered>
          <Paragraph>
            En aproximadamente <Text strong>1 hora</Text>, recibirás tu producto junto con las instrucciones de uso y un video demostrativo.
          </Paragraph>
        </Card>
        <div>.</div>
      </div>
    </div>
  );
};

export default ConfirmarCompraPage;
