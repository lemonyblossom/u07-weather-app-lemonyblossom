interface WeatherTableProps {
   title: string;
   data: { label: string; value: string }[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ data }) => {
   return (
      <div className="weather-details-container w-full">
         <table className="min-w-full rounded">
            <tbody>
               {data.map((item, index) => (
                  <tr key={index}>
                     <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm font-medium text-blue-950 dark:text-blue-100">
                        {item.label}
                     </td>
                     <td className="px-6 py-4 w-1/2 whitespace-nowrap text-sm text-blue-950 dark:text-blue-100">
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
