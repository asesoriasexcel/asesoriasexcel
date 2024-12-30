// Grid.js
import React from 'react';
import './Grid.css';
import { cardInfo } from '../../data/infoseccion';

const Grid = () => {
  return (
    <section className="grid-section">
      <div className="grid">
        {cardInfo.map((card, index) => (
          <div className="grid-card" key={index}>
            <div className="icon">{<card.icon />}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Grid;
