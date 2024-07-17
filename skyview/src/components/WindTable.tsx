
interface WindTableProps {
   windSpeed: number;
   windDirection: number;
   rain1h?: number;
}

const WindTable: React.FC<WindTableProps> = ({ windSpeed, windDirection, rain1h }) => {
   return (
      <div className="wind-details w-full">
         <table className="min-w-full bg-lime-200 dark:bg-gray-800">
            <tbody>
               <tr>
                  <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                     Wind Speed
                  </td>
                  <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                     {windSpeed} m/s
                  </td>
               </tr>
               <tr>
                  <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                     Wind Direction
                  </td>
                  <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                     {windDirection}°
                  </td>
               </tr>
               {rain1h !== undefined && (
                  <tr>
                     <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                        Rain (1h)
                     </td>
                     <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
