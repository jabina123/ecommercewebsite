import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "./cartSlice"; // ✅ Now we'll use it

// ✅ Async thunk for login
export const loginUser = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("/api/users/login", userData);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// ✅ Async thunk for register
export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("/api/users/register", userData);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
