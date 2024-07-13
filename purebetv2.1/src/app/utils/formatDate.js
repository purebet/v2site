// utils/formatDate.js
export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleString(); // Format as desired
  };
  