import React from 'react';
import referenciasData from '../../../data/referenciasData';  // Importamos los datos
import { FaQuoteLeft } from "react-icons/fa";
import './Referencias.css';

const Referencias = () => {
  // Dividir los datos en 3 columnas
  const primeraColumna = referenciasData.slice(0, 3); 
  const segundaColumna = referenciasData.slice(3, 8); 
  const terceraColumna = referenciasData.slice(8, 11); 

  return (
    <section className="referencias-section seccion">
      <div className="centered-content">
        
        <div className="seccion-encabezado">
          <div className="header-centrado">
            <div className="referencias-icon"><FaQuoteLeft /></div>
            <h2>Historias Reales, Resultados Reales Nuestros Clientes</h2>
            <p>Descubre cómo nuestras soluciones han transformado experiencias a través de testimonios auténticos de nuestros valiosos clientes.</p>
          </div>
        </div>

        <div className="referencias-rows">
          {/* Primera columna */}
          <div className="referencias-column">
            {primeraColumna.map((referencia) => (
              <div key={referencia.id} className="referencias-card">
                <div className="referencias-words">
                  <p>{referencia.quote}</p>
                </div>
                <div className="referencias-person">
                  <div className="referencias-avatar">
                    <img src={referencia.avatar} alt={referencia.name} className="avatar-image" />
                  </div>
                  <div className="referencias-info">
                    <div className="referencias-name">{referencia.name}</div>
                    <div className="referencias-job">{referencia.job}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Segunda columna */}
          <div className="referencias-column">
            {/* Primera tarjeta que ocupa el ancho de las dos columnas */}
            <div className="referencias-card">
              <div className="referencias-words">
                <p>{segundaColumna[0].quote}</p>
              </div>
              <div className="referencias-person">
                <div className="referencias-avatar">
                  <img src={segundaColumna[0].avatar} alt={segundaColumna[0].name} className="avatar-image" />
                </div>
                <div className="referencias-info">
                  <div className="referencias-name">{segundaColumna[0].name}</div>
                  <div className="referencias-job">{segundaColumna[0].job}</div>
                </div>
              </div>
            </div>

            {/* Dividir el espacio restante en dos columnas para las siguientes tarjetas */}
            <div className="referencias-column-2">
              {segundaColumna.slice(1).map((referencia) => (
                <div key={referencia.id} className="referencias-card">
                  <div className="referencias-words">
                    <p>{referencia.quote}</p>
                  </div>
                  <div className="referencias-person">
                    <div className="referencias-avatar">
                      <img src={referencia.avatar} alt={referencia.name} className="avatar-image" />
                    </div>
                    <div className="referencias-info">
                      <div className="referencias-name">{referencia.name}</div>
                      <div className="referencias-job">{referencia.job}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tercera columna */}
          <div className="referencias-column">
            {terceraColumna.map((referencia) => (
              <div key={referencia.id} className="referencias-card">
                <div className="referencias-words">
                  <p>{referencia.quote}</p>
                </div>
                <div className="referencias-person">
                  <div className="referencias-avatar">
                    <img src={referencia.avatar} alt={referencia.name} className="avatar-image" />
                  </div>
                  <div className="referencias-info">
                    <div className="referencias-name">{referencia.name}</div>
                    <div className="referencias-job">{referencia.job}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Referencias;
