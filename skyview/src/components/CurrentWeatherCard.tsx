import React from 'react';
import WeatherIcon from './WeatherIcon';

const CurrentWeatherCard: React.FC<{ currentWeather: any, weatherIcons: { [key: string]: string } }> = ({ currentWeather, weatherIcons }) => {
   // Get today's date
   const today = new Date();
   const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

   return (
      <div>
         {/* Display weekday and date */}
         <h2 >{formattedDate}</h2>

         <div style={{ backgroundColor: 'black', padding: '5px', borderRadius: '5px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

            <div style={{ backgroundColor: 'lightblue', padding: '15px', borderRadius: '8px' }}>
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
                  {currentWeather.weather && currentWeather.weather[0].icon && (
                     <WeatherIcon iconUrl={weatherIcons[currentWeather.weather[0].icon]} altText="Weather Icon" />
                  )}
                  {/* Add margin for spacing */}
                  <strong style={{ marginLeft: '10px', fontSize: '32px' }}>{Math.floor(currentWeather.main.temp)}°C</strong>
               </div>

               <p>Feels Like: {Math.floor(currentWeather.main.feels_like)}°C</p>
            </div>

            <div style={{ backgroundColor: 'lightgreen', padding: '15px', borderRadius: '8px' }}>
               <h3>Humidity</h3>
               <p>{currentWeather.main.humidity}%</p>
            </div>

            {/*SUNRISE AND SUNSET CARD*/}
            <div style={{
               backgroundColor: 'lightpink',
               padding: '25px',
               borderRadius: '8px',
               display: 'flex',
               flexDirection: 'column',
               gap: '10px'
            }}>
               <div className='sunrise' style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <p>Sunrise</p>

                  <WeatherIcon iconUrl={`http://openweathermap.org/img/wn/01d.png`} altText="Sunrise" />
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', fontSize: '32px' }}>{new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
               </div>

               <div className='sunset' style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <p>Sunset</p>

                  <WeatherIcon iconUrl={`http://openweathermap.org/img/wn/01n.png`} altText="Sunset" />
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', fontSize: '32px' }}>{new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CurrentWeatherCard;
