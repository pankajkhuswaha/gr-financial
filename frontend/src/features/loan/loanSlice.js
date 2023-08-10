import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getallUsers } from "utils/api";
import { getallNotification } from "utils/api";
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
export const getallnotification = createAsyncThunk(
  "customer/get-notification",
  async (thunkAPI) => {
    try {
      return await getallNotification();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getallUserAcess = createAsyncThunk(
  "customer/get-users",
  async (thunkAPI) => {
    try {
      return await getallUsers();
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
      cashinhand: "",
    },
    documents: {},
    document: [],
    reference: {},
    firm: {},
    company: {},
  },
  customerdata: [],
  notification:[],
  userlist:[],
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
      state.data.assetdetail.cashinhand = action.payload.cashinhand;
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
    resetData:(state,action)=>{
      Object.assign(state, initialState);
    }
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
      })
      .addCase(getallnotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallnotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.notification = action.payload;
      })
      .addCase(getallnotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getallUserAcess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallUserAcess.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userlist = action.payload;
      })
      .addCase(getallUserAcess.rejected, (state, action) => {
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
  resetData
} = loanSlice.actions;

export default loanSlice.reducer;
