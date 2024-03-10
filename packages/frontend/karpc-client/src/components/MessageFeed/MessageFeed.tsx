type Message = {
  id: number;
  created: string;
  user: string;
  message_text: string;
};

type MessageFeedProps = {
  messages: Message[];
};

export const MessageFeed = ({ messages }: MessageFeedProps) => {
  return (
    <>
      {messages &&
        messages.map((message, i) => {
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
