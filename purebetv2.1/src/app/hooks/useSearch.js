import { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/apicalls';

const useSearch = (query) => {
  const [results, setResults] = useState({ leagues: [], events: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults({ leagues: [], events: [] });
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/search?search=${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return { results, loading, error };
};

export default useSearch;
