import { postNewMessage } from "karpc-api";
import { MessagePost } from "karpc-types";
import { POST_MESSAGE_SUCCEEDED } from "../slices/conversationSlice";
import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";

/**
 * @deprecated prefer postMessageAsyncThunk
 */

export const postMessageThunk =
  (messagePost: MessagePost) => async (dispatch: Dispatch) => {
    try {
      const response = await postNewMessage(messagePost);
      const message = await response.json();
      dispatch(POST_MESSAGE_SUCCEEDED(message[0]));
    } catch (error) {
      console.log("This is where one should dispatch an error state");
    }
  };

// TODO: Next: switch over to createAsyncThunk

// export const postMessageAsyncThunk = createAsyncThunk(
//   "conversation/POST_MESSAGE_REQUESTED",
// );
