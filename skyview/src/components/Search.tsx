import React from "react";

interface SearchProps {
   setSearchCity: React.Dispatch<React.SetStateAction<string>>;
   handleSearch: (e: React.FormEvent) => Promise<void>;
   searchCity: string;
}

const Search: React.FC<SearchProps> = ({ searchCity, setSearchCity, handleSearch }) => {

   return (
      <form onSubmit={handleSearch} className="flex justify-center m-2">
         <input className="border border-blue-200 p-2 rounded-lg dark:bg-blue-950/70 dark:border-blue-800 dark:text-red-200"
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name"
         />
         <button type="submit" className="ml-2 bg-gradient-to-t from-blue-400 to-blue-200 text-xl text-white font-medium border-1 border-blue-300 shadow-lg px-3 py-0 rounded-lg dark:bg-gradient-to-b dark:from-blue-950/80 dark:to-blue-900 dark:text-blue-200 dark:border-blue-800">
            Search
         </button>
      </form>
   );
};
export default Search;
