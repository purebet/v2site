// hooks/useNext.js
import { useState, useEffect } from 'react';
import { getNextEvents } from '../utils/apicalls';

const useNext = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getNextEvents();
        setLeagues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return { leagues, loading, error };
};

export default useNext;
