import { createSlice } from "@reduxjs/toolkit";
import { IProudct } from "../../../Interface";
import { addTocartandCheck } from "../../../utils/functions";
import toast from "react-hot-toast";

export interface IProps {
  isLoading: boolean;
  cartProudcts: IProudct[];
}
export const initialState: IProps = {
  isLoading: false,
  cartProudcts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      //state.cartProudcts = [...state.cartProudcts, action.payload];
      state.cartProudcts = addTocartandCheck(
        state.cartProudcts,
        action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cartProudcts));
    },
    getCart: (state) => {
      const cart = localStorage.getItem("cart");
      state.cartProudcts = cart ? JSON.parse(cart) : [];
    },
    removeItem: (state, action) => {
      state.cartProudcts = state.cartProudcts.filter(
        (el) => el.id !== action.payload
      );
      toast.error(`This Item Is Removed`, {
        position: "bottom-center",
        duration: 2000,
      });
      localStorage.setItem("cart", JSON.stringify(state.cartProudcts));
    },
    removeAll: (state) => {
      state.cartProudcts = [];
      toast.error(`Your Cart Is Empty Now`, {
        position: "bottom-center",
        duration: 2000,
      });
      localStorage.setItem("cart", JSON.stringify(state.cartProudcts));
    },
  },
});
export const { addTocart, getCart, removeItem, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
