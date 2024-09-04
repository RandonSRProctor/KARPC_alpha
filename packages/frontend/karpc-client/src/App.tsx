import { useEffect } from "react";

import HamburgerIcon from "./assets/hamburger-svgrepo-com.svg";
import UserIcon from "./assets/user-profile-svgrepo-com.svg";
import { MessageFeed } from "./components/MessageFeed/MessageFeed";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import { FormPostMessage } from "./components/FormPostMessage/FormPostMessage";
import {
  FETCH_CONVERSATION_REQUEST,
  selectConversation,
} from "./redux/slices/conversationSlice";
import { fetchConversationtThunk } from "./redux/thunks/buildFetchConversationRequestThunk";

window.document.body.classList.add("bg-sky-500");

function App() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectConversation);

  useEffect(() => {
    dispatch(fetchConversationtThunk);
    dispatch(FETCH_CONVERSATION_REQUEST());
  }, [dispatch]);

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
        <FormPostMessage />
      </div>
    </>
  );
}

export default App;
