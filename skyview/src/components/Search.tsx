import React, { useState, useRef, useEffect } from "react";
import { API_KEY } from "../api/WeatherApi";

interface SearchProps {
   setSearchCity: React.Dispatch<React.SetStateAction<string>>;
   handleSearch: (e: React.FormEvent) => Promise<void>;
   searchCity: string;
}

const Search: React.FC<SearchProps> = ({
   searchCity,
   setSearchCity,
   handleSearch,
}) => {
   const [suggestedCities, setSuggestedCities] = useState<string[]>([]);
   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
   const formRef = useRef<HTMLFormElement>(null);

   useEffect(() => {
      if (searchCity.length >= 3) {
         suggestCities(searchCity);
      } else {
         setSuggestedCities([]);
      }
   }, [searchCity]);

   // Suggestions on input
   const suggestCities = async (inputCity: string) => {
      setLoadingSuggestions(true);
      try {
         const response = await fetch(
            `https://api.openweathermap.org/data/2.5/find?q=${inputCity}&type=like&sort=population&cnt=30&appid=${API_KEY}`
         );
         if (!response.ok) {
            throw new Error("Failed to fetch city suggestions");
         }
         const data = await response.json();
         console.log("API response data:", data); // Log full data

         // Create a set to deduplicate city names
         const cityNamesSet = new Set<string>();
         data.list.forEach((city: any) => {
            cityNamesSet.add(`${city.name}, ${city.sys.country}`);
         });
         const cityNames = Array.from(cityNamesSet);

         setSuggestedCities(cityNames);
      } catch (error) {
         console.error("Error fetching city suggestions:", error);
         setSuggestedCities([]);
      } finally {
         setLoadingSuggestions(false);
      }
   };

   // Handle form submission
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (searchCity.length < 3) {
         return;
      }
      try {
         const response = await fetch(
            `https://api.openweathermap.org/data/2.5/find?q=${searchCity}&type=like&sort=population&cnt=30&appid=${API_KEY}`
         );
         if (response.ok) {
            const data = await response.json();
            console.log("API response data:", data); // log full data

            const cityNamesSet = new Set<string>();
            data.list.forEach((city: any) => {
               cityNamesSet.add(`${city.name}, ${city.sys.country}`);
            });
            const cityNames = Array.from(cityNamesSet);

            if (cityNames.length > 0) {
               setSearchCity(cityNames[0]); // Set best match 
            }
         } else {
            throw new Error("Failed to fetch city data");
         }
      } catch (error) {
         console.error("Error handling city search:", error);
      }

      await handleSearch(e);
      setSearchCity('');
   };

   const handleSuggestionClick = (city: string) => {
      setSearchCity(city);
      setSuggestedCities([]); // Clear suggestions
      formRef.current?.requestSubmit();
   };

   return (
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col items-center m-2">
         <div className="relative w-full">
            <input
               className="border border-blue-200 p-2 rounded-lg w-full dark:bg-blue-950/70 dark:border-blue-800 dark:text-blue-100"
               type="text"
               value={searchCity}
               onChange={(e) => {
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
            {/*             {loadingSuggestions && <p>Loading suggestions...</p>}
 */}            {suggestedCities.length > 0 && (
               <div className="absolute left-0 mt-1 w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden z-10">
                  <ul className="divide-y divide-gray-200">
                     {suggestedCities.map((city, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSuggestionClick(city)}>
                           {city}
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
