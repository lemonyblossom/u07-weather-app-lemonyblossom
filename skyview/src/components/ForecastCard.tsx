import React from 'react';
import { Line } from 'react-chartjs-2';

/* import LineChart from './LineChart';
 */interface ForecastCardProps {
   forecastWeather: any;
   weatherIcons: { [key: string]: string };
   tempUnit: 'celsius' | 'fahrenheit';
   convertTemperature: (temp: number) => number;
}





const ForecastCard: React.FC<ForecastCardProps> = ({ forecastWeather, weatherIcons, tempUnit, convertTemperature }) => {


   const formatDate = (date: Date) => {
      const day = date.getDate();
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const suffix = day % 10 < 4 ? suffixes[day % 10] : suffixes[0];
      return date.toLocaleDateString('en-US', { month: 'long' }) + ' ' + day + suffix;
   };

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
               icon: weatherIcons[item.weather[0].icon],
            });
         } else {
            const existingDay = filteredData.find((data) => data.date === date.toLocaleDateString());
            if (existingDay) {
               existingDay.dayTemp = Math.max(existingDay.dayTemp, dayTemp);
               existingDay.nightTemp = Math.min(existingDay.nightTemp, nightTemp);
               existingDay.rawData.push({
                  timestamp: item.dt_txt,
                  temperature: temperature,
                  icon: weatherIcons[item.weather[0].icon],
               });
            } else {
               filteredData.push({
                  date: date.toLocaleDateString(),
                  dayOfWeek: dayOfWeek,
                  dayTemp: dayTemp,
                  nightTemp: nightTemp,
                  description: item.weather[0].description,
                  icon: weatherIcons[item.weather[0].icon],
                  rawData: [{
                     timestamp: item.dt_txt,
                     temperature: temperature,
                     icon: weatherIcons[item.weather[0].icon],
                  }],
               });
            }
         }
      });

      return { filteredData, todayData };
   };

   const { filteredData, todayData } = filterForecastData();

   return (
      <div>
         {/*Today's Hourly Data */}
         {todayData && (
            <div className="forecast-today-card flex flex-col md:flex-col lg:flex-row justify-between bg-white dark:bg-slate-800 border rounded-lg p-2 m-1">
               <div className="w-full flex flex-col justify-center mb-2">
                  <b>Temperature today
                  </b>
                  <br />
                  <ul className="w-full flex gap-2 rounded items-center justify-between">

                     {todayData.rawData.map((data: any, dataIndex: number) => {
                        const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        return (
                           <li key={dataIndex}>
                              <small>{time}</small>
                              <br></br>
                              <strong className="mt-1">{Math.floor(data.temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}</strong>
                              {data.icon && <img src={data.icon} alt="Weather Icon" className="w-8 h-8" />}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </div>
         )}

         {/*          {todayData && <LineChart todayData={todayData.rawData} tempUnit={tempUnit} convertTemperature={convertTemperature} />}
 */}

         {/*forecast 5 days*/}
         {filteredData.map((item: any, index: number) => (
            <div key={index} className="forecast-card flex flex-col md:flex-col lg:flex-row justify-between bg-white dark:bg-slate-800 border rounded-lg p-2 m-1">

               <div className="forecast-content flex flex-col justify-center mb-2 p-2">
                  <div>

                     <b>{item.dayOfWeek}</b>
                     <small className="ml-2">{formatDate(new Date(item.date))}</small>
                     <br></br>
                     <div className="flex justify-between">

                        <div className="flex items-center">

                           <b className="mr-4 ">{Math.floor(item.dayTemp)}°{tempUnit === 'celsius' ? 'C' : 'F'}</b>
                           /
                           <b className="ml-4">{Math.floor(item.nightTemp)}°{tempUnit === 'celsius' ? 'C' : 'F'}</b>
                        </div>
                        <div className="weather icon-description flex flex-col items-center ">
                           {item.icon && <img src={item.icon} alt="Weather Icon" className="w-10 h-10" />}
                           <p className="mb-2">{item.description}</p>
                        </div>

                     </div>
                  </div>

               </div>

               <ul className="forecast-hourly-data flex gap-2 rounded items-center">
                  {item.rawData.map((data: any, dataIndex: number) => {
                     const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                     return (
                        <li key={dataIndex}>
                           <small>{time}</small>
                           <br></br>
                           <strong className="mt-1">{Math.floor(data.temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}</strong>
                           {data.icon && <img src={data.icon} alt="Weather Icon" className="w-8 h-8" />}
                        </li>
                     );
                  })}
               </ul>
            </div>
         ))}


      </div>
   );
};

export default ForecastCard;
