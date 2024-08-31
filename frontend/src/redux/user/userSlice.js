import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    currentUser : null,
    loading:false,
    error:false
}
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      SignInStart : (state)=>{
        state.loading=true,
        state.error=null
      },
      SignInSuccess:(state,action)=>{
        state.currentUser=action.payload
        state.loading=false
        state.error=null
      },
      signInFailure:(state,action)=>{
        state.error=action.payload
        state.loading=false
      },
      logOutSuccess:(state)=>{
        state.currentUser=null
        state.loading=false
        state.error=null
      },
      UpdateStart:(state)=>{
        state.loading=true
        state.error=null
      },
      UpdateSuccess:(state,action)=>{
        state.currentUser=action.payload
        state.loading=false
        state.error=null
      },
      UpdateFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { SignInStart,SignInSuccess,signInFailure,logOutSuccess,UpdateStart,UpdateSuccess,UpdateFailure } = userSlice.actions
  
  export default userSlice.reducer