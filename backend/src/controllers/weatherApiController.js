const axios = require("axios");
const apiKey = process.env.WEATHER_API_KEY;
const { filterWeatherData } = require("../utils/weatherHandler.js");
const fetchWeatherData = async (req, res) => {
  try {
    const { query } = req.params;
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=2&aqi=no&alerts=no`
    );

    const weatherData = filterWeatherData(data);
    res.status(200).json({ data: weatherData, message: "success" });
  } catch (error) {
    if (error.response?.status === 400) {
      return res.status(400).json({ message: "No location found" });
    }
    res.status(500).json({ error, message: "NetworkError" });
  }
};

module.exports = {
  fetchWeatherData,
};
