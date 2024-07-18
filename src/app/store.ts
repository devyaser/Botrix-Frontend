import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import chatReducer from '../reducers/chat/chatSlice'

export function initializeStore() {
  return configureStore({
    reducer: { chats: chatReducer },
  })
}

const store = initializeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
