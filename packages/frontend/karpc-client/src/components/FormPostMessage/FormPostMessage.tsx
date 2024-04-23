import { useState } from "react";
import { buildPostMessageThunk } from "../../App";
import { useAppDispatch } from "../../redux/hooks/hooks";

export const FormPostMessage = () => {
  const dispatch = useAppDispatch();
  const postMessageThunk = buildPostMessageThunk(dispatch);
  const [newMessageInput, setNewMessageInput] = useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (newMessageInput.trim() === "") {
      console.log("newMessageInput is empty");
      return;
    }

    postMessageThunk({
      user: "randy",
      message_text: `${newMessageInput}`,
    });
    setNewMessageInput("");
  };
  return (
    <div className=" flex flex-row gap-1">
      <input
        className="rounded"
        value={newMessageInput}
        onChange={(event) => setNewMessageInput(event.target.value)}
        onKeyDown={handleKeyDown}
      ></input>

      <button
        className="rounded border border-black bg-green-500 p-2"
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
};
