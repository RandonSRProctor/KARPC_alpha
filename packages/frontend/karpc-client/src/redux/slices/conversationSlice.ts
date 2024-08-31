import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Message } from "karpc-types";

// This is an interface in the docs.  Curious if a type is okay.
type ConversationState = {
  conversation: Message[];
  currentSelectedMessage: Message | undefined;
};

const initialState: ConversationState = {
  conversation: [],
  currentSelectedMessage: undefined,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    replaceConversation: (slice, action: PayloadAction<Message[]>) => {
      slice.conversation = action.payload;
    },
    updateConversation: (slice, action: PayloadAction<Message>) => {
      slice.conversation = [...slice.conversation, action.payload];
    },
  },
});

export const { replaceConversation, updateConversation } =
  conversationSlice.actions;

export const selectConversation = (state: RootState) =>
  state.conversationSlice.conversation;

export default conversationSlice.reducer;
