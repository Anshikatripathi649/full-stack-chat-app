// A simple formatter inside your component or a separate utility file

const formatMessageTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export default formatMessageTime;