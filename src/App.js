import { useState } from 'react';
import fetchWeather from './api/fetchWeather';
import './App.css';
const App = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const search = async (e) => {
    e.preventDefault();
    setloading(true);
    await fetchWeather(location)
      .then((data) => {
        setWeather(data);
        setLocation('');
        seterror(false);
      })
      .catch((err) => {
        // console.log(err);
        seterror(true);
      })
      .finally(() => setloading(false));
  };
  return (
    <div className="main-container">
      <form onSubmit={search} className="search-form">
        <input
          type="text"
          className="search"
          placeholder="Search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error result">something went wrong</p>
      ) : (
        weather && (
          <div className="result">
            <div className="city">
              <h2 className="city-name">
                <span>{weather.location}</span>
                <sup>{weather.country}</sup>
              </h2>
              <div className="city-temp">
                {Math.round(weather.temperature)}
                <sup>&deg;C</sup>
              </div>
              <div className="info">
                <img
                  src={
                    'https://openweathermap.org/img/wn/' +
                    weather.icon +
                    '@2x.png'
                  }
                  alt={weather.description}
                  className="city-icon"
                />
                <p className="desc">{weather.description}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default App;
//  {
//     status_code: cod,
//     location: name,
//     temperature: temp,
//     pressure: pressure,
//     humidity: humidity,
//     description: description,
//     condition: id,
//   };
