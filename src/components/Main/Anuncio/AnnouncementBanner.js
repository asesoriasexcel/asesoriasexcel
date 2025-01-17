import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import "./AnnouncementBanner.css";

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="banner">
        <span className="text">Descarga gratis nuestras <strong style={{fontWeight: '600' }}>Planillas de Lanzamiento</strong><HiMiniRocketLaunch /></span>
        <button className="closeButton" onClick={handleClose}>
          <IoCloseOutline />
        </button>
      </div>
    )
  );
};

export default AnnouncementBanner;
