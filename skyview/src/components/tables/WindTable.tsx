
interface WindTableProps {
   windSpeed: number;
   windDirection: number;
   rain1h?: number;
}

const WindTable: React.FC<WindTableProps> = ({ windSpeed, windDirection, rain1h }) => {
   return (
      <div className="wind-details w-full">
         <table className="min-w-full">
            <tbody>
               <tr>
                  <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-blue-950 dark:text-blue-100">
                     Wind Speed
                  </td>
                  <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-blue-950 dark:text-blue-100">
                     {windSpeed} m/s
                  </td>
               </tr>
               <tr>
                  <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-blue-950 dark:text-blue-100">
                     Wind Direction
                  </td>
                  <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-blue-950 dark:text-blue-100">
                     {windDirection}°
                  </td>
               </tr>
               {rain1h !== undefined && (
                  <tr>
                     <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-blue-950 dark:text-blue-100">
                        Rain (1h)
                     </td>
                     <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-blue-950 dark:text-blue-100">
                        {rain1h} mm
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default WindTable;
