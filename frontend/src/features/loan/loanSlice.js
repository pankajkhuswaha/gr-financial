import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCustomer } from "utils/api";

export const getallCustomerData = createAsyncThunk(
  "customer/get-customer",
  async (thunkAPI) => {
    try {
      return await getAllCustomer();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  data: {
    loantype: "",
    persondetails: [],
    loandetails: "",
    assetdetail: {
      propertyDetails: [],
      carDetails: [],
      providentfund: "",
      cashInHand: "",
    },
    documents: {},
    document: [],
    reference: {},
    firm: {},
    company: {},
  },
  customerdata: [],
  filterdata: "none",
  searchdata: "hjhjh",
};
const loanSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.data.persondetails.push(action.payload);
    },
    addReference: (state, action) => {
      state.data.reference = action.payload;
    },
    addLoanDetailindvidual: (state, action) => {
      state.data.loandetails = action.payload;
    },
    addPropertyindvidual: (state, action) => {
      state.data.assetdetail.propertyDetails.push(action.payload);
    },
    addcarindvidual: (state, action) => {
      state.data.assetdetail.carDetails.push(action.payload);
    },
    addasset: (state, action) => {
      state.data.assetdetail.providentfund = action.payload.profitentfund;
      state.data.assetdetail.cashInHand = action.payload.cashinhand;
    },
    addDocument: (state, action) => {
      state.data.documents = action.payload;
    },
    addFirm: (state, action) => {
      state.data.firm = action.payload;
    },
    addCompany: (state, action) => {
      state.data.company = action.payload;
    },
    addloanType: (state, action) => {
      state.data.loantype = action.payload;
    },
    toggleFilter: (state, action) => {
      state.filterdata = action.payload;
    },
    toggleSearch: (state, action) => {
      state.filterdata = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getallCustomerData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallCustomerData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customerdata = action.payload;
      })
      .addCase(getallCustomerData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export const {
  addFirm,
  addPerson,
  addCompany,
  addReference,
  addLoanDetailindvidual,
  addPropertyindvidual,
  addcarindvidual,
  addasset,
  addDocument,
  addloanType,
  toggleFilter,
  toggleSearch,
} = loanSlice.actions;

export default loanSlice.reducer;
