import React, { useState, useEffect } from 'react';
import { Autocomplete, Loader, Text } from '@mantine/core';
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
  const [error, setError] = useState<string | null>(null);

  // Debug API URL on component mount
  useEffect(() => {
    console.log('API URL:', process.env.NEXT_PUBLIC_ADMIN_API_URL);
  }, []);

  const handleSearch = async (query: string) => {
    if (query.length < 3) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/search?q=${encodeURIComponent(query)}`;
      console.log('Fetching from:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit'
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', errorData);
        throw new Error(errorData?.message || 'Search failed');
      }

      const data = await response.json();
      console.log('Search results:', data);

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }

      const searchResults: SearchResult[] = data.map((item: any) => ({
        title: item.match_text || 'Untitled',
        type: item.source_table || 'Unknown',
        url: `/search-results?id=${item.record_id}&type=${item.source_table}`
      }));

      setResults(searchResults);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Search error:', errorMessage);
      setError(errorMessage);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
      {error && (
        <Text color="red" size="sm" mt={5}>
          {error}
        </Text>
      )}
    </>
  );
};

export default SearchQuery;
