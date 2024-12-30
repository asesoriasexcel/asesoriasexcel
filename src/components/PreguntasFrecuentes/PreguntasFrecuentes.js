// PreguntasFrecuentes.js
import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { FaHandshakeSimple } from "react-icons/fa6";
import './PreguntasFrecuentes.css';

const PreguntasFrecuentes = () => {
  return (
    <section className="preguntas-section">
      <div className="centered-content">
        <div className="icon-title"><FaHandshakeSimple /></div>
        <h2>¿Es tu primera vez?</h2>
        <p>¡Si tienes dudas, aquí las resolvemos!</p>
        
        <Accordion>
          <AccordionTab header="¿Qué es AsesoríasExcel?">
            <p>Somos un equipo chileno experto en crear herramientas avanzadas en Excel. Nuestras planillas están diseñadas para facilitar procesos, especialmente en educación, con funcionalidades inteligentes y confiables</p>
          </AccordionTab>
        </Accordion>
        <Accordion>
          <AccordionTab header="¿Cómo funciona la compra?">
            <p>Compras el producto en nuestra web, y en menos de 24 horas lo enviamos a tu correo junto con una guía y un video explicativo para que lo uses fácilmente</p>
          </AccordionTab> 
        </Accordion>
        <Accordion>
          <AccordionTab header="¿Cómo puedo comprar?">
            <p>Por ahora, solo aceptamos transferencias electrónicas. Al finalizar la compra te daremos los datos necesarios para completar tu pedido</p>
          </AccordionTab>
        </Accordion>
        <Accordion>
          <AccordionTab header="¿Puedo pedir un cambio o devolución?">
            <p>Al ser archivos digitales, no aceptamos cambios ni devoluciones. Por eso, revisa bien la ficha del producto y contáctanos si tienes dudas antes de comprar.</p>
          </AccordionTab>
        </Accordion>
        <Accordion>
          <AccordionTab header="¿Qué pasa si no me sirve el producto?">
            <p>Puedes revisar el video explicativo antes de comprar. Si necesitas algo especial, puedes solicitar un diseño personalizado en nuestra sección de Diseño y Personalización.</p>
          </AccordionTab>
        </Accordion>
        
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;
