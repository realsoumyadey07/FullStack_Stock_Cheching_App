import { tokenApi } from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedFunds: [],
  isLoading: false,
  error: null,
};

export const fetchAllSavedFunds = createAsyncThunk(
  "saved/fetchAllSavedFunds",
  async (_, thunkAPI) => {
    try {
      const response = await tokenApi.get("/saved/all-saved-funds");
      return response.data.funds;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const saveFund = createAsyncThunk(
  "saved/saveFund",
  async (fundId, thunkAPI) => {
    try {
      const response = await tokenApi.post("/saved/save-fund", { fundId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const unsaveFund = createAsyncThunk(
  "saved/unsaveFund",
  async (fundId, thunkAPI) => {
    try {
      const response = await tokenApi.post("/saved/unsave-fund", { fundId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getting all saved funds
    builder
      .addCase(fetchAllSavedFunds.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSavedFunds.fulfilled, (state, action) => {
        state.savedFunds = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllSavedFunds.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch saved funds.";
        state.isLoading = false;
      });
    // saving a fund
    builder
      .addCase(saveFund.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(saveFund.fulfilled, (state, action) => {
        state.savedFunds = [...state.savedFunds, action.payload.fund];
        state.isLoading = false;
      })
      .addCase(saveFund.rejected, (state, action) => {
        state.error = action.payload || "Failed to save fund.";
        state.isLoading = false;
      });
    // unsaving a fund
    builder
      .addCase(unsaveFund.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(unsaveFund.fulfilled, (state, action) => {
        state.savedFunds = state.savedFunds.filter(
          (fund) => fund.fundId !== action.payload.fundId
        );
        state.isLoading = false;
      })
      .addCase(unsaveFund.rejected, (state, action) => {
        state.error = action.payload || "Failed to unsave fund.";
        state.isLoading = false;
      });
  },
});

export default savedSlice.reducer;
