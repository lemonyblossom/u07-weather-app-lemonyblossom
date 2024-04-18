const API_KEY = '1be351574c46ebb2e24c6200b15c6441';

export const fetchCurrentWeather = async (lat: number, lon: number) => {
   const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
   );
   if (!response.ok) {
      throw new Error('Failed to fetch current weather');
   }
   return await response.json();
};

export const fetchForecastWeather = async (lat: number, lon: number) => {
   const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
   );
   if (!response.ok) {
      throw new Error('Failed to fetch forecast weather');
   }
   return await response.json();
};
