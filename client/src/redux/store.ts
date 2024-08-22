import { configureStore } from '@reduxjs/toolkit';
import LawyersSlice from './Lawyers/LawyersSlice';
import authSlice from './auth/authSlice';
import chatSlice from './chatGPT/chatSlice';


export const store = configureStore({
    reducer: {
        lawyers: LawyersSlice.reducer,
        auth: authSlice.reducer,
        chatGPT: chatSlice.reducer,
    },
  })


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type StoreType = typeof store;