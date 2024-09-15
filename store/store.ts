import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { adminPlayersApi } from "./api/Admin/adminPlayers";
import { authsApi } from "./api/Auth/auths";
import { adminCourtsApi } from "./api/Admin/adminCourts";
import { configsApi } from "./api/Config/configs";
import { adminProfileApi } from "./api/Admin/adminProfile";

export const store = configureStore({
  reducer: {
    //Redux Toolkit Reducers

    //admin
    [adminPlayersApi.reducerPath]: adminPlayersApi.reducer,
    [adminCourtsApi.reducerPath]: adminCourtsApi.reducer,
    [adminProfileApi.reducerPath]: adminProfileApi.reducer,

    //auths
    [authsApi.reducerPath]: authsApi.reducer,

    //configs
    [configsApi.reducerPath]: configsApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      //admin
      adminPlayersApi.middleware,
      adminCourtsApi.middleware,
      adminProfileApi.middleware,

      //auths
      authsApi.middleware,

      //configs
      configsApi.middleware

      //public
    ),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
