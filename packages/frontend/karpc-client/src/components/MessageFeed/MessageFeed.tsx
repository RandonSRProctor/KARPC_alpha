import { Message } from "karpc-types";

const RandyMessage = ({ message }: RandyMessageProps) => {
  return (
    <p className={`flex translate-x-11 transform justify-end p-1 text-base`}>
      <span className="rounded bg-white p-1">{message.message_text}</span>
      <span className="py-1 pl-3">
        <span className="rounded bg-orange-600 p-1 px-2 text-white shadow">
          R
        </span>
      </span>
    </p>
  );
};

const KhalilMessage = ({ message }: RandyMessageProps) => {
  return (
    <p className={`flex -translate-x-11 transform justify-start p-1 text-base`}>
      <span className=" py-1 pr-3">
        <span className="rounded bg-purple-800 p-1 px-2 text-white shadow">
          K
        </span>
      </span>
      <span className="rounded bg-white p-1">{message.message_text}</span>
    </p>
  );
};

type MessageFeedProps = {
  messages: Message[];
};

export const MessageFeed = ({ messages }: MessageFeedProps) => {
  return (
    <>
      {messages.map((message, i) => {
        return message.user === "randy" ? (
          <RandyMessage key={i} message={message} />
        ) : (
          <KhalilMessage key={i} message={message} />
        );
      })}
    </>
  );
};

type RandyMessageProps = {
  message: Message;
};
