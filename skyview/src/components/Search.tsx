import { useState, useRef, useEffect } from "react";
import { API_KEY } from "../api/WeatherApi";

interface SearchProps {
   setSearchCity: React.Dispatch<React.SetStateAction<string>>;
   handleSearch: (lat: number, lon: number) => Promise<void>;
   searchCity: string;
}

interface City {
   name: string;
   lat: number;
   lon: number;
   country: string;
   state?: string;
}

const Search: React.FC<SearchProps> = ({
   searchCity,
   setSearchCity,
   handleSearch,
}) => {
   const [suggestedCities, setSuggestedCities] = useState<City[]>([]);
   const [selectedCity, setSelectedCity] = useState<City | null>(null);
   const formRef = useRef<HTMLFormElement>(null);

   useEffect(() => {
      if (searchCity.length >= 3) {
         const debounceTimeout = setTimeout(() => {
            suggestCities(searchCity);
         }, 300);
         return () => clearTimeout(debounceTimeout);
      } else {
         setSuggestedCities([]);
      }
   }, [searchCity]);

   const suggestCities = async (inputCity: string) => {
      try {
         console.log("Fetching city suggestions for:", inputCity);
         const response = await fetch("/filteredCities.json");
         if (!response.ok) {
            throw new Error("Network response was not ok");
         }
         const cities: City[] = await response.json();
         console.log("Fetched cities:", cities);

         const filteredCities = cities
            .filter((city) =>
               city.name.toLowerCase().startsWith(inputCity.toLowerCase())
            )
            .slice(0, 10); // Limit suggestions to top 10

         console.log("Filtered cities:", filteredCities);
         setSuggestedCities(filteredCities);
      } catch (error) {
         console.error("Error fetching city suggestions:", error);
         setSuggestedCities([]);
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedCity) {
         setSearchCity(`${selectedCity.name}, ${selectedCity.country}`);
         setSuggestedCities([]);
         await handleSearch(selectedCity.lat, selectedCity.lon);
         setSelectedCity(null);
      } else if (searchCity.trim().length > 0) {
         try {
            const response = await fetch(
               `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                  searchCity
               )}&appid=${API_KEY}&units=metric`
            );
            if (response.ok) {
               const data = await response.json();
               const { coord } = data;
               await handleSearch(coord.lat, coord.lon);
               setSearchCity(`${data.name}, ${data.sys.country}`);
            } else {
               throw new Error("Failed to fetch weather data.");
            }
         } catch (error) {
            console.error("Error handling city search:", error);
         }
      }
      setSearchCity('');
   };

   const handleSuggestionClick = async (city: City, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      setSelectedCity(city);
      let displayString = `${city.name}, ${city.country}`;
      if (city.state) {
         displayString += `, ${city.state}`;
      }
      setSearchCity(displayString);
      setSuggestedCities([]);
      await handleSearch(city.lat, city.lon); // Trigger search directly
   };

   return (
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col items-center m-2">
         <div className="relative w-full">
            <input
               className="border border-blue-200 p-2 rounded-lg w-full dark:bg-blue-950/70 dark:border-blue-950 dark:text-blue-100"
               type="text"
               value={searchCity}
               onChange={(e) => {
                  console.log("Input changed to:", e.target.value);
                  setSearchCity(e.target.value);
               }}
               placeholder="Enter city name"
            />
            <button
               type="submit"
               className="absolute top-0 right-0 mt-2 mr-2 bg-gradient-to-t from-blue-400 to-blue-200 text-xl text-white font-medium border-1 border-blue-300 shadow-lg px-3 py-0 rounded-lg dark:bg-gradient-to-b dark:from-blue-950/80 dark:to-blue-900 dark:text-blue-200 dark:border-blue-800"
            >
               Search
            </button>
            {suggestedCities.length > 0 && (
               <div className="absolute left-0 mt-1 w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden z-10">
                  <ul className="divide-y divide-gray-200">
                     {suggestedCities.map((city, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={(e) => handleSuggestionClick(city, e)}>
                           {`${city.name}, ${city.country}${city.state ? `, ${city.state}` : ''}`}
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
      </form>
   );
};

export default Search;
