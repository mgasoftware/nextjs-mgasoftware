import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    token:string
}

const initialState = {
    user: {},
    isLoading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserPending: (state) => {
            state.isLoading = true;
        },
        getUserSuccess: (state, { payload }: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = payload;
            state.error = "";
        },
        getUserFail: (state, { payload }: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = payload;
        }
    }
})

const { reducer, actions } = userSlice;
export const { getUserPending, getUserSuccess, getUserFail } = actions;
export default reducer;