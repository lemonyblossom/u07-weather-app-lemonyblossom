import sunrise from '../../assets/sunriseIcon.png';
import sunset from '../../assets/sunsetIcon.png';

interface SunPositionTableProps {
   sunriseTime: Date;
   sunsetTime: Date;
   currentTime: Date;  // Add this line
   formatTime: (time: Date) => string;
}

const SunPositionTable: React.FC<SunPositionTableProps> = ({ sunriseTime, sunsetTime, currentTime, formatTime }) => {
   return (
      <div className="sun-position-data flex flex-row md:flex-col justify-between w-full h-full">
         <table className="w-1/2 md:w-full h-full md:h-1/4">
            <tbody>
               <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-950 dark:text-blue-100">
                     Sunrise
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                     {sunriseTime instanceof Date && !isNaN(sunriseTime.getTime()) ? formatTime(sunriseTime) : 'Invalid date'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                     <img className="w-8" src={sunrise} alt="sunrise" />
                  </td>
               </tr>
               <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-950 dark:text-blue-100">
                     Sunset
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950 dark:text-blue-100">
                     {sunsetTime instanceof Date && !isNaN(sunsetTime.getTime()) ? formatTime(sunsetTime) : 'Invalid date'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <img className="w-8" src={sunset} alt="sunset" />
                  </td>
               </tr>
               <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-950 dark:text-blue-100">
                     Current Time
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-950 dark:text-blue-100">
                     {currentTime instanceof Date && !isNaN(currentTime.getTime()) ? formatTime(currentTime) : 'Invalid date'}
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export default SunPositionTable;
