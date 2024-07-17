interface ForecastCardProps {
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
            <div className="forecast-today-card flex flex-col md:flex-col lg:flex-row justify-between bg-gradient-to-tr from-blue-200 via-blue-100 to-blue-200 shadow-lg rounded-b-lg rounded-t-none p-2">
               <div className="w-full flex flex-col justify-center md:flex-row">
                  <b className='w-1/2 px-2'>Temps until midnight
                  </b>
                  <br />
                  <ul className="temp-for-the-rest-of-the-day w-full flex rounded items-start justify-around">

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

         {/*forecast 5 days*/}
         <h3 className='m-2 dark:text-blue-100 font-medium'>5-day forecast</h3>
         <div className="forecast-grid grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredData.map((item: any, index: number) => (
               <div key={index} className="forecast-card flex flex-col bg-gradient-to-tr from-blue-200 via-blue-100 to-blue-200 border-1 border-blue-300 shadow-lg  rounded-lg px-4 py-2 m-1  lg:items-center lg:p-5">
                  <div className="forecast-content flex flex-col w-full lg:w-3/4  p-1">
                     <b>{item.dayOfWeek}</b>
                     <div className='5-day-date-and-temp flex flex-row justify-between'>
                        <small>{formatDate(new Date(item.date))}</small>
                        <div className='day-night-temp float-end'>
                           <b className="mr-2 text-2xl">{Math.floor(item.dayTemp)}°{tempUnit === 'celsius' ? 'C' : 'F'}</b>/
                           <b className="ml-2 text-2xl">{Math.floor(item.nightTemp)}°{tempUnit === 'celsius' ? 'C' : 'F'}</b>
                        </div>
                     </div>
                  </div>
                  <ul className="forecast-hourly-data mt-3 flex gap-2 justify-center items-center">
                     {item.rawData.map((data: any, dataIndex: number) => {
                        const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        return (
                           <li key={dataIndex} className="text-center">
                              <small>{time}</small>
                              <br />
                              <strong className="mt-1">{Math.floor(data.temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}</strong>
                              {data.icon && <img src={data.icon} alt="Weather Icon" className="w-8 h-8" />}
                           </li>
                        );
                     })}
                  </ul>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ForecastCard;