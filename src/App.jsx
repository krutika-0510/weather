import "./App.css";
import { useState, useEffect } from "react";
import search_icon from "./assets/search.png";
import rain_icon from "./assets/rain.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";

const getWeatherData = async (BASE_URL) => {
  let response = await fetch(BASE_URL);
  let data = await response.json();
  return data;
};

const getIcon = (data) => {
  switch (data.weather[0].main.toLowerCase()) {
    case "rain":
      return rain_icon;
    case "clear":
      return clear_icon;
    case "clouds":
      return cloud_icon;
    case "drizzle":
      return drizzle_icon;
    case "snow":
      return snow_icon;
    case "thunderstorm":
      return thunderstorm_icon;
    case "haze":
      return haze_icon;
    case "mist":
      return mist_icon;
    case "smoke":
      return smoke_icon;
    case "dust":
      return dust_icon;
    case "fog":
      return fog_icon;
    default:
      return clear_icon;
  }
};

function App() {
  const [location, setLocation] = useState("Mumbai");
  const [data, setData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(clear_icon);

  const API_KEY = "c7471004da87129dcdfa241aa2cc1472";
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  useEffect(() => {
    getWeatherData(BASE_URL).then((data) => {
      setData(data);
      console.log(data);
      let icon = getIcon(data);
      setWeatherIcon(icon);
    });
  }, [location]);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          id=""
          placeholder="Search"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <img src={search_icon} alt="search" />
      </div>
      <div className="align">
        <img src={weatherIcon} alt="clear" className="weather-icon" />
        <div className="content">
          <p className="temperature">
            {data.main?.temp ? Math.round(data.main?.temp - 273.15) : ".."}
          </p>
          <p className="location">{data.name}</p>
        </div>
      </div>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{data.main?.humidity ? data.main?.humidity : "..."}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div>
            <p>{data.wind?.speed ? data.wind?.speed : "..."}Km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;