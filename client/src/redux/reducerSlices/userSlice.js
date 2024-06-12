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
    logOutUser(state, actions)
    {
           return initialState;
    }
  },
})

export const { setLoginDetails ,logOutUser} = userSlice.actions
export default userSlice.reducer