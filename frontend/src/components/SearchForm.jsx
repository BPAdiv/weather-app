import axios from "axios";
import React, { useState } from "react";
import "../style/searchForm.css";
function SearchForm({ fetchWeatherData, isError }) {
  const [searchInput, setSearchInput] = useState("");
  function submitCheckWeather(e) {
    e.preventDefault();
    fetchWeatherData(searchInput);
  }
  return (
    <form onSubmit={submitCheckWeather} className="input-form">
      <h1 className="form-heading">
        User our weather app to see the weather around the world
      </h1>
      <label className="city-input-label" htmlFor="city-input">
        City Name
      </label>
      <div className="input-box">
        <input
          type="text"
          id="city-input"
          className="city-input-field"
          name="city-input-field"
          placeholder="Tel Aviv"
          onChange={(e) => setSearchInput(e.target.value)}
          required="required"
        />
        <button className="input-check-button">Check</button>
      </div>
      {isError?.text && <span className="error-span-text">{isError.text}</span>}
    </form>
  );
}
export default SearchForm;
