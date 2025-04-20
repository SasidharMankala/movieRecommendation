import { createSlice } from "@reduxjs/toolkit";

interface DashSelectState {
  value: string;
}

const initialState: DashSelectState = {
  value: "trending",
};

const dashselectSlice = createSlice({
  name: "selections",
  initialState,
  reducers: {
    selection: (state, action) => {
      state.value = action.payload || "trending";
    },
  },
});

export const { selection } = dashselectSlice.actions;
export default dashselectSlice.reducer;
