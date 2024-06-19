import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
 
  publishResultDetails: [],
}

const publishResultSlice = createSlice({
  name: 'publishResult',
  initialState,
  reducers: {
    setPublishResult(state, actions) {
     
      return{
        ...state,
        publishResultDetails: actions.payload
      }
    },
  },
})

export const {  setPublishResult } = publishResultSlice.actions
export default publishResultSlice.reducer