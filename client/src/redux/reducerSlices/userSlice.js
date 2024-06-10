import { createSlice } from '@reduxjs/toolkit'

const initialState = { email:null}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state,actions) {
      state.email = actions.payload
    },
    logout(state) {
      state.email = null
    },
  },
})

export const { login,logout } = userSlice.actions
export default userSlice.reducer