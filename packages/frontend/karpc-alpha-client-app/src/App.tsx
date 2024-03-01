import { useEffect } from "react";
import HamburgerIcon from "./assets/hamburger-svgrepo-com.svg";
import UserIcon from "./assets/user-profile-svgrepo-com.svg";

const mockConversationData = [
  {
    id: 1,
    created: "2024-01-21T21:09:32.000Z",
    user: "randy",
    message_text: "Hey Khalil!",
  },
  {
    id: 2,
    created: "2024-01-21T21:09:32.000Z",
    user: "khalil",
    message_text: "Hey Khalil!",
  },
  {
    id: 3,
    created: "2024-01-21T21:09:32.000Z",
    user: "randy",
    message_text: "What are you up to?",
  },
  {
    id: 4,
    created: "2024-01-21T21:09:32.000Z",
    user: "khalil",
    message_text: "Some pair programming!",
  },
];

window.document.body.classList.add("bg-sky-500");

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/conversation")
      .then((response) => response.json())
      .then(console.log);
  }, []);
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
      <div className="APP_CONTENT flex justify-center p-2">
        <div className="CONVERSATION_CONTAINER w-1/2 rounded border border-sky-500 bg-sky-300 p-2 shadow">
          {mockConversationData &&
            mockConversationData.map((message, i) => {
              return (
                <p key={i} className="text-base">
                  <span>{`${message.user}: `}</span>
                  <span>{message.message_text}</span>
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
