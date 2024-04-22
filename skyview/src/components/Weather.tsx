import React, { useState, useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import { fetchCurrentWeather, fetchForecastWeather, API_KEY } from '../api/WeatherApi';
import CurrentWeatherCard from './CurrentWeatherCard';
import ForecastCard from './ForecastCard';
import Search from './Search';

const Weather: React.FC = () => {
   const [currentWeather, setCurrentWeather] = useState<any>(null);
   const [forecastWeather, setForecastWeather] = useState<any>(null);
   const [searchCity, setSearchCity] = useState<string>('');//TODO: remake method
   const [loading, setLoading] = useState<boolean>(false);
   const [cityName, setCityName] = useState<string>('');
   const [country, setCountry] = useState<string>('');
   const [weatherIcons, setWeatherIcons] = useState<{ [key: string]: string }>({});

   const { latitude, longitude, error } = useGeolocation();

   useEffect(() => {
      if (latitude && longitude) {
         fetchWeatherData(latitude, longitude);
      }
   }, [latitude, longitude]);

   useEffect(() => {
      if (forecastWeather) {
         fetchWeatherIcons();
      }
   }, [forecastWeather]);

   const fetchWeatherData = async (lat: number, lon: number) => {
      setLoading(true);
      try {
         const current = await fetchCurrentWeather(lat, lon);
         const forecast = await fetchForecastWeather(lat, lon);
         setCurrentWeather(current);
         setForecastWeather(forecast);
         setCityName(current.name);
         setCountry(current.sys.country);
      } catch (error) {
         console.error('Error fetching current weather:', error);
      } finally {
         setLoading(false);
      }
   };

   const fetchWeatherIcons = async () => {
      const icons: { [key: string]: string } = {};
      try {
         forecastWeather.list.forEach((item: any) => {
            const iconCode = item.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            icons[iconCode] = iconUrl;
         });
         setWeatherIcons(icons);
      } catch (error) {
         console.error('Error fetching weather icons:', error);
      }
   };


   // CITY SEARCH
   const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);


      try {
         if (searchCity) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
               throw new Error('City not found');
            }
            const data = await response.json();
            const { coord } = data;
            fetchWeatherData(coord.lat, coord.lon);
            setCityName(data.name);
            setCountry(data.sys.country);
         }
      } catch (error) {
         console.error('Error fetching weather data for searched city:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         {cityName && country && <h2>{cityName}, {country}</h2>}
         {error && <p className="text-red-500">{error}</p>}
         <Search searchCity={searchCity} setSearchCity={setSearchCity} handleSearch={handleSearch} />
         {currentWeather && <CurrentWeatherCard currentWeather={currentWeather} weatherIcons={weatherIcons} />}
         {forecastWeather && <ForecastCard forecastWeather={forecastWeather} weatherIcons={weatherIcons} />}
      </div>
   );
};

export default Weather;
