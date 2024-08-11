import { useState, useEffect } from 'react';

interface ClockProps {
   timezoneOffset: number; // Timezone offset in seconds
}

const Clock: React.FC<ClockProps> = ({ timezoneOffset }) => {
   const [currentTime, setCurrentTime] = useState(new Date());

   useEffect(() => {
      const intervalId = setInterval(() => {
         setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(intervalId);
   }, []);

   // Convert current time to UTC
   const utcTime = new Date(currentTime.getTime() + currentTime.getTimezoneOffset() * 60000);

   // Apply the timezone offset
   const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);

   const formattedTime = localTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
   });

   return (
      <div className="text-xl font-bold text-center text-blue-950 dark:text-blue-300">
         {formattedTime}
      </div>
   );
};

export default Clock;
