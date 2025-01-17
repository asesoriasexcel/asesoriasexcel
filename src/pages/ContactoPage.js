import React, { useEffect } from 'react';
import './ContactoPage.css'; // Asegúrate de tener estos estilos en el archivo CSS correspondiente

const ContactoPage = () => {
  useEffect(() => {
    // Seleccionar el div con el id "main-menu"
    const targetElement = document.getElementById('main-menu');

    // Realizar el scroll hacia el elemento encontrado, si existe
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []); // El array vacío asegura que se ejecute una sola vez después de que el componente se renderice

  return (
    <section className="contacto-section">
      <div className="centered-content">
        <h2 className="contacto-title">Contacto</h2>
        <p>Por favor, completa el formulario de abajo para ponerte en contacto con nosotros.</p>
        {/* Formulario de Google */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdB2nd0UMKTPVVTmJH0bwMCBP6mRl-Zw0d7BjBp0arl2xP6HQ/viewform?embedded=true"
          width="100%"
          height="1100"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Formulario de Contacto"
        >
          Cargando…
        </iframe>
      </div>
    </section>
  );
};

export default ContactoPage;
