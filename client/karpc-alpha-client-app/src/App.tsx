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

function App() {
  return (
    <>
      <div className="sticky top-0 flex justify-between bg-indigo-800 py-1">
        <div className="pl-2 pt-1">
          <img className="h-11 w-11" src={HamburgerIcon} />
        </div>
        <header className="bg-indigo-800 text-center text-white">
          <h1 className="flex items-center justify-center">
            <span className="text-3xl">K</span>
            <span className="text-base">&</span>
            <span className="text-3xl">R</span>
          </h1>
          <p className="text-s italic text-yellow-200">Public Conversation</p>
        </header>
        <div className="pr-2 pt-2">
          <img className="h-11 w-11" src={UserIcon} />
        </div>
      </div>
      <div className="APP_CONTENT flex justify-center p-2">
        <div className="CONVERSATION_CONTAINER w-1/2 rounded border border-black p-2">
          {mockConversationData &&
            mockConversationData.map((message) => {
              return (
                <p className="text-base">
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
