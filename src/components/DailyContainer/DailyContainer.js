import React from "react";
import DayInfo from "./DayInfo/DayInfo";
import TempInfo from "./TempInfo/TempInfo";
import AdditionalInfoContainer from "./AdditionalInfoContainer/AdditionalInfoContainer";
import DailyContainerCSS from "./DailyContainer.module.css";
const DailyContainer = ({
  dayOfWeek,
  month,
  dayNum,
  year,
  windSpeed,
  pressure,
  humidity,
  temp,
  description,
}) => {
  return (
    <div className={DailyContainerCSS.dailyContainer}>
      <div className={DailyContainerCSS.contentContainer}>
        <DayInfo day={dayOfWeek} fullDate={`${month}, ${dayNum}, ${year}`} />
        <TempInfo temp={temp.toFixed(0)} description={description} />
        <AdditionalInfoContainer
          windSpeed={windSpeed}
          pressure={pressure / 33.8639}
          humidity={humidity}
        />
      </div>
    </div>
  );
};

export default DailyContainer;
