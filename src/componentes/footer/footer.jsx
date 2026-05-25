import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <ul className="footer-links">
          <li><a href="#">Términos de uso</a></li>
          <li><a href="#">Política de privacidad</a></li>
          <li><a href="#">Contacto</a></li>

          <li className="footer-social-wrapper">
            <span>Síguenos en nuestras redes:</span>
            <div className='footer-social'>
              <span className="social-icon"><FaInstagram /></span>
              <span className="social-icon"><FaFacebookF /></span>
              <span className="social-icon"><FaWhatsapp /></span>
            </div>
          </li>
        </ul>

         <div className="footer-logo">
          <p>© 2024 FitTrack. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
