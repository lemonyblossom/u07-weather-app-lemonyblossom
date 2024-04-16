import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import CurrentWeather from './pages/index/weather/CurrentWeather.tsx';
import Forecast from './pages/index/weather/Forecast.tsx'; // Import the Forecast component
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from './pages/index/Index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Index />
      <App />
    </>,
    children: [
      {
        path: 'current',
        element: <CurrentWeather latitude={0} longitude={0} />
      },
      {
        path: 'forecast',
        element: <Forecast latitude={0} longitude={0} />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);