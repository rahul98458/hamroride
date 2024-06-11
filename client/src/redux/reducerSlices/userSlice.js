import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  isLoggedIn: false,
  token: '',
  userDetails: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginDetails(state, actions) {
      const {user, token} = actions.payload
      return{
        ...state,
        isLoggedIn: true,
        token: token,
        userDetails: user
      }
    },
  },
})

export const { setLoginDetails } = userSlice.actions
export default userSlice.reducer