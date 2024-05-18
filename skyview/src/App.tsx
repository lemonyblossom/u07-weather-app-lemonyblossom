import React, { useState } from 'react';
import Weather from './components/Weather';
import './index.css';

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>('celsius');

  const toggleTempUnit = () => {
    setTempUnit((prevUnit) => (prevUnit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return (
    <div
      className={
        "min-h-screen w-screen md:max-w-screen-md lg:max-w-screen-lg bg-blue-100 text-black flex flex-col items-center justify-center" +
        (tempUnit === 'celsius' ? '' : '')
      }
    >
      <div className="min-h-screen min-w-screen md:max-w-screen-md lg:max-w-screen-lg">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 mt-2 sm:mt-4 md:mt-6 text-center">
          SkyView
        </h1>

        {/* Temp Unit Toggle */}
        <div className="mb-4 text-center">
          <button onClick={toggleTempUnit} className="px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 bg-blue-300 text-white border-white rounded">
            Toggle Temperature Unit ({tempUnit})
          </button>
        </div>

        <div className="min-h-screen w-screen md:max-w-screen-md lg:max-w-screen-lg">
          <Weather tempUnit={tempUnit} />
        </div>

        <div className="mb-4 text-center">
          {/* Count button */}
          <button onClick={() => setCount((count) => count + 1)} className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 bg-blue-500 text-white rounded">
            Count is {count}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
