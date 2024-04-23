import React from "react";

interface SearchProps {
   setSearchCity: React.Dispatch<React.SetStateAction<string>>;
   handleSearch: (e: React.FormEvent) => Promise<void>;
   searchCity: string;
}

const Search: React.FC<SearchProps> = ({ searchCity, setSearchCity, handleSearch }) => {

   return (
      <form onSubmit={handleSearch} className="flex justify-center m-2">
         <input className="border border-blue-200 p-2 rounded"
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name"
         />
         <button type="submit" className="ml-2 bg-blue-500 text-white px-3 py-0 rounded">
            Search
         </button>
      </form>
   );
};
export default Search;
