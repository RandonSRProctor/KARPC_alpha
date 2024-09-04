import { fetchAllMessages } from "karpc-api";
import {
  FETCH_CONVERSATION_FAILURE,
  FETCH_CONVERSATION_SUCCESS,
} from "../slices/conversationSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const fetchConversationtThunk = async (dispatch: Dispatch) => {
  fetchAllMessages()
    .then((response) => response.json())
    .then((messages) => dispatch(FETCH_CONVERSATION_SUCCESS(messages)))
    .catch((error) => {
      console.log(error);
      dispatch(FETCH_CONVERSATION_FAILURE());
    });
};
