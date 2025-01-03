import React from 'react'; 
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
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
          <span className="footer-subtitle">Soluciones precisas, en Excel y otras tecnologías.</span>
          <span>Síguenos</span>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61566069431755&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="footer-facebook" />
            </a>
            <a href="https://www.youtube.com/@aloasesoriasexcel" target="_blank" rel="noopener noreferrer">
              <GrYoutube className="footer-youtube" />
            </a>
            <a href="https://www.instagram.com/aloasesoriasexcel" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="footer-instagram" />
            </a>
            <a href="https://www.tiktok.com/@aloasesoriasexcel1" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="footer-tiktok" />
            </a>
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
