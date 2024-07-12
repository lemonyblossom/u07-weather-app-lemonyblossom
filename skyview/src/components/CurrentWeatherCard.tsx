import React from 'react';
import WeatherIcon from './WeatherIcon';
import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset (4).png';
import sunIcon from '../assets/sun-position.png';
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

   // CAlculate Sun position
   const sunrise = currentWeather.sys.sunrise * 1000;
   const sunset = currentWeather.sys.sunset * 1000;
   const now = Date.now();

   const calculateSunPosition = (currentTime: number, sunriseTime: number, sunsetTime: number) => {
      if (currentTime < sunriseTime) return 0;
      if (currentTime > sunsetTime) return 100;
      return ((currentTime - sunriseTime) / (sunsetTime - sunriseTime)) * 100;
   };

   const sunPosition = calculateSunPosition(now, sunrise, sunset);


   return (
      <div className="current-card p-2 bg-gradient-to-tr from-blue-200 via-blue-100 to-blue-200  shadow-lg rounded-t-lg rounded-b-none ">
         {/* Display for weekday and date */}

         <div className="current-data-container flex flex-col items-center">
            {/*             bg-gradient-to-bl from-red-200 via-white to-blue-300 dark:bg-slate-800 dark:rounded
 */}
            <div className='first-section-card flex flex-col-reverse md:flex-row '>
               <div className='flex flex-col w-full md:w-2/3'>
                  <h2 className="text-2xl m-1">{formattedDate}</h2>
                  <div className="weather-details-container w-full  flex flex-col md:flex-row md:justify-between m-1 py-2 rounded">
                     <div className='weather-details flex flex-col justify-start md:w-1/2 '>
                        <p>Weather: {currentWeather.weather[0].description}</p>
                        <p>Cloudiness: {currentWeather.clouds.all}%</p>
                     </div>
                     <div className='weather-details flex flex-col justify-start md:w-1/2
                      '>
                        <p>Humidity: {currentWeather.main.humidity}%</p>
                        <p>Pressure: {currentWeather.main.pressure} hPa</p>
                        {currentWeather.rain && currentWeather.rain['1h'] && <p>Rain (1h): {currentWeather.rain['1h']} mm</p>}
                     </div>
                  </div>
               </div>

               <div className="today-temp w-full flex flex-col p-2 md:w-1/3 items-center ">
                  {currentWeather.weather && currentWeather.weather[0].icon && (
                     <WeatherIcon iconUrl={weatherIcons[currentWeather.weather[0].icon]} altText="Weather Icon" className="w-70 h-70" />
                  )}
                  <strong className="text-4xl">{Math.floor(temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}</strong>
                  <p className="mt-2">Feels Like: {Math.floor(feelsLike)}°{tempUnit === 'celsius' ? 'C' : 'F'}</p>
               </div>
            </div>

            <div className="second-section-card flex flex-col md:flex-row w-full md:w-2/3">
               <div className='wind-details flex flex-col m-1 justify-center py-2 w-full'>
                  <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
                  <p>Wind Direction: {currentWeather.wind.deg}°</p>
                  {currentWeather.rain && currentWeather.rain['1h'] && <p>Rain (1h): {currentWeather.rain['1h']} mm</p>}
               </div>
               <div className="sun-position-data flex flex-col justify-end m-1 py-2 w-full">
                  <div className="sunrise flex flex-row w-full">
                     <p>Sunrise</p>
                     <p className="m-1">{new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                     <img className="w-8" src={sunrise} alt="sunrise" />

                  </div>
                  <div className="sunset flex flex-row w-full">
                     <p>Sunset</p>
                     <p className="m-1">{new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                     <img className="w-8" src={sunset} alt="sunset" />
                  </div>
                  <div className="sunProgress relative w-full h-5 bg-gray-300 rounded-lg overflow-hidden mt-2">
                     <div className="relative h-full" style={{ background: `linear-gradient(90deg, #ffec8c ${sunPosition}%, #b6caf0 ${sunPosition}%)` }}>
                        <div className="absolute -top-3 h-5 w-5" style={{ left: `${sunPosition}%`, transform: 'translateX(-50%) translateY(60%)' }}>
                           <img src={sunIcon} alt="Sun Position" className="h-full w-full" />
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
