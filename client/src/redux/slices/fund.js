import { fundApi } from "@/lib/axios/fundApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  funds: null,
  isLoading: false,
  error: null,
};

export const fetchAllFunds = createAsyncThunk(
  "funds/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await fundApi.get("https://api.mfapi.in/mf");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fetchFundsByName = createAsyncThunk(
  "funds/fetchByName",
  async (name, thunkAPI) => {
    try {
      const response = await fundApi.get("https://api.mfapi.in/mf/search", {
        params: { q: name },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const fundSlice = createSlice({
  name: "fund",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFunds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFunds.fulfilled, (state, action) => {
        state.funds = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllFunds.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch funds.";
        state.isLoading = false;
      })
      .addCase(fetchFundsByName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFundsByName.fulfilled, (state, action) => {
        state.funds = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFundsByName.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch funds by name.";
        state.isLoading = false;
      });
  },
});

export default fundSlice.reducer;
