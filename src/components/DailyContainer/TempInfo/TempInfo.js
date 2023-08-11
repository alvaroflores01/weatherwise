import React from 'react';
import TempInfoCSS from './TempInfo.module.css'

const TempInfo = ({ temp, description }) => {
    return (
      <div className={TempInfoCSS.tempInfo}>
        <h1>{temp}&deg;</h1>
        <h3>{description}</h3>
      </div>
    );
  };

  export default TempInfo;