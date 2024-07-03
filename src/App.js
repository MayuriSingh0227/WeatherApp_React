
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Indore"); // Initial state for city
  const [weatherData, setWeatherData] = useState(null); // Initial state for weather data

  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`; // Correct date formatting

  const API_KEY = "91a99ccdeb15ae4d18f88655ae806eb4";

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error in fetching weather data: ", error);
    }
  };

  useEffect(() => {
    fetchWeatherData(); // Fetch data on component mount
  }, []); // Empty dependency array ensures this runs only once

  const handleInputChange = (event) => {
    setCity(event.target.value); // Update city state on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    fetchWeatherData(); // Fetch new weather data on form submit
  };

  // Function to get the weather icon URL based on weather main description
  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.png";
      case "Rain":
        return "/rain_with_cloud.png";
      case "Mist":
        return "/Tornado.png";
      case "Haze":
        return "/sun.png";
      default:
        return "/default.png"; // Default icon for undefined weather types
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherData && ( // Conditional rendering if weatherData is available
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData.weather[0].main)} // Get the appropriate icon
                width="180px"
                alt="Weather Icon"
              />
              <h2 className="container_degree">{weatherData.main.temp}°C</h2>
              <h2 className="container_per">{weatherData.weather[0].main}</h2>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter the city"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
