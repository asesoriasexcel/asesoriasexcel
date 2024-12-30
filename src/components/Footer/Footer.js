import React from 'react';
import './Footer.css';
import { FaFacebookF } from "react-icons/fa6";
import { GrYoutube } from "react-icons/gr";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Columna 1 */}
        <div className="footer-column">
          <span className="footer-title">
            <span className="footer-title_a">Asesorias</span>
            <span className="footer-title_b">Excel</span>
          </span>
          <span className="footer-subtitle">No solo lo que necesitas, lo mejor.</span>
          <span>Síguenos</span>
          <div className="social-icons">
            <FaFacebookF className="footer-facebook" />
            <GrYoutube className="footer-youtube" />
          </div>
          <span className="copyright">Copyright Asesorias Excel 2024. Todos los derechos reservados.</span>
        </div>

        {/* Columna 2 */}
        <div className="footer-column">
          <span className="footer-title important">IMPORTANTE</span>
          <span>Términos y Condiciones</span>
        </div>

        {/* Columna 3 */}
        <div className="footer-column">
          <span className="footer-title contact">Contáctanos</span>
          <span id="mail">
            <IoIosMail className='footer-mail' />
            asesoriasexcel@gmail.com
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
