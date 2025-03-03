// utils/formatDate.js
export const formatDate = (timestamp) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleString(undefined, options); // Format as desired
};

export const getEventDay = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Remove time part for accurate date comparison
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return "Today";
  } else if (date.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
};

// utils/time.js

export function formatTime(dateString) {
  const date = new Date(dateString * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
