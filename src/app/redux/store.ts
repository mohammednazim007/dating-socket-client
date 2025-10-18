// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/userSlice";
import onlineReducer from "@/app/redux/features/user-slice/message-user-slice";
import friendsReducer from "@/app/redux/features/friend-slice/friend-slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

// persist config for the auth slice
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"], // persist only the user object
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: onlineReducer,
    friends: friendsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
