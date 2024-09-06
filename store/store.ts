import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { adminPlayersApi } from "./api/Admin/adminPlayers";
import { authsApi } from "./api/Auth/auths";

export const store = configureStore({
  reducer: {
    //Redux Toolkit Reducers

    //admin
    [adminPlayersApi.reducerPath]: adminPlayersApi.reducer,

    //auths
    [authsApi.reducerPath]: authsApi.reducer,
    

    //public
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      //admin
      adminPlayersApi.middleware,

      //auths
      authsApi.middleware,

      //public
    ),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
