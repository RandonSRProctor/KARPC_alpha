import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Message } from "karpc-types";

// This is an interface in the docs.  Curious if a type is okay.
type ConversationState = {
  conversation: Message[];
  conversationFetchStatus:
    | "not initiated"
    | "Sent_Awaiting_Response"
    | "Success"
    | "Error";
  currentSelectedMessage: Message | undefined;
};

const initialState: ConversationState = {
  conversation: [],
  conversationFetchStatus: "not initiated",
  currentSelectedMessage: undefined,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    FETCH_CONVERSATION_REQUEST: (slice) => {
      slice.conversationFetchStatus = "Sent_Awaiting_Response";
    },
    FETCH_CONVERSATION_SUCCESS: (slice, action: PayloadAction<Message[]>) => {
      slice.conversationFetchStatus = "Success";
      slice.conversation = action.payload;
    },
    FETCH_CONVERSATION_FAILURE: (slice) => {
      slice.conversationFetchStatus = "Error";
    },
    updateConversation: (slice, action: PayloadAction<Message>) => {
      slice.conversation = [...slice.conversation, action.payload];
    },
  },
});

/**
 * Proposed event-driven async data fetching names:
 * FETCH_USER_REQUEST - for when you first send the api call
FETCH_USER_SUCCESS - for when the api call is done and successfully returned data
FETCH_USER_FAIL - for when the api call failed and responded with an error,
FETCH_USER_COMPLETE - sometimes used at the end of the call regardless of status
 */

export const {
  FETCH_CONVERSATION_SUCCESS,
  FETCH_CONVERSATION_REQUEST,
  FETCH_CONVERSATION_FAILURE,
  updateConversation,
} = conversationSlice.actions;

export const selectConversation = (state: RootState) =>
  state.conversationSlice.conversation;

export const selectConversationFetchStatus = (state: RootState) =>
  state.conversationSlice.conversationFetchStatus;

export default conversationSlice.reducer;
