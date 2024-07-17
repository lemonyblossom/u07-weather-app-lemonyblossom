// SunPositionTable.tsx

import React from 'react';
import sunrise from '../../assets/sunriseIcon.png';
import sunset from '../../assets/sunsetIcon.png';

interface SunPositionTableProps {
   sunriseTime: Date;
   sunsetTime: Date;
   formatTime: (time: Date) => string;
}

const SunPositionTable: React.FC<SunPositionTableProps> = ({ sunriseTime, sunsetTime, formatTime }) => {
   return (
      <div className="sun-position-data flex flex-row md:flex-col justify-between w-full h-full">
         <table className="w-1/2 md:w-full h-full md:h-1/4">
            <tbody>
               <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900 dark:text-blue-700">
                     Sunrise
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 dark:text-blue-400">
                     {sunriseTime instanceof Date && !isNaN(sunriseTime.getTime()) ? formatTime(sunriseTime) : 'Invalid date'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 dark:text-blue-400">
                     <img className="w-8" src={sunrise} alt="sunrise" />
                  </td>
               </tr>
               <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900 dark:text-blue-200">
                     Sunset
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 dark:text-blue-400">
                     {sunsetTime instanceof Date && !isNaN(sunsetTime.getTime()) ? formatTime(sunsetTime) : 'Invalid date'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 dark:text-blue-400">
                     <img className="w-8" src={sunset} alt="sunset" />
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default SunPositionTable;
