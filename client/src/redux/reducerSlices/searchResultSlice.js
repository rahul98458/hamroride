import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
 
  searchResultDetails: [],
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
  },
})

export const { setSearchResult } = searchResultSlice.actions
export default searchResultSlice.reducer