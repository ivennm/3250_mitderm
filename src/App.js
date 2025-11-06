import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import CloudBackground from "./components/CloudBackground";


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "89142eeb3c61bbd97e88041eb1939cc6"; 

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Try again.");
      setWeather(null);
    }
  };

  return (
  <div className="app">
    {/* Cloud background behind everything */}
    <CloudBackground />
    <div clas="joke">
      <h2>jokes:</h2>
    </div>
    {/* Main content (on top of clouds) */}
    <div className="content">
      <h1>🌤️ Weather</h1>

      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  </div>
);

}

export default App;
