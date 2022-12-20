import React, { useState, useEffect } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  // Fetch data from the restcountries API when the query changes
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${query}`
      );
      setResults(response.data);
    })();
  }, [query]);
  //Fetch weather data
  useEffect(() => {
    if (!selectedCountry) {
      return;
    }
    (async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital}&appid=${api_key}`
      );
      setWeather(response.data);
    })();
  }, [selectedCountry]);
  // Render the search field and the results
  return (
    <div>
      <label>
        find countries
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {selectedCountry ? (
        <div>
          <h1>{selectedCountry.name}</h1>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area : {selectedCountry.area}</p>
          <h3>Languages:{" "} </h3>
          <ul>
          {selectedCountry.languages.map((language) => (
           <li key={language.iso639_1}>{language.name}</li>
           ))}
          </ul>
          <img src={selectedCountry.flag} alt={`flag of ${selectedCountry.name}`} />
          <h1> Weather in {selectedCountry.capital}</h1>
          {weather ? (
            <p>
              Temperature {(weather.main.temp- 273.15).toFixed(2)} Celsius
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`icon`} />
              Wind {weather.wind.speed} m/s
            </p>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.name}>
              {result.name}{" "}
              <button onClick={() => setSelectedCountry(result)}>Show</button>
              </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
