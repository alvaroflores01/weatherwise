import React from 'react';
import TitleCSS from './TitleContainer.module.css';
const TitleContainer = ({ title }) => {
    return (
      <div className={TitleCSS.titleContainer}>
        <h1 className={TitleCSS.titleText}>{title}</h1>
      </div>
    );
  };

export default TitleContainer;