export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
  
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
  
    const isTomorrow =
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear();
  
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const timeString = date.toLocaleTimeString([], options);
  
    if (isToday) {
      return `Today ${timeString}`;
    } else if (isTomorrow) {
      return `Tomorrow ${timeString}`;
    } else {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year} ${timeString}`;
    }
};  