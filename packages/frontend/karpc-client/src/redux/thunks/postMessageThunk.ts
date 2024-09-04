import { postNewMessage } from "karpc-api";
import { MessagePost } from "karpc-types";
import { updateConversation } from "../slices/conversationSlice";
import { Dispatch } from "@reduxjs/toolkit";

// TODO: Next: switch over to createAsyncThunk

export const postMessageThunk =
  (messagePost: MessagePost) => async (dispatch: Dispatch) => {
    try {
      const response = await postNewMessage(messagePost);
      const message = await response.json();
      dispatch(updateConversation(message[0]));
    } catch (error) {
      console.log("This is where one should dispatch an error state");
    }
  };
