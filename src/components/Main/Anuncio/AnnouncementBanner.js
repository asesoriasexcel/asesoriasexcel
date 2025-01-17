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
        <div>.</div>
        <span className="text">Planillas Gratis de Lanzamiento<HiMiniRocketLaunch /></span>
        <button className="closeButton" onClick={handleClose}>
          <IoCloseOutline />
        </button>
      </div>
    )
  );
};

export default AnnouncementBanner;
