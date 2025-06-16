'use client';
import React, { createContext, useContext, useState } from 'react';

interface SearchResult {
  title: string;
  type: string;
  url: string;
}

interface SearchContextType {
  searchContent: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchContent = async (query: string) => {
    if (query.length < 3) return;

    setIsSearching(true);
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Search request failed');

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <SearchContext.Provider value={{ searchContent, searchResults, isSearching }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}