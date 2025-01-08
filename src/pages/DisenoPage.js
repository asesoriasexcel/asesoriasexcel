import React from 'react';
import './ContactoPage.css';

const DisenoPage = () => {
  return (
    <section className="contacto-section">
      <div className="centered-content">
        <h2 className="contacto-title">Diseño y Personalización</h2>
        <p></p>

        {/* Formulario de Google */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdn3xdlG99JNKTxJ4c52U1zt3zIuEj1t63f_Z4DbzMwr5QO4w/viewform?embedded=true"
          width="100%"
          height="2000"
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
