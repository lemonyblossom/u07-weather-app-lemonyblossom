import { Link, Outlet } from "react-router-dom";

const Index = () => {
   return (
      <div>
         <h1>Welcome to my weather app</h1>
         <Link to="/">Home</Link> | <Link to="/current">Current Weather</Link> | <Link to="/forecast">Forecast</Link>
         <hr />
         <Outlet />
      </div>
   );
};

export default Index;