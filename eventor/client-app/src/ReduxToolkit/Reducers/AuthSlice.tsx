import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IAuthState } from "../../DefinedTypes/types";

const initialState :IAuthState = {
    currUser: null,
    login: false
}

const Auth = createSlice({

name : "auth",
initialState,
reducers:{
    logout : (state) =>{ 
        state.currUser = null;
        state.login = false;
    },
    login:(state, action : PayloadAction<IUser>) => {
        state.currUser = action.payload;
        state.login = true ;
    }
    },

});


export const {login, logout} = Auth.actions ;
export default Auth.reducer ; 