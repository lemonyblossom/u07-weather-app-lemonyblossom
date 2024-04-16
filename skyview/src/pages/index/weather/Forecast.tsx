import React, { useState, useEffect } from 'react';

const Forecast: React.FC<{ latitude: number; longitude: number }> = ({ latitude, longitude }) => {
   // State to store forecast data
   const [forecastData, setForecastData] = useState<any[]>([]);

   useEffect(() => {
      // Fetch forecast data when component mounts
      fetchForecastData();
   }, [latitude, longitude]); // Add latitude and longitude to dependency array

   const fetchForecastData = async () => {
      try {
         // Make API call to fetch forecast data using latitude and longitude
         const response = await fetch(`https://api.ambeedata.com/weather/forecast/by-lat-lng?lat=${latitude}&lng=${longitude}`);
         const data = await response.json();
         setForecastData(data.data.forecast);
      } catch (error) {
         console.error('Error fetching forecast data:', error);
      }
   };

   return (
      <div>
         <h2>Weather Forecast</h2>
         {forecastData.length > 0 ? (
            <div>
               {/* Display forecast data */}
               {forecastData.map((forecast: any, index: number) => (
                  <div key={index}>
                     <p>Time: {new Date(forecast.time * 1000).toLocaleString()}</p>
                     <p>Temperature: {forecast.temperature}°C</p>
                     <p>Weather Summary: {forecast.summary}</p>
                     {/* Add more forecast details as needed */}
                  </div>
               ))}
            </div>
         ) : (
            <p>Loading...</p>
         )}
      </div>
   );
};

export default Forecast;
