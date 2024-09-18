/**
 * This file is kept as a historical record from before the use
 * of RTK's async thunk creators.
 *
 * We used to have to create our own boilerplate actions
 * to represent the async lifecycle that RTK now creates
 * automatically for us.
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Message, MessagePost } from "karpc-types";

export const conversationFetchStatusConsts = {
  NOT_DEFINED: "NOT_DEFINED",
  LOADING: "LOADING",
  RELOADING_AFTER_FAILURE: "RELOADING_AFTER_FAILURE",
  RELOADING_AFTER_SUCCESS: "RELOADING_AFTER_SUCCESS",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
} as const;

// This is an interface in the docs.  Curious if a type is okay.
type ConversationState = {
  conversation: Message[];
  conversationFetchStatus: (typeof conversationFetchStatusConsts)[keyof typeof conversationFetchStatusConsts];
  currentSelectedMessage: Message | undefined;
  pendingPostedMessages: MessagePost[];
};

const initialState: ConversationState = {
  conversation: [],
  conversationFetchStatus: conversationFetchStatusConsts.NOT_DEFINED,
  currentSelectedMessage: undefined,
  pendingPostedMessages: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    FETCH_CONVERSATION_REQUESTED: (slice) => {
      slice.conversationFetchStatus = conversationFetchStatusConsts.LOADING;
    },
    FETCH_CONVERSATION_SUCCEEDED: (slice, action: PayloadAction<Message[]>) => {
      slice.conversationFetchStatus = conversationFetchStatusConsts.SUCCESS;
      slice.conversation = action.payload;
    },
    FETCH_CONVERSATION_FAILED: (slice) => {
      slice.conversationFetchStatus = conversationFetchStatusConsts.ERROR;
    },
    POST_MESSAGE_REQUESTED: (slice, action: PayloadAction<MessagePost>) => {
      slice.pendingPostedMessages = [
        ...slice.pendingPostedMessages,
        action.payload,
      ];
    },
    POST_MESSAGE_SUCCEEDED: (slice, action: PayloadAction<Message>) => ({
      ...slice,
      pendingPostedMessages: slice.pendingPostedMessages.filter(
        (message) => message.message_text !== action.payload.message_text,
      ),
      conversation: [...slice.conversation, action.payload],
    }),
  },
});

export const {
  FETCH_CONVERSATION_REQUESTED,
  FETCH_CONVERSATION_SUCCEEDED,
  FETCH_CONVERSATION_FAILED,
  POST_MESSAGE_REQUESTED,
  POST_MESSAGE_SUCCEEDED,
  // POST_MESSAGE_FAILED,
} = conversationSlice.actions;

export const selectConversation = (state: RootState) =>
  state.conversationSlice.conversation;

export const selectConversationFetchStatus = (state: RootState) =>
  state.conversationSlice.conversationFetchStatus;

export const selectPendingMessages = (state: RootState) =>
  state.conversationSlice.pendingPostedMessages;

export default conversationSlice.reducer;
