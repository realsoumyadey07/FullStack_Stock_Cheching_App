import { openApi } from "@/lib/axios/openApi";
import { tokenApi } from "@/lib/axios/tokenApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerUserData: null,
  loginUserData: null,
  isLoading: false,
  error: null,
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const res = await openApi.post("/user/register", userData);
      const data = res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const res = await openApi.post("/user/login", userData);
      const data = res.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI)=> {
    try {
      const res = await tokenApi.get("/user/logout");
      localStorage.removeItem("access_token");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)


export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for registration
    builder
      .addCase(userRegister.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        (state.registerUserData = action?.payload), (state.isLoading = false);
      })
      .addCase(userRegister.rejected, (state, action) => {
        (state.error = action?.payload?.message), (state.isLoading = false);
      });
    // for login
    builder
      .addCase(userLogin.pending, (state, _) => {
        state.isLoading = true
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        (state.loginUserData = action?.payload), (state.isLoading = false);
      })
      .addCase(userLogin.rejected, (state, action) => {
        (state.error = action?.payload?.message), (state.isLoading = false);
      });
      // for logout
      builder
      .addCase(userLogout.pending, (state, _)=> {
        state.isLoading = true
      })
      .addCase(userLogout.fulfilled, (state, action)=> {
        state.loginUserData = null,
        state.registerUserData = null,
        state.isLoading = false
      })
      .addCase(userLogout.rejected, (state, action)=> {
        state.error = action?.payload?.message,
        state.isLoading = false
      })
  },
});

export default userSlice.reducer;
