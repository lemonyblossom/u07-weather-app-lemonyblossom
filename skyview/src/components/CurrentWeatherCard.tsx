import WeatherIcon from './WeatherIcon';
import sunIcon from '../assets/sun-position.png';
import moonIcon from '../assets/moon.png';
import SunPositionTable from './tables/SunPositionTable';
import WeatherTable from './tables/WeatherTable';
import WindTable from './tables/WindTable';
import SunProgress from './SunProgress';

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
   const isDaytime = (sunriseTime: Date, sunsetTime: Date) => {
      return now >= sunriseTime.getTime() && now <= sunsetTime.getTime();
   };

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
      <div className="current-card p-2 bg-gradient-to-t from-blue-200/20 via-blue-100 to-blue-300/60 dark:bg-gradient-to-t dark:from-blue-900/70 dark:to-blue-950 dark:text-blue-200  shadow-lg rounded-md rounded-b-none">
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

                  <WeatherTable
                     title="Weather"
                     data={[
                        { label: 'Weather', value: currentWeather.weather[0].description },
                        { label: 'Cloudiness', value: `${currentWeather.clouds.all}%` },
                        { label: 'Humidity', value: `${currentWeather.main.humidity}%` },
                        { label: 'Pressure', value: `${currentWeather.main.pressure} hPa` },
                        { label: 'Rain (1h)', value: currentWeather.rain && currentWeather.rain['1h'] ? `${currentWeather.rain['1h']} mm` : '' },
                     ]}
                  />

                  <WindTable
                     windSpeed={currentWeather.wind.speed}
                     windDirection={currentWeather.wind.deg}
                     rain1h={currentWeather.rain && currentWeather.rain['1h'] ? currentWeather.rain['1h'] : undefined}
                  />

               </div>

               <div className="second-section-card flex flex-row md:flex-col w-full md:w-1/2">
                  <SunPositionTable
                     sunriseTime={sunriseTime}
                     sunsetTime={sunsetTime}
                     formatTime={formatTime}
                  />
                  <SunProgress
                     sunPosition={sunPosition}
                     isDaytime={isDaytime(sunriseTime, sunsetTime)}
                  />

               </div>
            </div>
         </div>
      </div>
   );
};

export default CurrentWeatherCard;
