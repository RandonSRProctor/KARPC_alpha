import { Message } from "karpc-types";
import { useAppSelector } from "../../redux/hooks/hooks";
import { selectConversationFetchStatus } from "../../redux/slices/conversationSlice";

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

/***********************************************************************/

type ForEachProps = {
  iterable: Message[];
  render: (element: Message, key: number) => JSX.Element;
};

const ForEach = ({ iterable, render }: ForEachProps) =>
  iterable.map((element, i) => render(element, i));

/***********************************************************************/

type MessageFeedProps = {
  messages: Message[];
};

export const MessageFeed = ({ messages }: MessageFeedProps) => {
  const conversationFetchStatus = useAppSelector(selectConversationFetchStatus);

  if (conversationFetchStatus === "Sent_Awaiting_Response") {
    return <div>Loading...</div>;
  }

  if (conversationFetchStatus === "Error") {
    return <div>Something went wrong! Try again?</div>;
  }

  if (conversationFetchStatus === "Success") {
    return (
      <ForEach
        iterable={messages}
        render={(message, key) =>
          message.user === "randy" ? (
            <RandyMessage message={message} key={key} />
          ) : (
            <KhalilMessage message={message} key={key} />
          )
        }
      />
    );
  }
};

type RandyMessageProps = {
  message: Message;
};
