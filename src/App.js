import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CloudBackground from "./components/CloudBackground";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [joke, setJoke] = useState("");

  const API_KEY = "89142eeb3c61bbd97e88041eb1939cc6";

  const jokes = [
    "Why did the cloud stay home? It was feeling under the weather.",
    "What does a cloud wear under its raincoat? Thunderwear.",
    "Why don’t meteorologists like spicy food? Too much heat index.",
    "Why did the sun go to school? To get a little brighter.",
    "Why did the tornado break up with the hurricane? It needed some space.",
    "What did one raindrop say to the other? Two’s company, three’s a cloud.",
    "Why did the snowman call his dog Frost? Because Frost bites.",
    "What’s a tornado’s favorite game? Twister.",
    "Why don’t mountains get cold? They wear snow caps.",
    "Why did the weather report go to therapy? Too many pressure issues.",
    "How does a hurricane see? With its eye.",
    "Why was the cloud such a good listener? It never rained on anyone’s parade.",
    "What’s a tornado’s favorite dessert? Funnel cake.",
    "Why don’t clouds need to shave? They have thunder razors.",
    "Why did the lightning bolt break up with the thunder? It needed a little spark.",
    "What do you call dangerous precipitation? A rain of terror.",
    "Why did the snowman take a vacation? To chill out.",
    "Why doesn't the sun go to college? It already has a million degrees.",
    "What do clouds do when they get rich? They make it rain.",
    "What did one lightning bolt say to the other? You're shocking.",
    "Why did the meteorologist bring a ladder to work? The forecast called for high pressure.",
    "Why did the rain drop? It didn’t want to thunder around.",
    "What’s a snowman’s favorite drink? Iced tea.",
    "Why did the hailstone get kicked out of school? It kept breaking things.",
    "How do you fix a broken weather vane? With a wind repair kit.",
    "Why did the wind get promoted? It blew everyone away.",
    "What does the sun do after work? It sets.",
    "Why was the cloud so polite? It always had a silver lining.",
    "What’s a rainstorm’s favorite band? The Rolling Thunder.",
    "What do you call a meteorologist who’s wrong? A regular meteorologist.",
    "Why did the snowflake start a company? It wanted to branch out.",
    "What do clouds use to test their speed? A rain gauge.",
    "Why do storms always know what to wear? They follow the forecast.",
    "Why was the thunder late? It got stuck in a sound delay.",
    "What’s a snowman’s favorite snack? Ice Krispies.",
    "Why did the sun sit down? It was a little light-headed.",
    "Why do clouds make terrible comedians? Their jokes are too dry.",
    "What did the fog say to the road? I’ll be seeing you.",
    "What do windy days and gossip have in common? Lots of blowing.",
    "Why did the lightning fail school? It didn’t conduct itself properly.",
    "Why are blizzards bad at math? Too many degrees below zero.",
    "What’s the sun’s favorite candy? Solar pops.",
    "Why did the raindrop hate falling? It never made a splash.",
    "Why don't hurricanes ever get lost? They always take the path of least resistance.",
    "What do you call a month with no rain? Dry-anuary.",
    "How does a cloud flirt? It gives a light sprinkle.",
    "Why did the rainbow apply for a job? It wanted to brighten the workplace.",
    "What’s the coldest type of story? A chilling tale.",
    "Why did the weather app go to the gym? To improve its core temperature."
  ];

  useEffect(() => {
    const random = Math.floor(Math.random() * jokes.length);
    setJoke(jokes[random]);
  }, []);

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch {
      setError("City not found. Try again.");
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <CloudBackground />

      <div className="joke">
        <h2>Joke of the Day:</h2>
        <p>{joke}</p>
      </div>

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
