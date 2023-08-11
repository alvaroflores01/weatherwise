import React from 'react';
import DailyInfoCSS from './DayInfo.module.css'

const DayInfo = ({ day, fullDate }) => {
    return (
      <div className={DailyInfoCSS.dayInfo}>
        <h2>{day}</h2>
        <p>{fullDate}</p>
      </div>
    );
  };

  export default DayInfo;