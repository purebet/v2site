import  { useEffect, useState } from 'react';

const RandomName = ({ fallback = "Helax BetLord" }) => {
  const [randomName, setRandomName] = useState(fallback);

  const fetchRandomName = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const user = data.results[0];
      setRandomName(`${user.name.first} ${user.name.last}`);
    } catch (error) {
      console.error("Failed to fetch random user name:", error);
      setRandomName(fallback);
    }
  };

  useEffect(() => {
    fetchRandomName();
  }, []);

  return <span>{randomName}</span>;
};

export default RandomName;
