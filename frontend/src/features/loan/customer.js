import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const customerSlice = createSlice({
  name: "custom",
  initialState,
  reducers: {
    addviewCustomer: (state, action) => {
      state.data =action.payload
    },
  },
});
export const {addviewCustomer} = customerSlice.actions;

export default customerSlice.reducer;
