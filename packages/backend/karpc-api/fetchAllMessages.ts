export const fetchAllMessages = async () => {
  const result = await fetch("http://localhost:8080/conversation");
  return result;
};
