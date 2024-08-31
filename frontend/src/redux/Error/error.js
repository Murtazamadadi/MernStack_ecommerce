import { createSlice } from "@reduxjs/toolkit";

const initialState={
    error:null,
}


export const errorSlice=createSlice({
    name:"error",
    initialState,
    reducers:{
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})