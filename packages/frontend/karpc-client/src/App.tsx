import { useEffect, useState } from "react";
import HamburgerIcon from "./assets/hamburger-svgrepo-com.svg";
import UserIcon from "./assets/user-profile-svgrepo-com.svg";
import { MessageFeed } from "./components/MessageFeed/MessageFeed";
import { fetchAllMessages, postNewMessage } from "karpc-api";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import {
  selectConversation,
  replaceConversation,
  updateConversation,
} from "./redux/slices/conversationSlice";

window.document.body.classList.add("bg-sky-500");

// TODO: Make Types package
export type Message = {
  id: number;
  created: string;
  user: "randy" | "khalil";
  message_text: string;
};

type MessagePost = {
  user: "randy" | "khalil";
  message_text: string;
};

function App() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectConversation);
  const [newMessageInput, setNewMessageInput] = useState("");

  useEffect(() => {
    fetchAllMessages()
      .then((response) => response.json())
      .then((messages) => dispatch(replaceConversation(messages)));
  }, [dispatch]);

  async function dispatchAfterPostMessages(messagePost: MessagePost) {
    const response = await postNewMessage(messagePost);
    const message = await response.json();
    console.log(message[0]);
    dispatch(updateConversation(message[0]));
  }
  return (
    <>
      <div className="sticky top-0 flex justify-between border-b border-indigo-900 bg-indigo-800 py-1 shadow">
        <div className="pl-2 pt-1">
          <img className="h-11 w-11" src={HamburgerIcon} />
        </div>
        <header className="bg-indigo-800 text-center text-white">
          <h1 className="flex items-center justify-center">
            <span className="text-3xl">K</span> &nbsp;
            <span className="text-">&epsilon;</span> &nbsp;
            <span className="text-3xl">R</span>
          </h1>
          <p className="text-s italic text-yellow-200">Public Conversation</p>
        </header>
        <div className="pr-2 pt-2">
          <img className="h-11 w-11" src={UserIcon} />
        </div>
      </div>
      <div className="APP_CONTENT flex flex-col items-center p-2">
        <div className="CONVERSATION_CONTAINER w-1/2 rounded border border-sky-500 bg-sky-300 p-2 shadow">
          <MessageFeed messages={messages} />
        </div>
        <div>
          <input
            value={newMessageInput}
            onChange={(event) => setNewMessageInput(event.target.value)}
          ></input>

          <button
            className="rounded border border-black bg-green-500 p-2"
            onClick={() =>
              dispatchAfterPostMessages({
                user: "randy",
                message_text: `${newMessageInput}`,
              })
            }
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
