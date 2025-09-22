import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const effectsSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { toggleLoading } = effectsSlice.actions;
export default effectsSlice.reducer;
