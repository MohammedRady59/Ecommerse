import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IErrorResponse, IFormInputs, ILogin } from "../../../Interface";
import { axiosInstance } from "../../../config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import CookiesServise from "../../../service/CookiesServise";
export interface IProps {
  isLoading: boolean;
  data: ILogin;
}
export const initialState: IProps = {
  isLoading: false,
  data: {
    jwt: "",
    user: {
      email: "",
      id: "",
      username: "",
    },
  },
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (data: IFormInputs, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const res = await axiosInstance.post("/auth/local", data);
      if (res.status === 200) {
        toast.success("Logged in  Successfully!", {
          position: "bottom-center",
          duration: 2000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      }
      return res.data;
    } catch (error) {
      const errObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 2000,
      });
      return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        const date = new Date();
        const DAYS = 3;
        const EXPIRE_IN = 1000 * 60 * 60 * 24 * DAYS;
        date.setTime(date.getTime() + EXPIRE_IN);
        const options = { path: "/", expires: date };
        //CookiesServise.set("jwt", action.payload.jwt, null);      options => null  مش عايز وقت محدد بحط
        CookiesServise.set("jwt", action.payload.jwt, options);
        setTimeout(() => {
          location.replace("/dashboard");
        }, 2000);
      })

      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.data = {
          jwt: "",
          user: {
            email: "",
            id: "",
            username: "",
          },
        };
      });
  },
});

export default loginSlice.reducer;
