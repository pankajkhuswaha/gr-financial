import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  persons: [],
  company: [],
  firm: [],
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.persons.push(action.payload);
    },
    addCompany: (state, action) => {
      state.company.push(action.payload);
    },
    addFirm: (state, action) => {
      state.firm.push(action.payload);
    },
  },
});
export const { addUser } = userSlice.actions;
export const { addFirm } = userSlice.actions;
export const { addCompany } = userSlice.actions;

export default userSlice.reducer;
