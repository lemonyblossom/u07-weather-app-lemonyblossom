
import React, { useState, useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import { fetchCurrentWeather, fetchForecastWeather } from '../api/WeatherApi';

//FC = functional component. Takes in props well, but not atm.
const Weather: React.FC = () => {
   const [currentWeather, setCurrentWeather] = useState<any>(null);
   const [forecastWeather, setForecastWeather] = useState<any>(null);
   const [searchCity, setSearchCity] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const [cityName, setCityName] = useState<string>('');
   const [country, setCountry] = useState<string>('');
   const { latitude, longitude, error } = useGeolocation();

   useEffect(() => {
      if (latitude && longitude) {
         fetchWeatherData(latitude, longitude);
      }
   }, [latitude, longitude]);

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
         console.error('Error fetching weather data:', error);
      } finally {
         setLoading(false);
      }
   };

   // Function to handle search
   const handleSearch = async () => {
      setLoading(true);
      try {
         // Call API to fetch weather for the searched city
      } catch (error) {
         console.error('Error fetching weather data for searched city:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         {/* Geolocation Error Handling */}
         {error && <div>Error: {error}</div>}


         {/* Search Form */}
         <form onSubmit={handleSearch}>
            <input
               type="text"
               value={searchCity}
               onChange={(e) => setSearchCity(e.target.value)}
               placeholder="Enter city name"
            />
            <button type="submit">Search</button>
         </form>

         {/* Loading Indicator */}
         {loading && <div>Loading...</div>}

         {/* City Name and Country */}
         {cityName && country && (
            <div>
               <h2>{cityName}, {country}</h2>
            </div>
         )}

         {/* Current Weather */}
         {currentWeather && (
            <div>
               <h2>Current Weather</h2>
               <div>
                  <p>Temperature: {currentWeather.main.temp}°C</p>
                  <p>Feels like: {currentWeather.main.feels_like}°C</p>
                  <p>Humidity: {currentWeather.main.humidity}%</p>
                  <p>Sunrise: {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                  <p>Sunset: {new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()}</p>
                  <p>Description: {currentWeather.weather[0].description}</p>
               </div>
            </div>
         )}

         {/* Forecast Weather */}
         {forecastWeather && (
            <div>
               <h2>5-Day Forecast</h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                  {forecastWeather.list.map((item: any, index: number) => (
                     <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
                        <p>Temperature: {item.main.temp}°C</p>
                        <p>Description: {item.weather[0].description}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default Weather;
