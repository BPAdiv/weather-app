import { useEffect, useState } from "react";
import axios from "axios";
import "../style/weatherPage.css";
import WeatherCard from "./WeatherCard";
import SearchForm from "./SearchForm";

function WeatherPage() {
  // weatherData should look like = {
  //   condition: "Partly cloudy",
  //   country: "United Kingdom",
  //   currentTemp: 11,
  //   hourlyData: [
  //     { time: " 19:00", temp_c: 10.9 },
  //     { time: " 20:00", temp_c: 10.4 },
  //     { time: " 21:00", temp_c: 10.3 },
  //     { time: " 22:00", temp_c: 9.9 },
  //     { time: " 23:00", temp_c: 9.6 },
  //   ],
  //   humidity: 82,
  //   lat: 51.52,
  //   lon: -0.11,
  //   name: "London",
  //   precipitation: 0.02,
  //   wind: 20.2,
  //   date: "1/4/2024 at 08:00",
  // };

  const [isError, setIsError] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchWeatherData = async (searchInput) => {
    setIsLoading(true);
    setIsError({});
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/weather/${searchInput}`
      );
      console.log(data);
      setWeatherData({ ...data.data });
    } catch (error) {
      console.log(error);

      setIsError({
        status: error.response?.status || 500,
        text: error.response?.data.message || "Network error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Tel Aviv");
  }, []);

  return (
    <main>
      <div className="weather-container">
        <div className="left-section">
          <div className="logo-wrapper">
            <img
              className="logo"
              src="https://static.wixstatic.com/media/348bae_e720e7f021484661ad942468da4e7f46~mv2.png/v1/fit/w_2500,h_1330,al_c/348bae_e720e7f021484661ad942468da4e7f46~mv2.png"
              alt="Fintek Logo"
            />
          </div>
          <div className="left-content">
            <SearchForm fetchWeatherData={fetchWeatherData} isError={isError} />
            <div className="location-info">
              <div className="coordinates">
                <span>latitude {weatherData.lat || 0} </span>
                <span>longitude {weatherData.lon || 0} </span>
              </div>
              <span>accurate to {weatherData.date} </span>
            </div>
          </div>
        </div>

        <WeatherCard
          isLoading={isLoading}
          weatherData={weatherData}
          isError={isError}
        />
      </div>
    </main>
  );
}

export default WeatherPage;
