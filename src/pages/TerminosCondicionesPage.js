import React from 'react';
import './TerminosCondicionesPage.css';

const TerminosCondicionesPage = () => {
  return (
    <section className="terminos-section">
      <div className="centered-content">
        <h1 className="terminos-title">Términos y Condiciones</h1>

        <div className="terminos-content">
          {/* Introducción */}
          <h2>1. Introducción</h2>
          <p>
            Bienvenido a AsesoríasExcel. Al adquirir nuestros productos o utilizar nuestros servicios, aceptas estar sujeto a los siguientes Términos y Condiciones. Te recomendamos leerlos detenidamente antes de realizar una compra.
          </p>

          {/* Uso del Producto */}
          <h2>2. Uso de los Productos</h2>
          <p>
            Nuestras planillas están diseñadas para funcionar exclusivamente en Excel para Windows, versión 2010 en adelante, y están optimizadas para computadores de escritorio o laptops. No garantizamos el correcto funcionamiento en dispositivos móviles, sistemas operativos diferentes a Windows, o versiones de Office anteriores a 2010.
          </p>
          <p>
            Además, cada planilla incluye una llave de uso que permite activarla únicamente en un máximo de 2 computadores. El uso no autorizado o la distribución de la llave está estrictamente prohibido.
          </p>

          {/* Proceso de Compra */}
          <h2>3. Proceso de Compra</h2>
          <p>
            Para realizar una compra, deberás completar el pedido en nuestro sitio web. Actualmente, aceptamos únicamente transferencias electrónicas. Una vez confirmado el pago, recibirás el producto en tu correo electrónico dentro de un plazo máximo de 24 horas, junto con una guía de uso y un video explicativo.
          </p>

          {/* Política de Reembolsos */}
          <h2>4. Cambios y Devoluciones</h2>
          <p>
            Al tratarse de archivos digitales, no aceptamos cambios ni devoluciones. Por este motivo, te invitamos a revisar detalladamente la ficha del producto y el video explicativo antes de realizar la compra. Si tienes dudas, contáctanos para recibir orientación personalizada.
          </p>

          {/* Personalización */}
          <h2>5. Diseño y Personalización</h2>
          <p>
            Si necesitas un producto con características específicas, puedes solicitar un diseño personalizado en nuestra sección de Diseño y Personalización. Este servicio tiene un costo adicional y está sujeto a nuestras políticas de tiempo y entrega.
          </p>

          {/* Propiedad Intelectual */}
          <h2>6. Propiedad Intelectual</h2>
          <p>
            Todos los productos, contenidos, y herramientas desarrolladas por AsesoríasExcel están protegidos por derechos de autor. Está estrictamente prohibida la distribución, copia o modificación no autorizada de nuestras planillas.
          </p>

          {/* Limitación de Responsabilidad */}
          <h2>7. Limitación de Responsabilidad</h2>
          <p>
            No nos hacemos responsables por el uso incorrecto de nuestras planillas ni por incompatibilidades técnicas derivadas de su uso en sistemas no especificados en estos términos. El cliente es responsable de asegurarse de cumplir con los requisitos técnicos antes de la compra.
          </p>

          {/* Ley Aplicable */}
          <h2>8. Ley Aplicable</h2>
          <p>
            Estos Términos y Condiciones se rigen por las leyes vigentes en Chile. Cualquier disputa será resuelta en los tribunales de la jurisdicción correspondiente.
          </p>

          {/* Contacto */}
          <h2>9. Contacto</h2>
          <p>
            Para consultas adicionales, puedes escribirnos a nuestro correo electrónico: soporte@asesoriasexcel.com.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TerminosCondicionesPage;
