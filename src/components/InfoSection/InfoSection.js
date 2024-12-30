// InfoSection.js
import React from 'react';
import './InfoSection.css';
import { FaHandshakeSimple } from "react-icons/fa6";
import Grid from './Grid.js';

const InfoSection = () => {
  return (
    <section className="info-section seccion">
      <div className="centered-content">
        <div className="seccion-encabezado">
          <div className="header-centrado">
            <div className="icon-title"><FaHandshakeSimple /></div>
            <h2>
              <span>Simplify Your Work with</span>
              <span className="destacado">Our Standout Features</span>
            </h2>
            <p>Enhance your business processes and maximize efficiency with our enterprise-grade solutions.</p>
          </div>
        </div>
      
        <Grid />
        
      </div>
    </section>
  );
};

export default InfoSection;
