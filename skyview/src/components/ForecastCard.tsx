import React from 'react';

const ForecastCard: React.FC<{ forecastWeather: any, weatherIcons: { [key: string]: string } }> = ({ forecastWeather, weatherIcons }) => {

   const formatDate = (date: Date) => {
      const day = date.getDate();
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const suffix = day % 10 < 4 ? suffixes[day % 10] : suffixes[0];
      return date.toLocaleDateString('en-US', { month: 'long' }) + ' ' + day + suffix;
   };

   const filterForecastData = () => {
      if (!forecastWeather) return [];

      const filteredData: any[] = [];

      forecastWeather.list.forEach((item: any) => {
         const date = new Date(item.dt * 1000);
         let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

         // Skip today's forecast
         const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
         if (dayOfWeek === today) {
            return;
         }

         const existingDay = filteredData.find((data) => data.date === date.toLocaleDateString());
         if (existingDay) {
            existingDay.dayTemp = Math.max(existingDay.dayTemp, item.main.temp_max);
            existingDay.nightTemp = Math.min(existingDay.nightTemp, item.main.temp_min);
            existingDay.rawData.push({
               timestamp: item.dt_txt,
               temperature: item.main.temp,
               icon: weatherIcons[item.weather[0].icon],
            });
         } else {
            filteredData.push({
               date: date.toLocaleDateString(),
               dayOfWeek: dayOfWeek,
               dayTemp: item.main.temp_max,
               nightTemp: item.main.temp_min,
               description: item.weather[0].description,
               icon: weatherIcons[item.weather[0].icon],
               rawData: [{
                  timestamp: item.dt_txt,
                  temperature: item.main.temp,
                  icon: weatherIcons[item.weather[0].icon],
               }],
            });
         }
      });

      return filteredData;
   };

   {/*DISPLAY FORECAST*/ }
   return (
      <div>

         {filterForecastData().map((item: any, index: number) => (
            <div key={index} className="flex flex-row justify-between bg-white border rounded-lg p-4 m-2">
               <div className="flex flex-col justify-center mb-2">
                  <div>
                     <b>{item.dayOfWeek}</b>
                     <small className="ml-2">{formatDate(new Date(item.date))}</small>
                  </div>
                  <br></br>

                  <div className="flex items-center">
                     <b className="mr-4 ">{Math.floor(item.dayTemp)}°C </b>
                     /

                     <b className="ml-4">{Math.floor(item.nightTemp)}°C</b>
                  </div>
                  <div className="weather icon-description flex flex-col items-center">
                     {item.icon && <img src={item.icon} alt="Weather Icon" className="w-20 h-20" />}
                     <p className="mb-2">{item.description}</p>
                  </div>
               </div>


               <ul className="flex gap-2 bg-lightblue p-2 rounded items-center">
                  {item.rawData.map((data: any, dataIndex: number) => {
                     const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                     return (
                        <li key={dataIndex}>
                           <small>{time}</small>
                           <br></br>
                           <strong className="mt-1">{Math.floor(data.temperature)}°C</strong>
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
