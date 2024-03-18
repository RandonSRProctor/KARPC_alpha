type PostMessageRequestBody = {
  user: "khalil" | "randy";
  message_text: string;
};

export const postNewMessage = async (message: PostMessageRequestBody) => {
  const response = await fetch("http://localhost:8080/messsage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  return response;
};
