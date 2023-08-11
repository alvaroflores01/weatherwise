import React from "react";
import AdditionalInfoContainerCSS from "./AdditionalInfoContainer.module.css";

const AdditionalInfoContainer = ({ windSpeed, pressure, humidity }) => {
  return (
    <div className={AdditionalInfoContainerCSS.additionalInfoContainer}>
      <div className={AdditionalInfoContainerCSS.infoContainer}>
        <h3>Wind Speed:</h3>
        <h4>{windSpeed} mph</h4>
      </div>
      <div className={AdditionalInfoContainerCSS.infoContainer}>
        <h3>Pressure:</h3>
        <h4>{pressure.toFixed(1)} in Hg</h4>
      </div>
      <div className={AdditionalInfoContainerCSS.infoContainer}>
        <h3>Humidity:</h3>
        <h4>{humidity}%</h4>
      </div>
    </div>
  );
};

export default AdditionalInfoContainer;
