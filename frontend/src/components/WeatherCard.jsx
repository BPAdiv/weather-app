import React from "react";
import "../style/weatherCard.css";
function WeatherCard({ isLoading, weatherData, isError }) {
  return (
    <div className="weather-card-wrapper">
      <div className="weather-card">
        {isError.status && isError.status !== 400 ? (
          <div className="error-card-text">
            <h1>Couldnt load weather data... </h1>
            <span> pls try again later</span>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="loading-state">
                <h1>Fetching Weather Data...</h1>
              </div>
            ) : (
              <>
                <div className="time-zone">
                  <span className="location-city">{weatherData.city} </span>
                  <span className="location-country">
                    {weatherData.country}{" "}
                  </span>
                  <span className="location-time">{weatherData.date} </span>
                </div>
                <div className="current-degrees-wrapper">
                  <h1 className="current-degrees">
                    {weatherData.currentTemp}&deg;
                  </h1>
                  <span className="current-condition">
                    {weatherData.condition}
                  </span>
                </div>
                <div className=" weather-elements-wrapper">
                  <div className=" weather-element">
                    <span className=" element-heading">precipitation</span>
                    <span className=" element-value">
                      {weatherData.precipitation} mm{" "}
                    </span>
                  </div>
                  <div className=" weather-element">
                    <span className=" element-heading">humidiy</span>
                    <span className=" element-value">
                      {weatherData.humidity}%
                    </span>
                  </div>
                  <div className=" weather-element">
                    <span className=" element-heading">wind</span>
                    <span className=" element-value">
                      {weatherData.wind} km/h
                    </span>
                  </div>
                </div>
                <div className="weather-forcaste-wrapper">
                  {weatherData.hourlyData?.map((hour, i) => (
                    <div key={i} className="weather-forcaste">
                      <span className="forcaste-time">{hour.time}</span>
                      <span className="forcaste-degrees">
                        {hour.temp_c}&deg;
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
