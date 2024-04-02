const express = require("express");
const weatherRouter = express.Router();
const weatherApiController = require("../controllers/weatherApiController");

weatherRouter.get("/:query", weatherApiController.fetchWeatherData);

module.exports = weatherRouter;
