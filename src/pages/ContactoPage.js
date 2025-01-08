import React from 'react';
import { IoMdSend } from "react-icons/io";
import './ContactoPage.css';

const ContactoPage = () => {
  return (
    <section className="contacto-section">
      <div className="centered-content">
        <span>
          <IoMdSend />
          <h2 className="contacto-title">Contacto</h2>
        </span>
        <p>Por favor, completa el formulario de abajo para ponerte en contacto con nosotros.</p>

        {/* Formulario de Google */}
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdB2nd0UMKTPVVTmJH0bwMCBP6mRl-Zw0d7BjBp0arl2xP6HQ/viewform?embedded=true"
          width="100%"
          height="1000"
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
