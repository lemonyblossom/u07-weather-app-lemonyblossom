import React from 'react';
import WeatherIcon from './WeatherIcon';
import mountainsGif from '../assets/mountains.gif';
import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset (4).png';

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
      <div className="bg-gradient-to-tr from-blue-400 via-blue-100 to-blue-200 dark:bg-gradient-to-b dark:from-blue-950 dark:via-blue-800/60 dark:to-purple-950/60 p-5 rounded-lg m-2">
         {/* Display for weekday and date */}
         <h2 className="text-2xl mb-5">{formattedDate}</h2>

         <div className="bg-gradient-to-bl from-white via-white  to-blue-300 dark:bg-slate-800 dark: rounded grid grid-cols-3 gap-6">
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



            <div className="w-full h-full rounded flex flex-col items-center justify-center bg-gradient-to-l from-white via-white to-blue-200/90 border border-blue-200 ring-blue-400 ring-opacity-75">
               <div className="flex justify-end w-full m-2">
                  <img className="w-[20%]" src={mountainsGif} alt="Animated GIF" />
               </div>
               <div className="w-full p-2 rounded flex items-center justify-center bg-gradient-to-b from-blue-100/0 via-red-100/90 to-red-200/10">
                  <p>Sunrise</p>
                  <p className="m-4 text-xl">{new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <img className="w-[10%]" src={sunrise} alt="sunrise" />
               </div>

               <div className="w-full p-2 rounded flex items-center justify-center bg-gradient-to-b from-red-300/10 via-orange-400/80 to-orange-500/10">
                  <p>Sunset</p>
                  <p className="m-4 text-xl">{new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <img className="w-[10%]" src={sunset} alt="sunset" />

               </div>
            </div>
         </div>
      </div>
   );
};

export default CurrentWeatherCard;
