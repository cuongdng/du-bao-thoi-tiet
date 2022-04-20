import axios from 'axios';

const BASE_URL = 'http://api.openweathermap.org';

export const API_KEY = '75518890dd542a1c6ff41beff22b9bfa';

const apis = {
    getCoordinatesFromLocationName: (cityName, limit = 5) => axios.get(`${BASE_URL}/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`),
    getLocationNameFromCoordinates: (longitude, latitude, limit = 5) => axios.get(`${BASE_URL}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${API_KEY}`),
    getWeatherData: (longitude, latitude) => axios.get(`${BASE_URL}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${API_KEY}`),
    getWeatherIcon: (id) => `http://openweathermap.org/img/wn/${id}@2x.png`,
};

export default apis;
