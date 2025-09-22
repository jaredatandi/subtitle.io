import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic } from "service/axios";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosPublic.post("/auth/login-via-email", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || null,
      });
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (
    {
      googleAccessToken,
      email,
      name,
    }: {
      googleAccessToken: string;
      email: string;
      name: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosPublic.post("/auth/auth-via-google", {
        googleAccessToken,
        email,
        name,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || null,
      });
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axiosPublic.post("/user", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status || 500,
        data: error?.response?.data || null,
      });
    }
  }
);

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  (window as Window).location = "/";
};
type InitialStateType = {
  user: null | object;
  loading: boolean;
  error: boolean;
  errorMessage: null | string;
  token: string;
  provider: string;
};

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    loading: false,
    error: false,
    errorMessage: null,
    token: "",
    provider: "",
  } as InitialStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.provider = "local";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action?.payload?.data?.message || null;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.provider = "google";
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action?.payload?.data?.message || null;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.provider = "register";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(signUp.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action?.payload?.data?.message || null;
      });
  },
});

export default authSlice.reducer;
