// hooks/useLeagues.js
import { useState, useEffect } from 'react';

const useLeagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch('http://15.222.64.232/v2/leagues');
        if (!response.ok) {
          throw new Error('Failed to fetch leagues');
        }
        const data = await response.json();
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

export default useLeagues;
