import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { postMessageThunk } from "../../redux/thunks/postMessageThunk";
import { POST_MESSAGE_REQUEST } from "../../redux/slices/conversationSlice";

export const FormPostMessage = () => {
  const dispatch = useAppDispatch();
  const [newMessageInput, setNewMessageInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessageInput.trim() === "") {
      return;
    }

    dispatch(
      postMessageThunk({
        user: "randy",
        message_text: `${newMessageInput}`,
      }),
    );

    dispatch(
      POST_MESSAGE_REQUEST({
        user: "randy",
        message_text: `${newMessageInput}`,
      }),
    );

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
