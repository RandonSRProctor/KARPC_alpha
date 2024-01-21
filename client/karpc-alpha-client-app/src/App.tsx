import HamburgerIcon from "./assets/hamburger-svgrepo-com.svg";
import UserIcon from "./assets/user-profile-svgrepo-com.svg";

const mockConversationData = [
  {
    index: 1,
    timestamp: "April, 20th, 1969",
    content: "Hey Randy",
    user: "Khalil",
  },
  {
    index: 2,
    timestamp: "April, 20th, 1969",
    content: "Hey Khalil",
    user: "Randy",
  },
  {
    index: 3,
    timestamp: "April, 20th, 1969",
    content: "What's up?'",
    user: "Khalil",
  },
  {
    index: 4,
    timestamp: "April, 20th, 1969",
    content: "Making an app my dude!",
    user: "Randy",
  },
];

function App() {
  return (
    <>
      <div className="sticky top-0 bg-indigo-800 py-1 flex justify-between">
        <div className="pl-2 pt-1">
          <img className="w-11 h-11" src={HamburgerIcon} />
        </div>
        <header className="bg-indigo-800 text-white text-center">
          <h1 className="flex items-center justify-center">
            <span className="text-3xl">K</span>
            <span className="text-base">&</span>
            <span className="text-3xl">R</span>
          </h1>
          <p className="text-s italic text-yellow-200">Public Conversation</p>
        </header>
        <div className="pt-2 pr-2 ">
          <img className="w-11 h-11" src={UserIcon} />
        </div>
      </div>
      <div className="APP_CONTENT flex justify-center p-2">
        <div className="CONVERSATION_CONTAINER w-1/2 border border-black rounded p-2">
          {mockConversationData.map((message) => {
            return (
              <p className="text-base">
                <span>{`${message.user}: `}</span>
                <span>{message.content}</span>
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
