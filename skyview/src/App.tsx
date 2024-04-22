import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Weather from './components/Weather';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-8">SkyView</h1>
      <div className="mb-8">
        <Weather />
      </div>
      <div className="mb-4">
        {/* 
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        */}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
          Count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
