import { useState } from "react";
import { buildPostMessageThunk } from "../../App";
import { useAppDispatch } from "../../redux/hooks/hooks";

export const FormPostMessage = () => {
  const dispatch = useAppDispatch();
  const postMessageThunk = buildPostMessageThunk(dispatch);
  const [newMessageInput, setNewMessageInput] = useState("");
  return (
    <div>
      <input
        value={newMessageInput}
        onChange={(event) => setNewMessageInput(event.target.value)}
      ></input>

      <button
        className="rounded border border-black bg-green-500 p-2"
        onClick={() =>
          postMessageThunk({
            user: "randy",
            message_text: `${newMessageInput}`,
          })
        }
      >
        Post
      </button>
    </div>
  );
};
