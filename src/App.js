import AppCSS from "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Contain from "./components/Contain/Contain";
function App() {
  const [browserData, setBrowserData] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [dateData, setDateData] = useState();
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState(undefined);
  useEffect(() => {
    getDateInfo();
    getCoordinates();
  }, []);
  useEffect(() => {
    getLocation();
    getWeather();
  }, [browserData.latitude]);

  const getLocation = async () => {
    if (browserData.latitude & browserData.longitude) {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${browserData.latitude},${browserData.longitude}&key=${process.env.GOOGLE_KEY}&result_type=locality`
      );
      const [city, state] = [
        `${res.data.results[0].address_components[0].long_name},`,
        res.data.results[0].address_components[2].short_name,
      ];
      setLocationData((prev) => [city, state]);
    }
  };
  const getDateInfo = () => {
    console.log("Running getDateInfo");
    const day = new Date();
    // const today = new Date();
    const findDayOfWeek = (num) => {
      const week = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return week[num];
    };
    const findMonth = (num) => {
      const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Nov",
        "Dec",
      ];
      return month[num];
    };
    const weekDateInfo = [];
    for (let i = 0; i < 5; i++) {
      let day = new Date();
      day.setDate(day.getDate() + i);
      weekDateInfo.push({
        month: findMonth(day.getMonth()),
        day: day.getDate(),
        year: day.getFullYear(),
        dayOfWeek: findDayOfWeek(day.getDay()),
      });
    }
    setDateData(weekDateInfo);
  };
  const getCoordinates = () => {
    // Get Coordinates
    if (navigator.geolocation) {
      // Request user's current location | Retruns a promise.
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // IF SUCCESS:
          //Get the latitude and longitude
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Save to State
          setBrowserData((prev) => ({
            ...prev,
            latitude: latitude.toFixed(2),
            longitude: longitude.toFixed(2),
          }));
        },
        (error) => {
          // IF ERROR:
          console.log(`ERROR(${error.code}): ${error.message}`);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  const getWeather = async () => {
    if (browserData.latitude & browserData.longitude) {
      let curr = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${browserData.latitude}&lon=${browserData.longitude}&appid=${process.env.WEATHER_KEY}&units=imperial`
      );
      let ffore = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${browserData.latitude}&lon=${browserData.longitude}&appid=${process.env.WEATHER_KEY}&units=imperial`
      );
      let nextFourDays = [
        ffore.data.list[3],
        ffore.data.list[11],
        ffore.data.list[19],
        ffore.data.list[27],
      ];
      let array = [curr.data, ...nextFourDays];
      setWeeklyWeatherData(array);
    }
  };

  return (
    <div className="container">
      <Contain
        title="weatherwise"
        locationData={locationData}
        weeklyWeatherData={weeklyWeatherData}
        dateData={dateData}
      />
    </div>
  );
}
export default App;
