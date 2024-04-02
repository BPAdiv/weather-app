// Function to filter the weather data and extract relevant information
function filterWeatherData(data) {
  const { location, current, forecast } = data;

  const currentTemp = current.temp_c;
  const condition = current.condition.text;
  const hourlyData = extractHourlyData(forecast.forecastday);
  const date = location.localtime.replace(/-/g, "/").replace(" ", " at ");
  const city = location.name;
  const country = location.country;
  const lat = location.lat;
  const lon = location.lon;
  const weatherElements = {
    humidity: current.humidity,
    precipitation: current.precip_mm,
    wind: current.wind_kph,
  };

  return {
    currentTemp,
    condition,
    city,
    country,
    lat,
    lon,
    ...weatherElements,
    hourlyData,
    date,
  };
}

//Function to extract hourly forecast data
function extractHourlyData(forecastData) {
  const extractedData = [];
  const currentTime = Date.now() / 1000;
  if (forecastData && forecastData.length > 0) {
    forecastData.forEach((day) => {
      if (extractedData.length >= 5) return;

      day.hour.forEach((hour) => {
        if (hour.time_epoch < currentTime || extractedData.length >= 5) return;

        const time = hour.time.split(" ")[1];
        extractedData.push({
          time,
          temp_c: hour.temp_c,
        });
      });
    });
  }
  // exampledata 5 max [
  //   { time: '16:00', temp_c: 23.9 },
  //   { time: '17:00', temp_c: 23.2 },
  //   { time: '18:00', temp_c: 23 },
  //   { time: '19:00', temp_c: 22.5 },
  //   { time: '20:00', temp_c: 22.2 }
  // ]
  return extractedData;
}
module.exports = {
  filterWeatherData,
  extractHourlyData,
};
