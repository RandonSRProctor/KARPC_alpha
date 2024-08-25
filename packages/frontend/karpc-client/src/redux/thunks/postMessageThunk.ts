import { postNewMessage } from "karpc-api";
import { MessagePost } from "karpc-types";
import { updateConversation } from "../slices/conversationSlice";
import { Dispatch } from "@reduxjs/toolkit";

// TODO: Next: switch over to createAsyncThunk

export const buildPostMessageThunk =
  (dispatch: Dispatch) => async (messagePost: MessagePost) => {
    const response = await postNewMessage(messagePost);
    const message = await response.json();
    dispatch(updateConversation(message[0]));
  };
