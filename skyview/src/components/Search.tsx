import React from "react";

interface SearchProps {
   setSearchCity: React.Dispatch<React.SetStateAction<string>>;
   handleSearch: (e: React.FormEvent) => Promise<void>;
   searchCity: string;
}

const Search: React.FC<SearchProps> = ({ searchCity, setSearchCity, handleSearch }) => {

   return (
      <form onSubmit={handleSearch}>
         <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name"
         />
         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Search
         </button>
      </form>
   );
};
export default Search;
