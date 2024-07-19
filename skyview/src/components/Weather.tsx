import React, { useState, useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import { fetchCurrentWeather, fetchForecastWeather, API_KEY } from '../api/WeatherApi';
import CurrentWeatherCard from './CurrentWeatherCard';
import ForecastCard from './ForecastCard';
import Search from './Search';

interface WeatherProps {
   tempUnit: 'celsius' | 'fahrenheit';
   toggleTempUnit: () => void;
}

const Weather: React.FC<WeatherProps> = ({ tempUnit, toggleTempUnit }) => {
   const [currentWeather, setCurrentWeather] = useState<any>(null);
   const [forecastWeather, setForecastWeather] = useState<any>(null);
   const [searchCity, setSearchCity] = useState<string>('');
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

   const convertTemperature = (temp: number) => {
      if (tempUnit === 'celsius') {
         return temp;
      }
      return (temp * 9) / 5 + 32;
   };

   const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
         if (searchCity) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
               if (response.status === 404) {
                  throw new Error('City not found. Please check the spelling and try again.');
               } else {
                  throw new Error('Failed to fetch weather data.');
               }
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
         {loading && <p className="text-center text-xl text-white font-medium">Loading...</p>}
         {error && <p className="text-red-500">{error}</p>}
         <Search searchCity={searchCity} setSearchCity={setSearchCity} handleSearch={handleSearch} />
         {cityName && country && <p className='cityNameDisplay px-2 text-3xl font-bold mt-5 flex justify-start dark:text-blue-200'> {cityName}, {country}</p>}

         {currentWeather && forecastWeather && (
            <div className=" toggleUnit mb-2 flex justify-end">
               <button
                  onClick={toggleTempUnit}
                  className="ml-2 bg-gradient-to-t from-blue-400 to-blue-100  text-xl text-white font-medium border-1 border-blue-300 shadow-lg px-3 py-2 rounded-lg dark:bg-gradient-to-b dark:from-blue-950/80 dark:to-blue-900 dark:text-blue-200 dark:border-blue-700">
                  Unit ({tempUnit})
               </button>
            </div>
         )}
         {currentWeather && <CurrentWeatherCard currentWeather={currentWeather} weatherIcons={weatherIcons} tempUnit={tempUnit} convertTemperature={convertTemperature} />}
         {forecastWeather && <ForecastCard forecastWeather={forecastWeather} weatherIcons={weatherIcons} tempUnit={tempUnit} convertTemperature={convertTemperature} />}
      </div>
   );
};

export default Weather;
