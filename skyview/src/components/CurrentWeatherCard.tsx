import React from 'react';
import WeatherIcon from './WeatherIcon';


const CurrentWeatherCard: React.FC<{ currentWeather: any, weatherIcons: { [key: string]: string } }> = ({ currentWeather, weatherIcons }) => {
   // Get today's date
   const today = new Date();
   const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

   return (
      <div className="bg-yellow-400 p-5 rounded-lg">
         {/* Display weekday and date */}
         <h2 className="text-2xl mb-5">{formattedDate}</h2>

         <div className="bg-black p-5 rounded grid grid-cols-3 gap-6">

            <div className="bg-lightblue p-5 rounded">
               <div className="flex justify-center items-center">
                  {currentWeather.weather && currentWeather.weather[0].icon && (
                     <WeatherIcon iconUrl={weatherIcons[currentWeather.weather[0].icon]} altText="Weather Icon" />
                  )}
                  <strong className="ml-4 text-4xl">{Math.floor(currentWeather.main.temp)}°C</strong>
               </div>
               <p className="mt-2">Feels Like: {Math.floor(currentWeather.main.feels_like)}°C</p>
            </div>

            <div className="bg-lightgreen p-5 rounded">
               <h3 className="mb-2">Humidity</h3>
               <p>{currentWeather.main.humidity}%</p>
            </div>

            <div className="bg-lightpink p-5 rounded flex flex-col items-center justify-center">
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
