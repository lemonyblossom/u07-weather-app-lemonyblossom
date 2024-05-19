import { useState } from 'react';
import Weather from './components/Weather';
import './index.css';

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  const toggleTempUnit = () => {
    setTempUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden text-blue-900 dark:text-purple-900 ">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-400 via-blue-100 to-blue-200 dark:bg-gradient-to-b dark:from-blue-950 dark:via-blue-700/60 dark:to-purple-950/60 z-0"></div>

      {/* Content */}
      <div className="relative h-full w-full overflow-y-auto z-10">
        <div className="flex flex-col items-center justify-center min-h-screen md:max-w-screen-md lg:max-w-screen-lg mx-auto px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 mt-2 sm:mt-4 md:mt-6 text-center">
            SkyView
          </h1>

          <div className="w-full">
            <Weather tempUnit={tempUnit} toggleTempUnit={toggleTempUnit} />
          </div>

          <div className="mb-4 text-center">
            {/* Count button */}
            <button onClick={() => setCount((count) => count + 1)} className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 bg-blue-500 text-white rounded">
              Count is {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
