import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
 
  searchResultDetails: [],
  bookRideResult:[],
}

const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setSearchResult(state, actions) {
      const {search} = actions.payload
      return{
        ...state,
        searchResultDetails: search
      }
    },
    setBookRideResult(state, actions) {
      state.bookRideResult= actions.payload
   },
  },
})

export const { setSearchResult,setBookRideResult } = searchResultSlice.actions
export default searchResultSlice.reducer