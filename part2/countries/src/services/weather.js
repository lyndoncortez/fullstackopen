import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

const open_weather_key = import.meta.env.VITE_OPEN_WEATHER_API;

const getWeather = (lat, lng) => {
    return axios.get(`${baseUrl}lat=${lat}&lon=${lng}&units=metric&appid=${open_weather_key}`).then(response => response.data)
}

export default { getWeather }