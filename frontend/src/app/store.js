import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/auth/authSlice";
import loanSlice from "features/loan/loanSlice";
import customerSlice from "features/loan/customer";
import loadingSlice from "features/loading/loadingSlice";
export const store = configureStore({
  reducer: {
    users: authSlice,
    customer:loanSlice,
    view:customerSlice,
    loading:loadingSlice
  },
});
