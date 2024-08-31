import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:0,
  loading:false,
  error:null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    countStart: (state) => {
     state.loading=true
     state.error=null
    },
    countSuccess: (state,action) => {
      state.value=action.payload
      state.loading=false
      state.error=null
    },
    countFailure: (state, action) => {
      state.error=action.payload
      state.loading=false
    },
  },
})

// Action creators are generated for each case reducer function
export const { countStart, countSuccess, countFailure } = counterSlice.actions

export default counterSlice.reducer