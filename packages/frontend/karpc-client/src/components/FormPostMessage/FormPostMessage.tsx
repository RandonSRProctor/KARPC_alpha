import { useState } from "react";
import { buildPostMessageThunk } from "../../App";
import { useAppDispatch } from "../../redux/hooks/hooks";

export const FormPostMessage = () => {
  const dispatch = useAppDispatch();
  const postMessageThunk = buildPostMessageThunk(dispatch);
  const [newMessageInput, setNewMessageInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessageInput.trim() === "") {
      return;
    }

    postMessageThunk({
      user: "randy",
      message_text: `${newMessageInput}`,
    });

    setNewMessageInput(""); // What if message fails?
  };
  return (
    <form className="flex flex-row gap-1 pt-2" onSubmit={handleSubmit}>
      <input
        className="rounded"
        value={newMessageInput}
        onChange={(event) => setNewMessageInput(event.target.value)}
      ></input>
      <button
        type="submit"
        className="rounded border border-black bg-green-500 p-2"
      >
        Post
      </button>
    </form>
  );
};
