import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');

  useEffect(() => {
    const apikey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={handleCityChange} />
      <div>
        <h2>{weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherApp;