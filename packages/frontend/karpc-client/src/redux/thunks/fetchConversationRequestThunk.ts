import { fetchAllMessages } from "karpc-api";
import {
  FETCH_CONVERSATION_FAILED,
  FETCH_CONVERSATION_SUCCEEDED,
} from "../slices/conversationSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchConversationtThunk = async (dispatch: Dispatch) => {
  fetchAllMessages()
    .then((response) => response.json())
    .then((messages) => dispatch(FETCH_CONVERSATION_SUCCEEDED(messages)))
    .catch((error) => {
      console.log(error);
      dispatch(FETCH_CONVERSATION_FAILED());
    });
};
