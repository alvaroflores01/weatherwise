import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [browserData, setBrowserData] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastData, setForecastData] = useState({});
  useEffect(() => {
    getDateInfo();
    getCoordinates();
  }, []);
  useEffect(() => {
    getLocation();
    getWeather();
  }, [browserData.latitude]);

  const getLocation = () => {
    if (browserData.latitude & browserData.longitude) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${browserData.latitude},${browserData.longitude}&key=AIzaSyDJGuxZPfDtp1Y7QIBftDGvcqK0jkbyJsc&result_type=locality`
        )
        .then((res) => {
          const [city, state] =
            //city , state
            [
              res.data.results[0].address_components[0].long_name,
              res.data.results[0].address_components[2].short_name,
            ];
          console.log(city);
          setBrowserData((prev) => ({
            ...prev,
            location: { city: city, state: state },
          }));
        });
    }
  };
  const getDateInfo = () => {
    const today = new Date();
    const [month, day, year] = [
      today.getMonth(),
      today.getDate(),
      today.getFullYear(),
    ];
    const [hour, minute] = [today.getHours(), today.getMinutes()];
    setBrowserData((prev) => ({
      ...prev,
      date: { month: month, day: day, year: year },
      time: { hour: hour, minute: minute },
    }));
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
          console.log(`Your current location is: ${latitude}, ${longitude}`);
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
  const getWeather = () => {
    if (browserData.latitude & browserData.longitude) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${browserData.latitude}&lon=${browserData.longitude}&appid=55d07e64f55f6f12c5970c5780354a90&units=imperial`
        )
        .then((res) => {
          console.log("running");
          setCurrentWeather(res.data);
        });
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${browserData.latitude}&lon=${browserData.longitude}&appid=55d07e64f55f6f12c5970c5780354a90&units=imperial`
        )
        .then((res) => {
          const forecastData = res.data.list;
          let nextFourDays = [
            forecastData[3],
            forecastData[11],
            forecastData[19],
            forecastData[27],
          ];
          setForecastData(nextFourDays);
        });
    }
  };
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
export default App;
