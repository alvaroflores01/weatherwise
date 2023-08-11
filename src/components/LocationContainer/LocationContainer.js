import React from "react";
import LocationContainerCSS from "./LocationContainer.module.css";

const LocationContainer = ({ locationData }) => {
  return (
    <div className={LocationContainerCSS.styles}>
      <h1>
        {locationData[0]} {locationData[1]}
      </h1>
    </div>
  );
};

export default LocationContainer;
