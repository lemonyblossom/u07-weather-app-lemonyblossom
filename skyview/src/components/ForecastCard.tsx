import React from 'react';
import TodayHourlyData from './TodayHourlyData';
import FiveDayForecast from './FiveDayForecast';

interface ForecastCardProps {
   forecastWeather: any;
   weatherIcons: { [key: string]: string };
   tempUnit: 'celsius' | 'fahrenheit';
   convertTemperature: (temp: number) => number;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecastWeather, weatherIcons, tempUnit, convertTemperature }) => {
   const filterForecastData = () => {
      if (!forecastWeather) return { filteredData: [], todayData: null };

      const filteredData: any[] = [];
      let todayData: any = null;

      forecastWeather.list.forEach((item: any) => {
         const date = new Date(item.dt * 1000);
         let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

         // Convert temperatures
         const temperature = convertTemperature(item.main.temp);
         const dayTemp = convertTemperature(item.main.temp_max);
         const nightTemp = convertTemperature(item.main.temp_min);

         if (dayOfWeek === new Date().toLocaleDateString('en-US', { weekday: 'long' })) {
            if (!todayData) {
               todayData = {
                  date: date.toLocaleDateString(),
                  rawData: [],
               };
            }
            todayData.rawData.push({
               timestamp: item.dt_txt,
               temperature: temperature,
               icon: item.weather[0].icon,
            });
         } else {
            const existingDay = filteredData.find((data) => data.date === date.toLocaleDateString());
            if (existingDay) {
               existingDay.dayTemp = Math.max(existingDay.dayTemp, dayTemp);
               existingDay.nightTemp = Math.min(existingDay.nightTemp, nightTemp);
               existingDay.rawData.push({
                  timestamp: item.dt_txt,
                  temperature: temperature,
                  icon: item.weather[0].icon,
               });
            } else {
               filteredData.push({
                  date: date.toLocaleDateString(),
                  dayOfWeek: dayOfWeek,
                  dayTemp: dayTemp,
                  nightTemp: nightTemp,
                  description: item.weather[0].description,
                  icon: item.weather[0].icon,
                  rawData: [{
                     timestamp: item.dt_txt,
                     temperature: temperature,
                     icon: item.weather[0].icon,
                  }],
               });
            }
         }
      });

      return { filteredData, todayData };
   };

   const { filteredData, todayData } = filterForecastData();

   return (
      <div className='mt-1 rounded-md'>
         {todayData && <TodayHourlyData todayData={todayData} tempUnit={tempUnit} weatherIcons={weatherIcons} />}

         <h3 className="m-2 dark:text-blue-100 font-medium">5-day forecast</h3>
         <FiveDayForecast filteredData={filteredData} tempUnit={tempUnit} weatherIcons={weatherIcons} />
      </div>
   );
};

export default ForecastCard;
