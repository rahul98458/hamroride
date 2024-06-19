import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  isLoggedIn: false,
  token: '',
  kycVerifiedStatus: '',
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
    },
       
    setUserKycVerifiedStatus(state, actions) {
      return {
        ...state,
        kycVerifiedStatus: actions.payload
      }
},

  },
})

export const { setLoginDetails ,logOutUser,setUserKycVerifiedStatus} = userSlice.actions
export default userSlice.reducer