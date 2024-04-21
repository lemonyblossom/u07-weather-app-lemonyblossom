import React from 'react';
import WeatherIcon from './WeatherIcon';

const CurrentWeatherCard: React.FC<{ currentWeather: any, weatherIcons: { [key: string]: string } }> = ({ currentWeather, weatherIcons }) => {
   return (
      <div>
         <h2>Current Weather</h2>
         <div style={{ backgroundColor: 'black', padding: '5px', borderRadius: '5px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{ backgroundColor: 'lightblue', padding: '15px', borderRadius: '8px' }}>
               {currentWeather.weather && currentWeather.weather[0].icon && (

                  <WeatherIcon iconUrl={weatherIcons[currentWeather.weather[0].icon]} altText="Weather Icon" />
               )}
               <p>Temperature</p>
               <strong>{Math.floor(currentWeather.main.temp)}°C</strong>
               <p>Feels Like</p>
               <strong>{Math.floor(currentWeather.main.feels_like)}°C</strong>
            </div>
            <div style={{ backgroundColor: 'lightblue', padding: '15px', borderRadius: '8px' }}>
               <h3>Humidity</h3>
               <p>{currentWeather.main.humidity}%</p>
            </div>
            <div style={{ backgroundColor: 'lightblue', padding: '15px', borderRadius: '8px' }}>
               <h3>Sunrise</h3>
               <p>{new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div style={{ backgroundColor: 'lightblue', padding: '15px', borderRadius: '8px' }}>
               <h3>Sunset</h3>
               <p>{new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div style={{ backgroundColor: 'lightblue', padding: '15px', borderRadius: '8px' }}>
               <h3>Sky Status</h3>
               <p>{currentWeather.weather[0].description}</p>
            </div>
         </div>
      </div>
   );
};

export default CurrentWeatherCard;
