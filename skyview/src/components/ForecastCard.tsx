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

      //All the dates and weekdays
      forecastWeather.list.forEach((item: any) => {
         const date = new Date(item.dt * 1000);
         let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

         const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
         if (dayOfWeek === today) {
            dayOfWeek = "Today";
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

   return (
      <div>
         <h2>5-Day Forecast</h2>
         <div style={{ backgroundColor: 'black', padding: '5px', borderRadius: '5px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>

            {filterForecastData().map((item: any, index: number) => (
               <div key={index} style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                  <b> {item.dayOfWeek}</b>
                  <br></br>
                  <small>{formatDate(new Date(item.date))}</small>                  <br></br>
                  {item.icon && <img src={item.icon} alt="Weather Icon" />}
                  <br></br>
                  <b>{Math.floor(item.dayTemp)}° / {Math.floor(item.nightTemp)}°C</b>
                  <p>{item.description}</p>

                  <div style={{ marginTop: '10px' }}>
                     <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                        {item.rawData.map((data: any, dataIndex: number) => {
                           const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                           return (
                              <li
                                 key={dataIndex}
                                 style={{
                                    backgroundColor: 'lightblue',
                                    padding: '5px',
                                    marginBottom: '5px',
                                    borderRadius: '5px'
                                 }}
                              >
                                 <small>{time}</small>
                                 <br></br>
                                 <strong>{Math.floor(data.temperature)}°C</strong>
                                 <br></br>
                                 {data.icon && <img src={data.icon} alt="Weather Icon" />}
                              </li>
                           );
                        })}
                     </ul>
                  </div>

               </div>
            ))}
         </div>
      </div>
   );
};

export default ForecastCard;
