
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  username: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ username: string }>) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
