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
        tempUnit === 'celsius'
          ? 'bg-blue-100 text-black flex flex-col items-center justify-center min-h-screen'
          : 'bg-blue-100 text-black flex flex-col items-center justify-center min-h-screen'
      }
    >
      <h1 className="text-5xl mb-8 mt-4">SkyView</h1>

      {/* Temp Unit Toggle */}
      <div className="mb-4">
        <button onClick={toggleTempUnit} className="px-4 py-2 bg-blue-300 text-white border-white rounded">
          Toggle Temperature Unit ({tempUnit})
        </button>
      </div>
      <div className="mb-8">
        <Weather tempUnit={tempUnit} />
      </div>

      <div className="mb-4">
        {/* Count button */}
        <button onClick={() => setCount((count) => count + 1)} className="px-2 py-1 bg-blue-500 text-white rounded">
          Count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
