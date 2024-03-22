import { Message } from "karpc-types";

type MessageFeedProps = {
  messages: Message[];
};

export const MessageFeed = ({ messages }: MessageFeedProps) => {
  return (
    <>
      {messages.map((message, i) => {
        return (
          <p key={i} className="text-base">
            <span>{`${message.user}: `}</span>
            <span>{message.message_text}</span>
          </p>
        );
      })}
    </>
  );
};
