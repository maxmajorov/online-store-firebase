import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authAPI } from "../../api/api";
import { LoginParamsType } from "../../api/types";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

interface ValidationErrors {
  errors: Array<string>;
  fieldsErrors: Array<string>;
}

const slice = createSlice({
  name: "products",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state) {
      state.isLoggedIn = true;
    },
  },
});

export const productsReducer = slice.reducer;

export const { setIsLoggedInAC } = slice.actions;

// ==== SELECTORS ====

// ==== TYPES ====
