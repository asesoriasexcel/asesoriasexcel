import React, { useEffect } from 'react';
import './ContactoPage.css'; // Asegúrate de tener estos estilos en el archivo CSS correspondiente

const DisenoPage = () => {
  useEffect(() => {
    // Seleccionar el div con el id "main-menu"
    const targetElement = document.getElementById('main-menu');

    // Realizar el scroll hacia el elemento encontrado de manera instantánea
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'auto' }); // 'auto' hace que el scroll sea instantáneo
    }
  }, []); // El array vacío asegura que se ejecute una sola vez después de que el componente se renderice

  return (
    <section className="contacto-section">
      <div className="centered-content">
        <h2 className="contacto-title">Diseño y Personalización</h2>
        <p></p>

        {/* Formulario de Google */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdn3xdlG99JNKTxJ4c52U1zt3zIuEj1t63f_Z4DbzMwr5QO4w/viewform?embedded=true"
          width="100%"
          height="2400"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Formulario de Contacto"
          className='iframe-contacto'
        >
          Cargando…
        </iframe>
      </div>
    </section>
  );
};

export default DisenoPage;
