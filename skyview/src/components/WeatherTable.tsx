interface WeatherTableProps {
   title: string;
   data: { label: string; value: string }[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ data }) => {
   return (
      <div className="weather-details-container w-full">
         <table className="min-w-full rounded bg-cyan-200 dark:bg-gray-800">
            <tbody>
               {data.map((item, index) => (
                  <tr key={index}>
                     <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                        {item.label}
                     </td>
                     <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {item.value}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default WeatherTable;
