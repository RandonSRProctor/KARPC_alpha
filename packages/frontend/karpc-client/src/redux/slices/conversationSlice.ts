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
