
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="w-full h-14 px-4 pr-12 text-lg text-gray-800 bg-white/90 rounded-full border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-white/50 focus:border-white transition-shadow duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="absolute right-2 h-10 w-10 flex items-center justify-center bg-blue-500 hover:bg-blue-400 rounded-full text-white transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <Search size={24} />
      </button>
    </form>
  );
};

export default SearchBar;
