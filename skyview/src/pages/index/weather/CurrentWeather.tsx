import React, { useState, useEffect } from 'react';

const CurrentWeather: React.FC<{ latitude: number; longitude: number }> = ({ latitude, longitude }) => {
   // State to store weather data
   const [weatherData, setWeatherData] = useState<any>(null);

   useEffect(() => {
      fetchWeatherData();
   }, [latitude, longitude]); // Add latitude and longitude to dependency arr

   const fetchWeatherData = async () => {
      try {
         const apiKey = '4c49b56778ae2e50791ca4d4e076d85537f324247b9fc461ed06348fa6be6956';
         const response = await fetch(`https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${latitude}&lng=${longitude}`, {
            headers: {
               'x-api-key': apiKey // Include API key in headers
            }
         });
         const data = await response.json();
         console.log('API Response:', data);
         setWeatherData(data);
      } catch (error) {
         console.error('Error fetching weather data:', error);
      }
   };

   return (
      <div>
         <h2>Current Weather</h2>
         {weatherData ? (
            <div>
               {/* Display weather data */}
               <p>Temperature: {weatherData.data.temperature}°C</p>
               <p>Weather Summary: {weatherData.data.summary}</p>
               <p>Humidity: {weatherData.data.humidity}%</p>
               {/* Add more weather details as needed */}
            </div>
         ) : (
            <p>Loading...</p>
         )}
      </div>
   );
};

export default CurrentWeather;
