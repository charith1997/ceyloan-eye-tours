import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogged: boolean;
  redirectPath: string | null;
}

const initialState: AuthState = {
  isLogged: false,
  redirectPath: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
    setRedirectPath: (state, action: PayloadAction<string | null>) => {
      state.redirectPath = action.payload;
    },
    clearRedirectPath: (state) => {
      state.redirectPath = null;
    },
  },
});

export const { login, logout, setRedirectPath, clearRedirectPath } =
  authSlice.actions;
export default authSlice.reducer;
