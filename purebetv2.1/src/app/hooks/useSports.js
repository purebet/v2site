import { useState, useEffect } from 'react';

const useSports = (id) => {
  const [sports, setSports] = useState({});
  const [sportName, setSportName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`http://15.222.64.232/v2/events?sport=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sports');
        }
        const data = await response.json();
        setSports(data);
        setSportName(Object.keys(data)[0]); // Get the sport name dynamically
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, [id]);

  return { sports, sportName, loading, error };
};

export default useSports;
