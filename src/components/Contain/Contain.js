import React from "react";
import TitleContainer from "../TitleContainer/TitleContainer";
import WeeklyContainer from "../WeeklyContainer/WeeklyContainer";
import LocationContainer from "../LocationContainer/LocationContainer";
import ContainCSS from "./Contain.module.css";

const Contain = ({ title, weeklyWeatherData, locationData, dateData }) => {
  const weatherLoading = weeklyWeatherData === {};
  const locationLoading = locationData === [];

  return (
    <div className={ContainCSS.centeredContainer}>
      <TitleContainer title={title} />
      {weatherLoading || locationLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={ContainCSS.centeredContainer}>
          <WeeklyContainer
            weeklyWeatherData={weeklyWeatherData}
            dateData={dateData}
          />
          <LocationContainer locationData={locationData} />
        </div>
      )}
    </div>
  );
};

export default Contain;
