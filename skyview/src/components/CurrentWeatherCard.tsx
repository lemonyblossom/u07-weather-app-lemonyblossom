import React from 'react';
import WeatherIcon from './WeatherIcon';
import sunrise from '../assets/sunriseIcon.png';
import sunset from '../assets/sunsetIcon.png';
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
   const now = today.getTime();

   // Ensure existence
   if (!currentWeather.sys || !currentWeather.sys.sunrise || !currentWeather.sys.sunset) {
      return null;
   }

   const sunriseTime = new Date((currentWeather.sys.sunrise + currentWeather.timezone) * 1000);
   const sunsetTime = new Date((currentWeather.sys.sunset + currentWeather.timezone) * 1000);

   // Check day or night
   const isDaytime = now >= sunriseTime.getTime() && now <= sunsetTime.getTime();

   // Calculate current sun position
   const sunPosition =
      now >= sunriseTime.getTime() && now <= sunsetTime.getTime()
         ? ((now - sunriseTime.getTime()) / (sunsetTime.getTime() - sunriseTime.getTime())) * 100
         : now < sunriseTime.getTime()
            ? 0
            : 100;

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

            <h2 className="text-2xl m-1">{formattedDate}</h2>

            <div className="today-temp w-full flex flex-col p-2 items-center">
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

            <div className='table-wrapper flex flex-col md:flex-row w-full'>
               <div className="first-section-card flex flex-col w-full md:w-1/2">

                  <div className="weather-details-container w-full">
                     <table className="min-w-full rounded bg-cyan-200 dark:bg-gray-800">
                        <tbody>
                           <tr>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                 Weather
                              </td>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                 {currentWeather.weather[0].description}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                 Cloudiness
                              </td>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                 {currentWeather.clouds.all}%
                              </td>
                           </tr>
                           <tr>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                 Humidity
                              </td>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                 {currentWeather.main.humidity}%
                              </td>
                           </tr>
                           <tr>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                 Pressure
                              </td>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                 {currentWeather.main.pressure} hPa
                              </td>
                           </tr>
                           {currentWeather.rain && currentWeather.rain['1h'] && (
                              <tr>
                                 <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Rain (1h)
                                 </td>
                                 <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {currentWeather.rain['1h']} mm
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>

                  <div className="wind-details w-full">
                     <table className="min-w-full bg-lime-200 dark:bg-gray-800">
                        <tbody>
                           <tr>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                 Wind Speed
                              </td>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                 {currentWeather.wind.speed} m/s
                              </td>
                           </tr>
                           <tr>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                 Wind Direction
                              </td>
                              <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                 {currentWeather.wind.deg}°
                              </td>
                           </tr>
                           {currentWeather.rain && currentWeather.rain['1h'] && (
                              <tr>
                                 <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Rain (1h)
                                 </td>
                                 <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {currentWeather.rain['1h']} mm
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>

               </div>

               <div className="second-section-card flex flex-col w-full md:w-1/2">
                  <div className='sun-container flex flex-row w-full h-full md:flex-col md:justify-between'>

                     <div className="sun-position-data flex flex-row md:flex-col justify-between w-full h-full">
                        <table className="w-1/2 md:w-full h-full md:h-1/4 bg-white dark:bg-gray-800">
                           <tbody>
                              <tr>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Sunrise
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {sunriseTime instanceof Date && !isNaN(sunriseTime.getTime()) ? formatTime(sunriseTime) : 'Invalid date'}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    <img className="w-8" src={sunrise} alt="sunrise" />
                                 </td>
                              </tr>
                              <tr>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                                    Sunset
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {sunsetTime instanceof Date && !isNaN(sunsetTime.getTime()) ? formatTime(sunsetTime) : 'Invalid date'}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    <img className="w-8" src={sunset} alt="sunset" />
                                 </td>
                              </tr>
                           </tbody>
                        </table>

                        <div className='progress-wrapper flex flex-col w-1/2 md:h-full md:w-full md:justify-center'>
                           <div className="sun-progress flex relative mt-2 w-full h-full ">
                              <svg className="absolute inset-0 w-full h-full min-w-24 min-h-24" viewBox="0 0 100 100">
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
                                 className="progressIcon min-w-10 absolute top-0 left-0 right-0 bottom-0 m-auto"
                                 src={isDaytime ? sunIcon : moonIcon}  // Use isDaytime to determine the icon
                                 alt={isDaytime ? 'Sun Icon' : 'Moon Icon'}
                              />
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CurrentWeatherCard;
