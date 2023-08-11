import React from "react";
import DailyContainer from "../DailyContainer/DailyContainer";
import WeeklyContainerCSS from "./WeeklyContainer.module.css";

const WeeklyContainer = ({ weeklyWeatherData, dateData }) => {
  if (!weeklyWeatherData) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className={WeeklyContainerCSS.weeklyContainer}>
        {weeklyWeatherData.map((day, index) => (
          <DailyContainer
            key={index}
            dayOfWeek={dateData[index].dayOfWeek}
            month={dateData[index].month}
            dayNum={dateData[index].day}
            year={dateData[index].year}
            temp={day.main.temp}
            dateData={dateData}
            description={day.weather[0].description}
            windSpeed={day.wind.speed}
            pressure={day.main.pressure}
            humidity={day.main.humidity}
          />
        ))}
        {/* {console.log(weeklyWeatherData)} */}
      </div>
    );
  }
};

export default WeeklyContainer;
// console.log(forecast.main.temp) //Avg Temp //
// console.log(forecast.main.feels_like) //Feels Like //
// console.log(forecast.main.pressure), //
// console.log(forecast.main.humidity), //
// console.log(forecast.weather[0].description), //
// console.log(forecast.wind.speed)
// Daily Weather
// dayOfWeek: Monday |
// date: June 10, 2023 | {month, day , , year} | .
// avgTemp: 77 | . | .main.temp
// feelsLike: | . | .main.feels_like
// pressure | . | .main.pressure
// humidity | . | .main.humidity
// Description: scattered clouds | currentWeatherData.weather[0].description | forecastData[0].weather[0].description
// windSpeed: | .wind.speed | .wind.speed
