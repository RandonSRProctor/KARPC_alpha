import HamburgerIcon from "./assets/hamburger-svgrepo-com.svg";
import UserIcon from "./assets/user-profile-svgrepo-com.svg";
import { useState } from "react";
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
  // State to manage input values
  const [userInput, setUserInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messageId, setMessageid] = useState("");

  // send message to server
  const handleSendMessage = async () => {
    try {
      // make a POST request server endpoint
      const response = await fetch(
        "http://localhost:8080/karpc_alpha/createMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userInput,
            messageText: messageInput,
          }),
        },
      );

      if (response.ok) {
        console.log("Message sent successfully");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // get message by id from server
  const handleFindMessageById = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/karpc_alpha/${messageId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Message retrieved successfully:", data);
      } else {
        console.error("Failed to retrieve message");
      }
    } catch (error) {
      console.error("Error retrieving message:", error);
    }
  };

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
            mockConversationData.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.user === "randy" ? "text-left" : "text-right"
                } mb-2`}
              >
                <p className="text-base">
                  <span className="font-bold">{`${message.user}: `}</span>
                  <span>{message.message_text}</span>
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="CONVERSATION_INPUT">
        {/* create and message input test */}
        <h2 className="text-center text-xl">Send message test</h2>
        <input
          className="user"
          placeholder="Type user here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <input
          className="w-full rounded border border-gray-400 p-1"
          placeholder="Type your message here..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          className="ml-1 rounded bg-indigo-800 p-1 text-white"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
      {/* get message by id input test */}
      <h2 className="text-center text-xl">Get message by id test</h2>
      <input
        className="messageFinder"
        placeholder="Type id here..."
        value={messageId}
        onChange={(e) => setMessageid(e.target.value)}
      />
      <button
        className="ml-1 rounded bg-indigo-800 p-1 text-white"
        onClick={handleFindMessageById}
      >
        Send
      </button>
    </>
  );
}

export default App;
