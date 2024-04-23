import React from 'react';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherCardProps {
   currentWeather: any;
   weatherIcons: { [key: string]: string };
   tempUnit: 'celsius' | 'fahrenheit';
   convertTemperature: (temp: number) => number;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ currentWeather, weatherIcons, tempUnit, convertTemperature }) => {
   // Get today's date
   const today = new Date();
   const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

   // Convert temperatures
   const temperature = convertTemperature(currentWeather.main.temp);
   const feelsLike = convertTemperature(currentWeather.main.feels_like);

   return (
      <div className="bg-blue-200 p-5 rounded-lg m-2">
         {/* Display weekday and date */}
         <h2 className="text-2xl mb-5">{formattedDate}</h2>

         <div className="bg-white dark:bg-slate-800 p-5 rounded grid grid-cols-3 gap-6">
            {/* Temperature Display */}
            <div className="bg-lightblue p-5 rounded">
               <div className="flex justify-center items-center">
                  {currentWeather.weather && currentWeather.weather[0].icon && (
                     <WeatherIcon iconUrl={weatherIcons[currentWeather.weather[0].icon]} altText="Weather Icon" className="w-70 h-70" />
                  )}
                  <strong className="ml-4 text-4xl">{Math.floor(temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}</strong>
               </div>
               <p className="mt-2">Feels Like: {Math.floor(feelsLike)}°{tempUnit === 'celsius' ? 'C' : 'F'}</p>
            </div>

            {/* Humidity Display */}
            <div className="bg-lightgreen p-5 rounded">
               <h3 className="mb-2">Humidity</h3>
               <p>{currentWeather.main.humidity}%</p>
            </div>

            {/* Sunrise and Sunset Display */}
            <div className="p-5 rounded flex flex-col items-center justify-center">
               <WeatherIcon iconUrl={`http://openweathermap.org/img/wn/01d.png`} altText="Sunrise" />
               <div className="flex items-center mt-2">
                  Sunrise
                  <p className="ml-2 text-4xl">{new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
               </div>
               <div className="flex items-center mt-2">
                  Sunset
                  <p className="ml-2 text-4xl">{new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
               </div>
               <WeatherIcon iconUrl={`http://openweathermap.org/img/wn/01n.png`} altText="Sunset" />
            </div>
         </div>
      </div>
   );
};

export default CurrentWeatherCard;
