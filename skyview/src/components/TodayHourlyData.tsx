interface TodayHourlyDataProps {
   todayData: any;
   tempUnit: 'celsius' | 'fahrenheit';
   weatherIcons: { [key: string]: string };
}

const TodayHourlyData: React.FC<TodayHourlyDataProps> = ({ todayData, tempUnit, weatherIcons }) => {
   return (
      <div className="forecast-today-card flex flex-col md:flex-col lg:flex-row justify-between bg-gradient-to-tr from-blue-200 via-blue-100 to-blue-200 shadow-lg rounded-b-lg rounded-t-none p-2">
         <div className="w-full flex flex-col justify-center md:flex-row">
            <b className="w-1/2 px-2">Temps until midnight</b>
            <br />
            <table className="temp-for-the-rest-of-the-day w-full table-auto">
               <tbody>
                  <tr>
                     {todayData.rawData.map((data: any, dataIndex: number) => {
                        const time = new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        return (
                           <td key={dataIndex} className="text-center">
                              <small>{time}</small>
                              <br />
                              <strong className="mt-1">{Math.floor(data.temperature)}°{tempUnit === 'celsius' ? 'C' : 'F'}</strong>
                              {data.icon &&
                                 <div className="flex justify-center"> {/* Ensures contents are centered */}
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
      </div>
   );
};

export default TodayHourlyData;
