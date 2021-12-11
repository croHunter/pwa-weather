import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.REACT_APP_WEATHER_KEY;
const url = 'https://api.openweathermap.org/data/2.5/weather';

const formatData = (data) => {
  const { main, weather, name, sys } = data;
  const { temp } = main;
  const { description, icon } = weather[0];
  return {
    location: name,
    country: sys.country,
    icon: icon,
    temperature: temp,
    description: description,
  };
};
const fetchWeather = (location) => {
  return new Promise(async (resolve, reject) => {
    try {
      const weatherConditions = await axios.get(url, {
        params: {
          q: location,
          appid: apiKey,
          units: 'metric',
        },
      });
      resolve(formatData(weatherConditions.data));
    } catch (error) {
      reject(error);
    }
  });
};

export default fetchWeather;
