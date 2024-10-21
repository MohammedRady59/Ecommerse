import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loginSlice from "./features/Login/loginSlice";
import cartSlice from "./features/Cart/cartSlice";
import { apiSlice } from "./dashboard/Api/ApiSlice";
// ...

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: cartSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      apiSlice.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
