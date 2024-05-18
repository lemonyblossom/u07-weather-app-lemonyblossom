import React from 'react';
import WeatherIcon from './WeatherIcon';
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
      <div className="current-card bg-gradient-to-tr from-blue-400 via-blue-100 to-blue-200 dark:bg-gradient-to-b dark:from-blue-950 dark:via-blue-800/60 dark:to-purple-950/60 p-2 rounded-lg ">
         {/* Display for weekday and date */}
         <h2 className="text-2xl mb-5">{formattedDate}</h2>

         <div className="current-data-container flex flex-col bg-gradient-to-bl from-white via-white to-blue-300 dark:bg-slate-800 dark:rounded">

            <div className='first-section-card flex flex-row'>

               <div className="weather-details-container w-full lg:w-2/3 flex flex-col justify-around  md:flex-row m-2 p-5 rounded">
                  <div className='weather-details flex flex-col justify-center '>
                     <p>Weather: {currentWeather.weather[0].description}</p>
                     <p>Cloudiness: {currentWeather.clouds.all}%</p>
                  </div>
                  <div className='weather-details flex flex-col justify-center '>
                     <p>Humidity: {currentWeather.main.humidity}%</p>
                     <p>Pressure: {currentWeather.main.pressure} hPa</p>
                     {currentWeather.rain && currentWeather.rain['1h'] && <p>Rain (1h): {currentWeather.rain['1h']} mm</p>}
                  </div>
               </div>
               <div className="today-temp w-full flex flex-col p-4 md:w-1/3 items-center ">
                  {currentWeather.weather && currentWeather.weather[0].icon && (
                     <WeatherIcon iconUrl={weatherIcons[currentWeather.weather[0].icon]} altText="Weather Icon" className="w-70 h-70" />
                  )}
                  <strong className="text-4xl">{Math.floor(temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}</strong>
                  <p className="mt-2">Feels Like: {Math.floor(feelsLike)}°{tempUnit === 'celsius' ? 'C' : 'F'}</p>
               </div>
            </div>

            <div className="second-section-card flex flex-row w-full lg:justify-evenly lg:w-2/3 md:mt-8 ">
               <div className='wind-details flex flex-col justify-center w-full m-2 items-start md:items-center p-5 bg-white'>
                  <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
                  <p>Wind Direction: {currentWeather.wind.deg}°</p>
                  {currentWeather.rain && currentWeather.rain['1h'] && <p>Rain (1h): {currentWeather.rain['1h']} mm</p>}
               </div>
               <div className="sun-position-data w-full m-2 bg-pink-200">
                  <div className="sunrise w-full rounded flex justify-center items-center">
                     <img className="w-8 m-2" src={sunrise} alt="sunrise" />
                     <p>Sunrise</p>
                     <p className="m-4 text-xl">{new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div className="sunset w-full rounded flex justify-center items-center">
                     <img className="w-8 m-2" src={sunset} alt="sunset" />
                     <p>Sunset</p>
                     <p className="m-4 text-xl">{new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
               </div>

               {/*  <div className="sun-animation flex justify-end">
                     <img className="w-20 h-16" src={mountainsGif} alt="Animation of sun rising and setting" />
                  </div>
                  <div className="wind-animation flex justify-end">
                     <img className="w-20 h-16" src={windGif} alt="Umbrella and leafs blowing in the wind" />
                  </div> */}
            </div>
         </div>
      </div>
   );
};

export default CurrentWeatherCard;
