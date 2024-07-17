// utils/formatDate.js
export const formatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleString(undefined , options); // Format as desired
  };
  
  // utils/time.js



  export function formatTime(dateString) {
    const date = new Date(dateString * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }