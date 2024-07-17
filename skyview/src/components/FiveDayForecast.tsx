interface FiveDayForecastProps {
   filteredData: any[];
   tempUnit: 'celsius' | 'fahrenheit';
   weatherIcons: { [key: string]: string };
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ filteredData, tempUnit, weatherIcons }) => {
   const formatDate = (date: Date) => {
      const day = date.getDate();
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const suffix = day % 10 < 4 ? suffixes[day % 10] : suffixes[0];
      return date.toLocaleDateString('en-US', { month: 'long' }) + ' ' + day + suffix;
   };

   return (
      <div className="forecast-grid grid grid-cols-1 lg:grid-cols-2 gap-4">
         {filteredData.map((item: any, index: number) => (
            <div
               key={index}
               className={`forecast-card flex flex-col bg-gradient-to-tr ${index % 2 === 0 ? 'from-blue-100 via-blue-200 to-blue-300' : 'from-blue-300 via-blue-200 to-blue-100'} border-1 border-blue-300 shadow-lg rounded-lg px-4 py-2 m-1 lg:items-center lg:p-5 dark:bg-gradient-to-tr ${index % 2 === 0 ? 'from-indigo-300 via-blue-500 to-indigo-600' : 'from-indigo-600 via-indigo-500 to-blue-300'} dark:border-gray-700`}
            >
               <div className="forecast-content flex flex-col w-full lg:w-3/4 p-1">
                  <b className="dark:text-blue-100">{item.dayOfWeek}</b>
                  <div className="5-day-date-and-temp flex flex-row justify-between">
                     <small>{formatDate(new Date(item.date))}</small>
                     <div className="day-night-temp float-end">
                        <b className="mr-2 text-2xl">{Math.floor(item.dayTemp)}°{tempUnit === 'celsius' ? 'C' : 'F'}</b>/
                        <b className="ml-2 text-2xl">{Math.floor(item.nightTemp)}°{tempUnit === 'celsius' ? 'C' : 'F'}</b>
                     </div>
                  </div>
               </div>
               <table className="forecast-hourly-data mt-3 w-full table-auto">
                  <tbody>
                     <tr>
                        {item.rawData.map((data: any, dataIndex: number) => {
                           const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                           return (
                              <td key={dataIndex} className="text-center">
                                 <small>{time}</small>
                                 <br />
                                 <strong className="mt-1">{Math.floor(data.temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}</strong>
                                 {data.icon &&
                                    <div className="flex justify-center">
                                       <img src={weatherIcons[data.icon]} alt="Weather Icon" className="w-8 h-8" />
                                    </div>
                                 }
                              </td>
                           );
                        })}
                     </tr>
                  </tbody>
               </table>
            </div>
         ))}
      </div>
   );
};

export default FiveDayForecast;
