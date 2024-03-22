export type Message = {
  id: number;
  created: string;
  user: "randy" | "khalil";
  message_text: string;
};

export type MessagePost = {
  user: "randy" | "khalil";
  message_text: string;
};
