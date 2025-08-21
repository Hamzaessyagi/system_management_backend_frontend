import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, createUser, updateUser, deleteUser } from "../api/usersService";

// Thunks pour gérer les appels API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await getUsers();
});

export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  return await createUser(userData);
});

export const editUser = createAsyncThunk("users/editUser", async ({ id, userData }) => {
  return await updateUser(id, userData);
});

export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
  await deleteUser(id);
  return id;
});

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
