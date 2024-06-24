import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
 
  publishResultDetails: [],
  bookingRequestedDetails:[]
}

const publishResultSlice = createSlice({
  name: 'publishResult',
  initialState,
  reducers: {
    setPublishResult(state, actions) {
       state.publishResultDetails= actions.payload
    },
    setBookingRequestedDetails(state,actions){
      state.bookingRequestedDetails=actions.payload;
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

export const {  setPublishResult, setBookingRequestedDetails } = publishResultSlice.actions
export default publishResultSlice.reducer