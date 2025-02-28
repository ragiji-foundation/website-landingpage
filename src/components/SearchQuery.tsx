import React, { useState } from 'react';
import { Autocomplete, Loader } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface SearchResult {
  title: string;
  type: string;
  url: string;
}

interface SearchQueryProps {
  className?: string;
  placeholder?: string;
  onClose?: () => void;
}

const SearchQuery: React.FC<SearchQueryProps> = ({ className, placeholder = "Search...", onClose }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://admin.ragijifoundation.com/api/search?q=${query}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();

      // Transform the data into the format we need
      const searchResults: SearchResult[] = data.map((item: any) => ({
        title: item.match_text,
        type: item.source_table,
        url: `/search-results?id=${item.record_id}&type=${item.source_table}`
      }));

      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      className={className}
      placeholder={placeholder}
      leftSection={<IconSearch size={16} stroke={1.5} />}
      rightSection={loading ? <Loader size="xs" /> : null}
      data={results.map(result => ({
        value: result.title,
        label: result.title,
        group: result.type,
        url: result.url,
      }))}
      onChange={handleSearch}
      onOptionSubmit={(option) => {
        const result = results.find(r => r.title === option);
        if (result?.url) {
          window.location.href = result.url;
          onClose?.();
        }
      }}
      size="sm"
    />
  );
};

export default SearchQuery;
