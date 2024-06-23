import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
 
  publishResultDetails: [],
}

const publishResultSlice = createSlice({
  name: 'publishResult',
  initialState,
  reducers: {
    setPublishResult(state, actions) {
       state.publishResultDetails= actions.payload
      
    },
    
    // removePublishResult(state, actions) {
    //  const existingPublishRide =[...state.publishResultDetails]
    //  const removePublishRide = existingPublishRide.filter((item)=>{
    //        if(item._id!==actions.payload)
    //         return item
    //  })
    //    state.publishResultDetails= removePublishRide;
    // },

  },
})

export const {  setPublishResult } = publishResultSlice.actions
export default publishResultSlice.reducer