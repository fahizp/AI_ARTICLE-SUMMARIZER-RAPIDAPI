import { configureStore, getDefaultMiddleware, Middleware } from "@reduxjs/toolkit";
import { articleApi } from "./article";

const middleware: Middleware[] = getDefaultMiddleware().concat(articleApi.middleware);

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware,
});
