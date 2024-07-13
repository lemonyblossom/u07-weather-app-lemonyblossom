import React from 'react';
import WeatherIcon from './WeatherIcon';
import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset (4).png';
import sunIcon from '../assets/sun-position.png';
import moonIcon from '../assets/moon.png';

interface CurrentWeatherCardProps {
   currentWeather: any;
   weatherIcons: { [key: string]: string };
   tempUnit: 'celsius' | 'fahrenheit';
   convertTemperature: (temp: number) => number;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
   currentWeather,
   weatherIcons,
   tempUnit,
   convertTemperature,
}) => {
   const today = new Date();
   const now = today.getTime();  // Current time in milliseconds in user's timezone

   // Ensure that currentWeather.sys.sunrise and currentWeather.sys.sunset exist
   if (!currentWeather.sys || !currentWeather.sys.sunrise || !currentWeather.sys.sunset) {
      return null; // Handle case where sunrise and sunset data is missing
   }

   // Sunrise and Sunset times in milliseconds from API response
   const sunriseTime = new Date((currentWeather.sys.sunrise + currentWeather.timezone) * 1000);
   const sunsetTime = new Date((currentWeather.sys.sunset + currentWeather.timezone) * 1000);

   // Determine if it's currently day or night
   const isDaytime = now >= sunriseTime.getTime() && now <= sunsetTime.getTime();

   // Calculate the position of the sun/moon icon along the progress bar
   const sunPosition =
      now >= sunriseTime.getTime() && now <= sunsetTime.getTime()
         ? ((now - sunriseTime.getTime()) / (sunsetTime.getTime() - sunriseTime.getTime())) * 100
         : now < sunriseTime.getTime()
            ? 0
            : 100;

   // Format sunrise and sunset times for display in local time
   const formatTime = (time: Date) => {
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
   };

   // Convert temperature and feels like
   const temperature = convertTemperature(currentWeather.main.temp);
   const feelsLike = convertTemperature(currentWeather.main.feels_like);

   // Formatted date
   const formattedDate = today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
   });

   return (
      <div className="current-card p-2 bg-gradient-to-tr from-blue-200 via-blue-100 to-blue-200 shadow-lg rounded-t-lg rounded-b-none">
         <div className="current-data-container flex flex-col items-center">
            <div className="first-section-card flex flex-col-reverse md:flex-row">
               <div className="flex flex-col w-full md:w-2/3">
                  <h2 className="text-2xl m-1">{formattedDate}</h2>
                  <div className="weather-details-container w-full flex flex-col md:flex-row md:justify-between m-1 py-2 rounded">
                     <div className="weather-details flex flex-col justify-start md:w-1/2">
                        <p>Weather: {currentWeather.weather[0].description}</p>
                        <p>Cloudiness: {currentWeather.clouds.all}%</p>
                     </div>
                     <div className="weather-details flex flex-col justify-start md:w-1/2">
                        <p>Humidity: {currentWeather.main.humidity}%</p>
                        <p>Pressure: {currentWeather.main.pressure} hPa</p>
                        {currentWeather.rain && currentWeather.rain['1h'] && (
                           <p>Rain (1h): {currentWeather.rain['1h']} mm</p>
                        )}
                     </div>
                  </div>
               </div>

               <div className="today-temp w-full flex flex-col p-2 md:w-1/3 items-center">
                  {currentWeather.weather && currentWeather.weather[0].icon && (
                     <WeatherIcon
                        iconUrl={weatherIcons[currentWeather.weather[0].icon]}
                        altText="Weather Icon"
                        className="w-70 h-70"
                     />
                  )}
                  <strong className="text-4xl">
                     {Math.floor(temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}
                  </strong>
                  <p className="mt-2">Feels Like: {Math.floor(feelsLike)}°{tempUnit === 'celsius' ? 'C' : 'F'}</p>
               </div>
            </div>

            <div className="second-section-card flex flex-col md:flex-row w-full md:w-2/3">
               <div className="wind-details flex flex-col m-1 justify-center py-2 w-full">
                  <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
                  <p>Wind Direction: {currentWeather.wind.deg}°</p>
                  {currentWeather.rain && currentWeather.rain['1h'] && <p>Rain (1h): {currentWeather.rain['1h']} mm</p>}
               </div>
               <div className="sun-position-data flex flex-col justify-end m-1 py-2 w-full">
                  <div className="sunrise flex flex-row w-full">
                     <p>Sunrise</p>
                     <p className="m-1">{sunriseTime instanceof Date && !isNaN(sunriseTime.getTime()) ? formatTime(sunriseTime) : 'Invalid date'}</p>
                     <img className="w-8" src={sunrise} alt="sunrise" />
                  </div>
                  <div className="sunset flex flex-row w-full">
                     <p>Sunset</p>
                     <p className="m-1">{sunsetTime instanceof Date && !isNaN(sunsetTime.getTime()) ? formatTime(sunsetTime) : 'Invalid date'}</p>
                     <img className="w-8" src={sunset} alt="sunset" />
                  </div>

                  <div className="sun-progress relative mt-2 w-24 h-24">
                     <svg className="absolute" width="100%" height="100%" viewBox="0 0 100 100">
                        <circle
                           cx="50"
                           cy="50"
                           r="40"
                           fill="none"
                           strokeWidth="6"
                           stroke="#b6caf0"
                           strokeDasharray="251.2"
                           transform="rotate(93 50 50)"
                        />
                        <circle
                           cx="50"
                           cy="50"
                           r="40"
                           fill="none"
                           strokeWidth="9"
                           stroke="#ffec8c"
                           strokeLinecap="round"
                           strokeDasharray="251.2"
                           strokeDashoffset={251.2 - (251.2 * sunPosition) / 100}
                           transform="rotate(93 50 50)"
                        />
                     </svg>
                     <img
                        className="w-8 absolute top-0 left-0 right-0 bottom-0 m-auto"
                        src={isDaytime ? sunIcon : moonIcon}  //Use isDaytime to determine the icon 
                        alt={isDaytime ? 'Sun Icon' : 'Moon Icon'}
                        style={{
                           transform: `rotate(${sunPosition * 3.6}deg)`, // 3.6 degrees per percent to follow the circle path
                        }}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CurrentWeatherCard;
