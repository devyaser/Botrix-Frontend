import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { pinned_chats } from '../../mock-data';

export interface ChatState {
  pinnedChats: any;
  followingChats: any
}

const initialState: ChatState = {
  pinnedChats: pinned_chats,
  followingChats: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setPinnedChats: (state, action: PayloadAction<any>) => {
      state.pinnedChats = action.payload;
    },
  },
})

export const { setPinnedChats } = chatSlice.actions

export const selectPinnedChats = (state: AppState) => (state.chats as any).pinnedChats

export default chatSlice.reducer
