
import React, { useState, useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import { fetchCurrentWeather, fetchForecastWeather, API_KEY } from '../api/WeatherApi';


//FC = functional component. Takes in props well, but not atm.
const Weather: React.FC = () => {
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

         /* const iconCode: string = current.weather[0].icon;
         const iconUrl: string = `http://openweathermap.org/img/wn/${iconCode}.png`;

         setWeatherIconUrl(iconUrl); */

      } catch (error) {
         console.error('Error fetching current weather:', error);
      } finally {
         setLoading(false);
      }
   };

   /*weather icons*/
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

   // search
   const handleSearch = async () => {
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
         }
      } catch (error) {
         console.error('Error fetching weather data for searched city:', error);
      } finally {
         setLoading(false);
      }
   };

   //filter- calculate temp for day and night.
   const filterForecastData = () => {
      if (!forecastWeather) return [];

      const filteredData: any[] = [];

      // loop through forecast results
      forecastWeather.list.forEach((item: any) => {
         const date = new Date(item.dt * 1000);
         const dayOfWeek = date.toLocaleDateString(undefined, { weekday: 'long' });


         const existingDay = filteredData.find((data) => data.date === date.toLocaleDateString());
         if (existingDay) {
            existingDay.dayTemp = Math.max(existingDay.dayTemp, item.main.temp_max);
            existingDay.nightTemp = Math.min(existingDay.nightTemp, item.main.temp_min);
         } else {
            filteredData.push({
               date: date.toLocaleDateString(),
               dayOfWeek: dayOfWeek,
               dayTemp: item.main.temp_max,
               nightTemp: item.main.temp_min,
               description: item.weather[0].description,
               icon: weatherIcons[item.weather[0].icon],
            });
         }
      });
      return filteredData;
   };

   {/*------------DISPLAY----------*/ }
   return (
      <div>
         {/* TODO: Geolocation Error Handling */}



         {/* City/Country */}
         {cityName && country && (
            <div>
               <h2>{cityName}, {country}</h2>
            </div>
         )}

         {/* Search*/}
         <form onSubmit={handleSearch}>
            <input
               type="text"
               value={searchCity}
               onChange={(e) => setSearchCity(e.target.value)}
               placeholder="Enter city name"
            />
            <button type="submit">Search</button>
         </form>


         {/* TODO Better animated loading Indicator */}


         {/* Current*/}
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


         {/* Forecast*/}

         {forecastWeather && (
            <div>
               <h2>5-Day Forecast</h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>
                  {filterForecastData().map((item: any, index: number) => (
                     <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>

                        {item.icon && <img src={item.icon} alt="Weather Icon" />}

                        <p> {item.dayOfWeek}</p>
                        <small>{item.date}</small>
                        <p>Day: {item.dayTemp}°C</p>
                        <p>Night: {item.nightTemp}°C</p>
                        <p>Sky status: {item.description}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default Weather;