import fetch from "node-fetch";
import keys from "./sources/keys.js";
import express from "express";

const app = express();
app.use(express.json());

const cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const path = {
  root: "/",
  weather: "/weather",
};

app.get(path.root, (req, res) => {
  res.send("hello from backend to frontend");
});

app.post(path.weather, async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const cityData = await fetch(
      `${cityUrl}${cityName}&limit=1&appid=${keys.API_KEY}`,
    );

    const jsonData = await cityData.json(); //destruct to object from array
    if (jsonData.length === 0) {
      return res.status(404).send({ weatherText: `${cityName} is not found` });
    }
    const response = await fetch(
      `${weatherUrl}?lat=${jsonData[0].lat}&lon=${jsonData[0].lon}&units=metric&appid=${keys.API_KEY}`,
    );
    const weatherData = await response.json();
    res.send({ weatherText: `${cityName} ${weatherData.main.temp} C` });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server doesn't respond");
  }
});
export default app;
