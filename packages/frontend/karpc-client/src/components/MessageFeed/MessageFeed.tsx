import { Message, MessagePost } from "karpc-types";
import { useAppSelector } from "../../redux/hooks/hooks";
import {
  conversationFetchStatusConsts,
  selectConversationFetchStatus,
  selectPendingMessages,
} from "../../redux/slices/conversationSlice";
const { LOADING, ERROR, SUCCESS } = conversationFetchStatusConsts;

type RandyMessageProps = {
  message: Message | MessagePost;
  pending?: boolean;
};

const RandyMessage = ({ message, pending }: RandyMessageProps) => {
  return (
    <p className={`flex translate-x-11 transform justify-end p-1 text-base`}>
      <span className="rounded bg-white p-1">{message.message_text}</span>
      <span className="py-1 pl-3">
        {pending ? (
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
        ) : (
          <span className="rounded bg-orange-600 p-1 px-2 text-white shadow">
            R
          </span>
        )}
      </span>
    </p>
  );
};

const KhalilMessage = ({ message, pending }: RandyMessageProps) => {
  return (
    <p className={`flex -translate-x-11 transform justify-start p-1 text-base`}>
      <span className=" py-1 pr-3">
        {pending ? (
          <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
        ) : (
          <span className="rounded bg-purple-800 p-1 px-2 text-white shadow">
            K
          </span>
        )}
      </span>
      <span className="rounded bg-white p-1">{message.message_text}</span>
    </p>
  );
};

/***********************************************************************/

type ForEachProps<T> = {
  iterable: T[];
  render: (element: T, key: number) => JSX.Element;
};

function ForEach<T>({ iterable, render }: ForEachProps<T>) {
  return iterable.map((element, i) => render(element, i));
}

/***********************************************************************/

type MessageFeedProps = {
  messages: Message[];
};

export const MessageFeed = ({ messages }: MessageFeedProps) => {
  const conversationFetchStatus = useAppSelector(selectConversationFetchStatus);
  const pendingMessages = useAppSelector(selectPendingMessages);

  if (conversationFetchStatus === LOADING) {
    return (
      <div className="flex h-full items-center justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
      </div>
    );
  }

  if (conversationFetchStatus === ERROR) {
    return <div>Something went wrong! Try again?</div>;
  }

  if (conversationFetchStatus === SUCCESS) {
    return (
      <>
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
        <ForEach
          iterable={pendingMessages}
          render={(message, key) =>
            message.user === "randy" ? (
              <RandyMessage message={message} pending={true} key={key} />
            ) : (
              <KhalilMessage message={message} pending={true} key={key} />
            )
          }
        />
      </>
    );
  }
};
