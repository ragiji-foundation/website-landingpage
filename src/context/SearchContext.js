'use client';
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchContent = async (query) => {
    setIsSearching(true);
    try {
      // Implement your search logic here
      // This is a simple example - replace with your actual search implementation
      const results = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json());
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider value={{ searchResults, isSearching, searchContent }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext); 