import { createAsyncThunk, createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { IUser, IAuthState } from "../../DefinedTypes/types";
import axios from 'axios';
const initialState :IAuthState = {
    currUser: null,
    login: false,
    token: localStorage.getItem("token")
}
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (token:string, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5110/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
const Auth = createSlice({

name : "auth",
initialState,
reducers:{
    logout : (state) =>{ 
        state.currUser = null;
        state.login = false;
        state.token = null ;
    },
    login:(state, action : PayloadAction<IUser>) => {
        state.currUser = action.payload;
        state.login = true ;
        state.token = localStorage.getItem("token");
    }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserData.pending, (state) => {
            state.login = true;
            state.token = localStorage.getItem("token");
          })
          .addCase(fetchUserData.fulfilled, (state, action) => {
            state.currUser = action.payload;
            state.login = true;
            state.token = localStorage.getItem("token"); // Update authentication status
          })
          .addCase(fetchUserData.rejected, (state, action) => {
            state.currUser = null;
            state.login = false;
            state.token = null; // Reset authentication status on error
          });
      }
    

});


export const {login, logout} = Auth.actions ;
export default Auth.reducer ; 